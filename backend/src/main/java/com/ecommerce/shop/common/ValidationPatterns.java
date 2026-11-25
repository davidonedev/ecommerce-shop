package com.ecommerce.shop.common;

/**
 * Aceita apenas caminhos internos ("/...", sem "//") ou URLs https. Bloqueia esquemas como javascript: e data:,
 * evitando links e imagens perigosos vindos do painel administrativo.
 */
public final class ValidationPatterns {

	public static final String SAFE_URL = "^(/(?!/)[^\\s]*|https://[^\\s]+)$";

	public static final String SLUG = "^[a-z0-9]+(-[a-z0-9]+)*$";

	private ValidationPatterns() {
	}

}
