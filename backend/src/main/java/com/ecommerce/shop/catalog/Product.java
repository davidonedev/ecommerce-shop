package com.ecommerce.shop.catalog;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "category_id")
	private Category category;

	@Column(nullable = false, length = 200)
	private String name;

	@Column(nullable = false, unique = true, length = 220)
	private String slug;

	@Column(length = 2000)
	private String description;

	@Column(nullable = false, precision = 12, scale = 2)
	private BigDecimal price;

	@Column(name = "old_price", precision = 12, scale = 2)
	private BigDecimal oldPrice;

	@Column(name = "stock_quantity", nullable = false)
	private int stockQuantity;

	@Column(nullable = false)
	private boolean active = true;

	@Column(name = "image_url", length = 500)
	private String imageUrl;

	@Column(name = "hover_image_url", length = 500)
	private String hoverImageUrl;

	@Column(nullable = false, precision = 2, scale = 1)
	private BigDecimal rating = BigDecimal.ZERO;

	@Column(name = "review_count", nullable = false)
	private int reviewCount;

	@Column(nullable = false)
	private boolean personalizable;

	@Column(name = "best_seller", nullable = false)
	private boolean bestSeller;

	@Column(name = "created_at", nullable = false, updatable = false)
	private LocalDateTime createdAt;

	@PrePersist
	void onCreate() {
		if (createdAt == null) {
			createdAt = LocalDateTime.now();
		}
	}

}
