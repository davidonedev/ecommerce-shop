package com.ecommerce.shop.banner;

import java.time.Clock;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecommerce.shop.banner.BannerDtos.BannerRequest;
import com.ecommerce.shop.banner.BannerDtos.BannerResponse;
import com.ecommerce.shop.common.ResourceNotFoundException;

@Service
public class BannerService {

	private final BannerRepository banners;
	private final Clock clock;

	public BannerService(BannerRepository banners, Clock clock) {
		this.banners = banners;
		this.clock = clock;
	}

	@Transactional(readOnly = true)
	public List<BannerResponse> visibleBanners() {
		return banners.findVisible(LocalDateTime.now(clock)).stream().map(BannerResponse::from).toList();
	}

	@Transactional(readOnly = true)
	public List<BannerResponse> listAll() {
		return banners.findAllByOrderByPositionAscIdAsc().stream().map(BannerResponse::from).toList();
	}

	@Transactional
	public BannerResponse create(BannerRequest request) {
		Banner b = new Banner();
		apply(b, request, banners.findAll().size());
		return BannerResponse.from(banners.save(b));
	}

	@Transactional
	public BannerResponse update(Long id, BannerRequest request) {
		Banner b = find(id);
		apply(b, request, b.getPosition());
		return BannerResponse.from(b);
	}

	@Transactional
	public void delete(Long id) {
		banners.delete(find(id));
	}

	/** Define a ordem de exibição conforme a lista recebida (posição 1, 2, 3...). */
	@Transactional
	public List<BannerResponse> reorder(List<Long> ids) {
		int position = 1;
		for (Long id : ids) {
			find(id).setPosition(position++);
		}
		return listAll();
	}

	private Banner find(Long id) {
		return banners.findById(id).orElseThrow(() -> new ResourceNotFoundException("Banner não encontrado."));
	}

	private void apply(Banner b, BannerRequest r, int defaultPosition) {
		if (r.startsAt() != null && r.endsAt() != null && !r.endsAt().isAfter(r.startsAt())) {
			throw new IllegalArgumentException("A data de término deve ser posterior à de início.");
		}
		b.setTitle(r.title().trim());
		b.setSubtitle(r.subtitle());
		b.setImageUrl(r.imageUrl());
		b.setMobileImageUrl(r.mobileImageUrl());
		b.setLinkUrl(r.linkUrl());
		b.setCtaLabel(r.ctaLabel());
		b.setActive(r.active() == null || r.active());
		b.setStartsAt(r.startsAt());
		b.setEndsAt(r.endsAt());
		if (b.getId() == null) {
			b.setPosition(defaultPosition + 1);
		}
	}

}
