package com.ecommerce.shop.banner;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.shop.banner.BannerDtos.BannerRequest;
import com.ecommerce.shop.banner.BannerDtos.BannerResponse;
import com.ecommerce.shop.banner.BannerDtos.ReorderRequest;

import jakarta.validation.Valid;

/** Gestão dos banners do carrossel (somente ADMIN). */
@RestController
@RequestMapping("/api/admin/banners")
public class AdminBannerController {

	private final BannerService banners;

	public AdminBannerController(BannerService banners) {
		this.banners = banners;
	}

	@GetMapping
	public List<BannerResponse> list() {
		return banners.listAll();
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public BannerResponse create(@Valid @RequestBody BannerRequest request) {
		return banners.create(request);
	}

	@PutMapping("/{id}")
	public BannerResponse update(@PathVariable Long id, @Valid @RequestBody BannerRequest request) {
		return banners.update(id, request);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		banners.delete(id);
	}

	@PutMapping("/order")
	public List<BannerResponse> reorder(@Valid @RequestBody ReorderRequest request) {
		return banners.reorder(request.ids());
	}

}
