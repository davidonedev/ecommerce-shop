package com.ecommerce.shop.catalog;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.shop.catalog.CatalogDtos.CategoryRequest;
import com.ecommerce.shop.catalog.CatalogDtos.CategoryResponse;
import com.ecommerce.shop.catalog.CatalogDtos.ProductRequest;
import com.ecommerce.shop.catalog.CatalogDtos.ProductResponse;

import jakarta.validation.Valid;

/** Cadastro de categorias e produtos (somente ADMIN). */
@RestController
@RequestMapping("/api/admin")
public class AdminCatalogController {

	private final CatalogService catalog;

	public AdminCatalogController(CatalogService catalog) {
		this.catalog = catalog;
	}

	@PostMapping("/categories")
	@ResponseStatus(HttpStatus.CREATED)
	public CategoryResponse createCategory(@Valid @RequestBody CategoryRequest request) {
		return catalog.createCategory(request);
	}

	@PutMapping("/categories/{id}")
	public CategoryResponse updateCategory(@PathVariable Long id, @Valid @RequestBody CategoryRequest request) {
		return catalog.updateCategory(id, request);
	}

	@PostMapping("/products")
	@ResponseStatus(HttpStatus.CREATED)
	public ProductResponse createProduct(@Valid @RequestBody ProductRequest request) {
		return catalog.createProduct(request);
	}

	@PutMapping("/products/{id}")
	public ProductResponse updateProduct(@PathVariable Long id, @Valid @RequestBody ProductRequest request) {
		return catalog.updateProduct(id, request);
	}

}
