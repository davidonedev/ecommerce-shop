package com.ecommerce.shop.banner;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "banners")
@Getter
@Setter
@NoArgsConstructor
public class Banner {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false, length = 160)
	private String title;

	@Column(length = 300)
	private String subtitle;

	@Column(name = "image_url", nullable = false, length = 500)
	private String imageUrl;

	@Column(name = "mobile_image_url", length = 500)
	private String mobileImageUrl;

	@Column(name = "link_url", length = 500)
	private String linkUrl;

	@Column(name = "cta_label", length = 60)
	private String ctaLabel;

	@Column(nullable = false)
	private int position;

	@Column(nullable = false)
	private boolean active = true;

	@Column(name = "starts_at")
	private LocalDateTime startsAt;

	@Column(name = "ends_at")
	private LocalDateTime endsAt;

	@Column(name = "created_at", nullable = false, updatable = false)
	private LocalDateTime createdAt;

	@PrePersist
	void onCreate() {
		if (createdAt == null) {
			createdAt = LocalDateTime.now();
		}
	}

}
