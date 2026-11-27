package com.ecommerce.shop;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;

@Import(TestcontainersConfiguration.class)
@SpringBootTest
@AutoConfigureMockMvc
class PingEndpointTests {

	@Autowired
	MockMvc mockMvc;

	@Test
	void pingIsPublic() throws Exception {
		mockMvc.perform(get("/api/ping"))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.status").value("ok"));
	}

	@Test
	void otherEndpointsRequireAuthentication() throws Exception {
		// /api/products agora é público (vitrine); a área administrativa continua protegida.
		mockMvc.perform(get("/api/admin/banners"))
			.andExpect(status().isUnauthorized());
	}

}
