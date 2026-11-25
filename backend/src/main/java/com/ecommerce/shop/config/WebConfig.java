package com.ecommerce.shop.config;

import java.time.Clock;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.ecommerce.shop.common.FileStorage;

@Configuration
public class WebConfig implements WebMvcConfigurer {

	private final FileStorage fileStorage;

	public WebConfig(FileStorage fileStorage) {
		this.fileStorage = fileStorage;
	}

	/** Serve as imagens enviadas pelo painel em /uploads/**. */
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/uploads/**")
			.addResourceLocations(fileStorage.directory().toUri().toString());
	}

	@Bean
	Clock clock() {
		return Clock.systemDefaultZone();
	}

}
