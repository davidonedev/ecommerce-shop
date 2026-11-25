package com.ecommerce.shop.common;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/** Upload de imagens para banners e produtos (somente ADMIN). */
@RestController
@RequestMapping("/api/admin/uploads")
public class AdminUploadController {

	private final FileStorage storage;

	public AdminUploadController(FileStorage storage) {
		this.storage = storage;
	}

	@PostMapping(consumes = "multipart/form-data")
	@ResponseStatus(HttpStatus.CREATED)
	public Map<String, String> upload(@RequestParam("file") MultipartFile file) {
		return Map.of("url", storage.store(file));
	}

}
