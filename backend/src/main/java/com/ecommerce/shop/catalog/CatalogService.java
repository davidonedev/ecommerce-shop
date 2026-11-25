package com.ecommerce.shop.catalog;

import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecommerce.shop.catalog.CatalogDtos.CategoryRequest;
import com.ecommerce.shop.catalog.CatalogDtos.CategoryResponse;
import com.ecommerce.shop.catalog.CatalogDtos.PageResponse;
import com.ecommerce.shop.catalog.CatalogDtos.ProductRequest;
import com.ecommerce.shop.catalog.CatalogDtos.ProductResponse;
import com.ecommerce.shop.common.ConflictException;
import com.ecommerce.shop.common.ResourceNotFoundException;

@Service
public class CatalogService {

	private static final int MAX_PAGE_SIZE = 48;
	private static final int DEFAULT_PAGE_SIZE = 12;

	/** Ordenações aceitas pela vitrine. Qualquer outro valor é recusado (400). */
	private static final Map<String, Sort> SORTS = Map.of(
			"relevance", Sort.by(Sort.Order.desc("bestSeller"), Sort.Order.desc("reviewCount"), Sort.Order.asc("id")),
			"price_asc", Sort.by(Sort.Order.asc("price"), Sort.Order.asc("id")),
			"price_desc", Sort.by(Sort.Order.desc("price"), Sort.Order.asc("id")),
			"rating", Sort.by(Sort.Order.desc("rating"), Sort.Order.desc("reviewCount"), Sort.Order.asc("id")),
			"name", Sort.by(Sort.Order.asc("name"), Sort.Order.asc("id")));

	private final CategoryRepository categories;
	private final ProductRepository products;

	public CatalogService(CategoryRepository categories, ProductRepository products) {
		this.categories = categories;
		this.products = products;
	}

	@Transactional(readOnly = true)
	public List<CategoryResponse> listCategories() {
		return categories.findAllByOrderByPositionAscNameAsc().stream().map(CategoryResponse::from).toList();
	}

	@Transactional(readOnly = true)
	public PageResponse<ProductResponse> searchProducts(String category, String q, String sort, int page, int size) {
		String sortKey = (sort == null || sort.isBlank()) ? "relevance" : sort.trim().toLowerCase(Locale.ROOT);
		Sort order = SORTS.get(sortKey);
		if (order == null) {
			throw new IllegalArgumentException("Ordenação inválida: " + sort);
		}
		int safePage = Math.max(page, 0);
		int safeSize = size <= 0 ? DEFAULT_PAGE_SIZE : Math.min(size, MAX_PAGE_SIZE);
		String categoryFilter = category == null ? "" : category.trim();
		String textFilter = q == null ? "" : q.trim();

		Page<Product> result = products.search(categoryFilter, textFilter,
				PageRequest.of(safePage, safeSize, order));
		return new PageResponse<>(result.map(ProductResponse::from).getContent(), safePage, safeSize,
				result.getTotalElements(), result.getTotalPages());
	}

	@Transactional(readOnly = true)
	public ProductResponse findProduct(String slug) {
		return products.findBySlugAndActiveTrue(slug).map(ProductResponse::from)
			.orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado."));
	}

	@Transactional(readOnly = true)
	public List<ProductResponse> bestSellers() {
		return products.findTop5ByActiveTrueAndBestSellerTrueOrderByReviewCountDesc().stream()
			.map(ProductResponse::from)
			.toList();
	}

	@Transactional
	public CategoryResponse createCategory(CategoryRequest request) {
		if (categories.existsBySlug(request.slug())) {
			throw new ConflictException("Já existe uma categoria com este endereço (slug).");
		}
		Category c = new Category();
		applyCategory(c, request);
		return CategoryResponse.from(categories.save(c));
	}

	@Transactional
	public CategoryResponse updateCategory(Long id, CategoryRequest request) {
		Category c = categories.findById(id).orElseThrow(() -> new ResourceNotFoundException("Categoria não encontrada."));
		if (categories.existsBySlugAndIdNot(request.slug(), id)) {
			throw new ConflictException("Já existe uma categoria com este endereço (slug).");
		}
		applyCategory(c, request);
		return CategoryResponse.from(c);
	}

	@Transactional
	public ProductResponse createProduct(ProductRequest request) {
		if (products.existsBySlug(request.slug())) {
			throw new ConflictException("Já existe um produto com este endereço (slug).");
		}
		Product p = new Product();
		applyProduct(p, request);
		return ProductResponse.from(products.save(p));
	}

	@Transactional
	public ProductResponse updateProduct(Long id, ProductRequest request) {
		Product p = products.findById(id).orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado."));
		if (products.existsBySlugAndIdNot(request.slug(), id)) {
			throw new ConflictException("Já existe um produto com este endereço (slug).");
		}
		applyProduct(p, request);
		return ProductResponse.from(p);
	}

	private void applyCategory(Category c, CategoryRequest r) {
		c.setName(r.name().trim());
		c.setSlug(r.slug());
		c.setImageUrl(r.imageUrl());
		c.setPosition(r.position());
	}

	private void applyProduct(Product p, ProductRequest r) {
		if (r.oldPrice() != null && r.oldPrice().compareTo(r.price()) <= 0) {
			throw new IllegalArgumentException("O preço antigo deve ser maior que o preço atual.");
		}
		p.setName(r.name().trim());
		p.setSlug(r.slug());
		p.setDescription(r.description());
		p.setPrice(r.price());
		p.setOldPrice(r.oldPrice());
		p.setStockQuantity(r.stockQuantity());
		p.setImageUrl(r.imageUrl());
		p.setHoverImageUrl(r.hoverImageUrl());
		p.setActive(r.active() == null || r.active());
		p.setPersonalizable(Boolean.TRUE.equals(r.personalizable()));
		p.setBestSeller(Boolean.TRUE.equals(r.bestSeller()));
		if (r.categoryId() == null) {
			p.setCategory(null);
		}
		else {
			Category c = categories.findById(r.categoryId())
				.orElseThrow(() -> new ResourceNotFoundException("Categoria não encontrada."));
			p.setCategory(c);
		}
	}

}
