package com.ecommerce.shop.banner;

import java.time.LocalDateTime;
import java.util.List;

import com.ecommerce.shop.common.ValidationPatterns;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public final class BannerDtos {

	private static final String URL_MESSAGE = "use um caminho interno (/...) ou um endereço https://";

	private BannerDtos() {
	}

	public record BannerResponse(Long id, String title, String subtitle, String imageUrl, String mobileImageUrl,
			String linkUrl, String ctaLabel, int position, boolean active, LocalDateTime startsAt,
			LocalDateTime endsAt) {

		static BannerResponse from(Banner b) {
			return new BannerResponse(b.getId(), b.getTitle(), b.getSubtitle(), b.getImageUrl(),
					b.getMobileImageUrl(), b.getLinkUrl(), b.getCtaLabel(), b.getPosition(), b.isActive(),
					b.getStartsAt(), b.getEndsAt());
		}

	}

	public record BannerRequest(
			@NotBlank @Size(max = 160) String title,
			@Size(max = 300) String subtitle,
			@NotBlank @Pattern(regexp = ValidationPatterns.SAFE_URL, message = URL_MESSAGE) @Size(max = 500) String imageUrl,
			@Pattern(regexp = ValidationPatterns.SAFE_URL, message = URL_MESSAGE) @Size(max = 500) String mobileImageUrl,
			@Pattern(regexp = ValidationPatterns.SAFE_URL, message = URL_MESSAGE) @Size(max = 500) String linkUrl,
			@Size(max = 60) String ctaLabel,
			Boolean active,
			LocalDateTime startsAt,
			LocalDateTime endsAt) {
	}

	public record ReorderRequest(@NotNull List<Long> ids) {
	}

}
