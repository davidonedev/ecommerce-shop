package com.ecommerce.shop.admin;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
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
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;

import com.ecommerce.shop.TestcontainersConfiguration;
import com.ecommerce.shop.auth.JwtService;
import com.ecommerce.shop.user.Role;
import com.ecommerce.shop.user.User;
import com.ecommerce.shop.user.UserRepository;
import com.jayway.jsonpath.JsonPath;

/** Permissões do painel, banners (datas e links) e upload de imagens. */
@Import(TestcontainersConfiguration.class)
@SpringBootTest(properties = "app.uploads.dir=target/test-uploads")
@AutoConfigureMockMvc
class AdminIntegrationTests {

	private static final byte[] PNG = { (byte) 0x89, 'P', 'N', 'G', 0x0D, 0x0A, 0x1A, 0x0A, 0, 0, 0, 0, 0, 0, 0, 0 };

	@Autowired
	MockMvc mockMvc;

	@Autowired
	UserRepository users;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	JwtService jwtService;

	private String adminToken() {
		User admin = new User();
		admin.setName("Admin de teste");
		admin.setEmail("admin-" + UUID.randomUUID() + "@exemplo.com");
		admin.setPasswordHash(passwordEncoder.encode("senha-forte-123"));
		admin.setRole(Role.ADMIN);
		users.save(admin);
		return jwtService.generateToken(admin);
	}

	private String customerToken() throws Exception {
		String body = """
				{"name":"Cliente","email":"cliente-%s@exemplo.com","password":"senha-forte-123"}""".formatted(UUID.randomUUID());
		String response = mockMvc
			.perform(post("/api/auth/register").contentType(MediaType.APPLICATION_JSON).content(body))
			.andExpect(status().isCreated())
			.andReturn()
			.getResponse()
			.getContentAsString();
		return JsonPath.read(response, "$.token");
	}

	private static String bannerJson(String title, String link, String starts, String ends) {
		return """
				{"title":"%s","imageUrl":"/mock/banners/banner-1.svg","linkUrl":%s,"ctaLabel":"Ver",
				 "startsAt":%s,"endsAt":%s}""".formatted(title, link == null ? "null" : "\"" + link + "\"",
				starts == null ? "null" : "\"" + starts + "\"", ends == null ? "null" : "\"" + ends + "\"");
	}

	@Test
	void adminAreaRequiresLogin() throws Exception {
		mockMvc.perform(get("/api/admin/banners")).andExpect(status().isUnauthorized());
	}

	@Test
	void customerCannotUseAdminArea() throws Exception {
		mockMvc.perform(get("/api/admin/banners").header(HttpHeaders.AUTHORIZATION, "Bearer " + customerToken()))
			.andExpect(status().isForbidden());
	}

	@Test
	void adminCanListBanners() throws Exception {
		mockMvc.perform(get("/api/admin/banners").header(HttpHeaders.AUTHORIZATION, "Bearer " + adminToken()))
			.andExpect(status().isOk());
	}

	@Test
	void rejectsDangerousLinks() throws Exception {
		mockMvc.perform(post("/api/admin/banners").header(HttpHeaders.AUTHORIZATION, "Bearer " + adminToken())
			.contentType(MediaType.APPLICATION_JSON)
			.content(bannerJson("Golpe", "javascript:alert(1)", null, null)))
			.andExpect(status().isBadRequest())
			.andExpect(jsonPath("$.errors.linkUrl").exists());
	}

	@Test
	void rejectsEndBeforeStart() throws Exception {
		mockMvc.perform(post("/api/admin/banners").header(HttpHeaders.AUTHORIZATION, "Bearer " + adminToken())
			.contentType(MediaType.APPLICATION_JSON)
			.content(bannerJson("Datas invertidas", "/produtos", "2030-02-01T00:00:00", "2030-01-01T00:00:00")))
			.andExpect(status().isBadRequest());
	}

	@Test
	void expiredBannerIsNotShownPublicly() throws Exception {
		String token = adminToken();
		String title = "Campanha expirada " + UUID.randomUUID();
		String created = mockMvc
			.perform(post("/api/admin/banners").header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
				.contentType(MediaType.APPLICATION_JSON)
				.content(bannerJson(title, "/produtos", "2020-01-01T00:00:00", "2020-02-01T00:00:00")))
			.andExpect(status().isCreated())
			.andReturn()
			.getResponse()
			.getContentAsString();

		mockMvc.perform(get("/api/banners"))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$[?(@.title == '%s')]".formatted(title)).isEmpty());

		long id = ((Number) JsonPath.read(created, "$.id")).longValue();
		mockMvc.perform(delete("/api/admin/banners/" + id).header(HttpHeaders.AUTHORIZATION, "Bearer " + token))
			.andExpect(status().isNoContent());
	}

	@Test
	void activeBannerIsShownPublicly() throws Exception {
		String token = adminToken();
		String title = "Banner visível " + UUID.randomUUID();
		mockMvc.perform(post("/api/admin/banners").header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
			.contentType(MediaType.APPLICATION_JSON)
			.content(bannerJson(title, "/produtos", null, null)))
			.andExpect(status().isCreated());

		mockMvc.perform(get("/api/banners"))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$[?(@.title == '%s')]".formatted(title)).exists());
	}

	@Test
	void updatesAndReordersBanners() throws Exception {
		String token = adminToken();
		String created = mockMvc
			.perform(post("/api/admin/banners").header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
				.contentType(MediaType.APPLICATION_JSON)
				.content(bannerJson("Para editar", "/produtos", null, null)))
			.andExpect(status().isCreated())
			.andReturn()
			.getResponse()
			.getContentAsString();
		long id = ((Number) JsonPath.read(created, "$.id")).longValue();

		mockMvc.perform(put("/api/admin/banners/" + id).header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
			.contentType(MediaType.APPLICATION_JSON)
			.content(bannerJson("Editado", "/produtos", null, null)))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.title").value("Editado"));

		mockMvc.perform(put("/api/admin/banners/order").header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
			.contentType(MediaType.APPLICATION_JSON)
			.content("{\"ids\":[" + id + "]}"))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$[?(@.id == " + id + ")].position").exists());

		mockMvc.perform(delete("/api/admin/banners/" + id).header(HttpHeaders.AUTHORIZATION, "Bearer " + token))
			.andExpect(status().isNoContent());
	}

	@Test
	void uploadsPngAndServesIt() throws Exception {
		String token = adminToken();
		String response = mockMvc
			.perform(multipart("/api/admin/uploads")
				.file(new MockMultipartFile("file", "banner.png", "image/png", PNG))
				.header(HttpHeaders.AUTHORIZATION, "Bearer " + token))
			.andExpect(status().isCreated())
			.andExpect(jsonPath("$.url").value(org.hamcrest.Matchers.startsWith("/uploads/")))
			.andReturn()
			.getResponse()
			.getContentAsString();
		String url = JsonPath.read(response, "$.url");

		mockMvc.perform(get(url)).andExpect(status().isOk());
	}

	@Test
	void rejectsUploadThatIsNotAnImage() throws Exception {
		String token = adminToken();
		mockMvc.perform(multipart("/api/admin/uploads")
			.file(new MockMultipartFile("file", "script.png", "image/png", "<script>alert(1)</script>".getBytes()))
			.header(HttpHeaders.AUTHORIZATION, "Bearer " + token))
			.andExpect(status().isBadRequest());
	}

	@Test
	void rejectsDuplicateProductSlug() throws Exception {
		String token = adminToken();
		String body = """
				{"name":"Duplicado","slug":"tapete-pet-nome","price":10.00,"stockQuantity":1,"active":true}""";
		mockMvc.perform(post("/api/admin/products").header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
			.contentType(MediaType.APPLICATION_JSON).content(body))
			.andExpect(status().isConflict());
	}

}
