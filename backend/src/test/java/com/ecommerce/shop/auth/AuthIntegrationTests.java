package com.ecommerce.shop.auth;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.UUID;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.ecommerce.shop.TestcontainersConfiguration;
import com.jayway.jsonpath.JsonPath;

@Import(TestcontainersConfiguration.class)
@SpringBootTest
@AutoConfigureMockMvc
class AuthIntegrationTests {

	private static final String PASSWORD = "senha-forte-123";

	@Autowired
	MockMvc mockMvc;

	private static String uniqueEmail() {
		return "user-" + UUID.randomUUID() + "@exemplo.com";
	}

	private static String registerBody(String name, String email, String password) {
		return """
				{"name":"%s","email":"%s","password":"%s"}""".formatted(name, email, password);
	}

	private static String loginBody(String email, String password) {
		return """
				{"email":"%s","password":"%s"}""".formatted(email, password);
	}

	private String registerAndGetToken(String email) throws Exception {
		String body = mockMvc
			.perform(post("/api/auth/register").contentType(MediaType.APPLICATION_JSON)
				.content(registerBody("Ana Silva", email, PASSWORD)))
			.andExpect(status().isCreated())
			.andReturn()
			.getResponse()
			.getContentAsString();
		return JsonPath.read(body, "$.token");
	}

	@Test
	void registerCreatesCustomerAndNeverExposesPasswordHash() throws Exception {
		String email = uniqueEmail();

		mockMvc
			.perform(post("/api/auth/register").contentType(MediaType.APPLICATION_JSON)
				.content(registerBody("  Ana Silva ", email.toUpperCase(), PASSWORD)))
			.andExpect(status().isCreated())
			.andExpect(jsonPath("$.token").isNotEmpty())
			.andExpect(jsonPath("$.tokenType").value("Bearer"))
			.andExpect(jsonPath("$.user.name").value("Ana Silva"))
			.andExpect(jsonPath("$.user.email").value(email))
			.andExpect(jsonPath("$.user.role").value("CUSTOMER"))
			.andExpect(jsonPath("$.user.passwordHash").doesNotExist())
			.andExpect(jsonPath("$.user.password").doesNotExist());
	}

	@Test
	void registerRejectsDuplicateEmailIgnoringCase() throws Exception {
		String email = uniqueEmail();
		registerAndGetToken(email);

		mockMvc
			.perform(post("/api/auth/register").contentType(MediaType.APPLICATION_JSON)
				.content(registerBody("Outra Pessoa", email.toUpperCase(), PASSWORD)))
			.andExpect(status().isConflict());
	}

	@Test
	void registerValidatesInput() throws Exception {
		mockMvc
			.perform(post("/api/auth/register").contentType(MediaType.APPLICATION_JSON)
				.content(registerBody("", "nao-e-email", "curta")))
			.andExpect(status().isBadRequest())
			.andExpect(jsonPath("$.errors.name").exists())
			.andExpect(jsonPath("$.errors.email").exists())
			.andExpect(jsonPath("$.errors.password").exists());
	}

	@Test
	void registerRejectsPasswordLongerThanBcryptLimit() throws Exception {
		mockMvc
			.perform(post("/api/auth/register").contentType(MediaType.APPLICATION_JSON)
				.content(registerBody("Ana", uniqueEmail(), "a".repeat(73))))
			.andExpect(status().isBadRequest())
			.andExpect(jsonPath("$.errors.password").exists());
	}

	@Test
	void loginReturnsTokenForValidCredentials() throws Exception {
		String email = uniqueEmail();
		registerAndGetToken(email);

		mockMvc
			.perform(post("/api/auth/login").contentType(MediaType.APPLICATION_JSON).content(loginBody(email, PASSWORD)))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.token").isNotEmpty())
			.andExpect(jsonPath("$.user.email").value(email));
	}

	@Test
	void loginFailsWithSameResponseForWrongPasswordAndUnknownEmail() throws Exception {
		String email = uniqueEmail();
		registerAndGetToken(email);

		mockMvc
			.perform(post("/api/auth/login").contentType(MediaType.APPLICATION_JSON)
				.content(loginBody(email, "senha-errada-123")))
			.andExpect(status().isUnauthorized())
			.andExpect(jsonPath("$.detail").value("E-mail ou senha inválidos."));

		mockMvc
			.perform(post("/api/auth/login").contentType(MediaType.APPLICATION_JSON)
				.content(loginBody(uniqueEmail(), PASSWORD)))
			.andExpect(status().isUnauthorized())
			.andExpect(jsonPath("$.detail").value("E-mail ou senha inválidos."));
	}

	@Test
	void meReturnsCurrentUserWithValidToken() throws Exception {
		String email = uniqueEmail();
		String token = registerAndGetToken(email);

		mockMvc.perform(get("/api/auth/me").header(HttpHeaders.AUTHORIZATION, "Bearer " + token))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.email").value(email))
			.andExpect(jsonPath("$.role").value("CUSTOMER"));
	}

	@Test
	void meRequiresAuthentication() throws Exception {
		mockMvc.perform(get("/api/auth/me")).andExpect(status().isUnauthorized());
		mockMvc.perform(get("/api/auth/me").header(HttpHeaders.AUTHORIZATION, "Bearer token-invalido"))
			.andExpect(status().isUnauthorized());
		mockMvc.perform(get("/api/auth/me").header(HttpHeaders.AUTHORIZATION, "Basic abc"))
			.andExpect(status().isUnauthorized());
	}

}
