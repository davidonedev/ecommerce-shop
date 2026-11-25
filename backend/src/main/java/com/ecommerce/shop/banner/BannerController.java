package com.ecommerce.shop.banner;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.shop.banner.BannerDtos.BannerResponse;

/** Banners exibidos no carrossel da home (apenas ativos e dentro da janela de datas). */
@RestController
@RequestMapping("/api/banners")
public class BannerController {

	private final BannerService banners;

	public BannerController(BannerService banners) {
		this.banners = banners;
	}

	@GetMapping
	public List<BannerResponse> list() {
		return banners.visibleBanners();
	}

}
