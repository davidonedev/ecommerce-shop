package com.ecommerce.shop.catalog;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.shop.catalog.CatalogDtos.CategoryResponse;
import com.ecommerce.shop.catalog.CatalogDtos.PageResponse;
import com.ecommerce.shop.catalog.CatalogDtos.ProductResponse;

/** Vitrine pública: categorias e produtos. */
@RestController
@RequestMapping("/api")
public class CatalogController {

	private final CatalogService catalog;

	public CatalogController(CatalogService catalog) {
		this.catalog = catalog;
	}

	@GetMapping("/categories")
	public List<CategoryResponse> categories() {
		return catalog.listCategories();
	}

	@GetMapping("/products")
	public PageResponse<ProductResponse> products(@RequestParam(required = false) String category,
			@RequestParam(required = false) String q, @RequestParam(required = false) String sort,
			@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "12") int size) {
		return catalog.searchProducts(category, q, sort, page, size);
	}

	@GetMapping("/products/best-sellers")
	public List<ProductResponse> bestSellers() {
		return catalog.bestSellers();
	}

	@GetMapping("/products/{slug}")
	public ProductResponse product(@PathVariable String slug) {
		return catalog.findProduct(slug);
	}

}
