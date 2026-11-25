package com.ecommerce.shop.catalog;

import java.math.BigDecimal;
import java.util.List;

import com.ecommerce.shop.common.ValidationPatterns;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public final class CatalogDtos {

	private static final String URL_MESSAGE = "use um caminho interno (/...) ou um endereço https://";
	private static final String SLUG_MESSAGE = "use letras minúsculas, números e hífens";

	private CatalogDtos() {
	}

	public record CategoryResponse(Long id, String name, String slug, String imageUrl, int position) {

		static CategoryResponse from(Category c) {
			return new CategoryResponse(c.getId(), c.getName(), c.getSlug(), c.getImageUrl(), c.getPosition());
		}

	}

	public record ProductResponse(Long id, String name, String slug, String description, String categoryName,
			String categorySlug, BigDecimal price, BigDecimal oldPrice, boolean inStock, String imageUrl,
			String hoverImageUrl, BigDecimal rating, int reviewCount, boolean personalizable, boolean bestSeller) {

		static ProductResponse from(Product p) {
			Category c = p.getCategory();
			return new ProductResponse(p.getId(), p.getName(), p.getSlug(), p.getDescription(),
					c == null ? null : c.getName(), c == null ? null : c.getSlug(), p.getPrice(), p.getOldPrice(),
					p.getStockQuantity() > 0, p.getImageUrl(), p.getHoverImageUrl(), p.getRating(),
					p.getReviewCount(), p.isPersonalizable(), p.isBestSeller());
		}

	}

	public record PageResponse<T>(List<T> items, int page, int size, long totalItems, int totalPages) {
	}

	public record CategoryRequest(
			@NotBlank @Size(max = 120) String name,
			@NotBlank @Size(max = 140) @Pattern(regexp = ValidationPatterns.SLUG, message = SLUG_MESSAGE) String slug,
			@Pattern(regexp = ValidationPatterns.SAFE_URL, message = URL_MESSAGE) @Size(max = 500) String imageUrl,
			@Min(0) int position) {
	}

	public record ProductRequest(
			@NotBlank @Size(max = 200) String name,
			@NotBlank @Size(max = 220) @Pattern(regexp = ValidationPatterns.SLUG, message = SLUG_MESSAGE) String slug,
			@Size(max = 2000) String description,
			@NotNull @DecimalMin("0.00") BigDecimal price,
			@DecimalMin("0.00") BigDecimal oldPrice,
			@Min(0) int stockQuantity,
			Long categoryId,
			@Pattern(regexp = ValidationPatterns.SAFE_URL, message = URL_MESSAGE) @Size(max = 500) String imageUrl,
			@Pattern(regexp = ValidationPatterns.SAFE_URL, message = URL_MESSAGE) @Size(max = 500) String hoverImageUrl,
			Boolean active,
			Boolean personalizable,
			Boolean bestSeller) {
	}

}
