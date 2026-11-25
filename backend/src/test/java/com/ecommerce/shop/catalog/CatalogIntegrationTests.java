package com.ecommerce.shop.catalog;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;

import com.ecommerce.shop.TestcontainersConfiguration;

/** Vitrine pública. Usa os dados de exemplo do perfil dev (db/seed). */
@Import(TestcontainersConfiguration.class)
@SpringBootTest
@AutoConfigureMockMvc
class CatalogIntegrationTests {

	@Autowired
	MockMvc mockMvc;

	@Test
	void listsCategoriesInDisplayOrder() throws Exception {
		mockMvc.perform(get("/api/categories"))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.length()").value(3))
			.andExpect(jsonPath("$[0].slug").value("chinelos-personalizados"))
			.andExpect(jsonPath("$[1].slug").value("bolsas-personalizadas"))
			.andExpect(jsonPath("$[2].slug").value("tapetes"));
	}

	@Test
	void listsProductsWithPagination() throws Exception {
		mockMvc.perform(get("/api/products").param("size", "3"))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.items.length()").value(3))
			.andExpect(jsonPath("$.size").value(3))
			.andExpect(jsonPath("$.totalItems").value(13));
	}

	@Test
	void filtersByCategory() throws Exception {
		mockMvc.perform(get("/api/products").param("category", "chinelos-personalizados"))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.totalItems").value(4))
			.andExpect(jsonPath("$.items[0].slug").value("chinelo-personalizado-nome"));
	}

	@Test
	void searchesByNameIgnoringCase() throws Exception {
		mockMvc.perform(get("/api/products").param("q", "NECESSAIRE"))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.totalItems").value(1))
			.andExpect(jsonPath("$.items[0].slug").value("necessaire-iniciais"));
	}

	@Test
	void sortsByPriceAscending() throws Exception {
		mockMvc.perform(get("/api/products").param("sort", "price_asc").param("size", "1"))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.items[0].slug").value("chinelo-personalizado-nome"));
	}

	@Test
	void rejectsUnknownSort() throws Exception {
		mockMvc.perform(get("/api/products").param("sort", "drop_table"))
			.andExpect(status().isBadRequest());
	}

	@Test
	void returnsProductDetailWithCategory() throws Exception {
		mockMvc.perform(get("/api/products/tapete-sala-nome-da-familia"))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.categorySlug").value("tapetes"))
			.andExpect(jsonPath("$.oldPrice").value(349.90))
			.andExpect(jsonPath("$.inStock").value(true));
	}

	@Test
	void unknownProductIsNotFound() throws Exception {
		mockMvc.perform(get("/api/products/nao-existe"))
			.andExpect(status().isNotFound());
	}

	@Test
	void bestSellersAreTopFiveByReviews() throws Exception {
		mockMvc.perform(get("/api/products/best-sellers"))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.length()").value(5))
			.andExpect(jsonPath("$[0].slug").value("necessaire-iniciais"));
	}

}
