package com.ecommerce.shop.user;

/** Representação pública do usuário. Nunca expõe o hash da senha. */
public record UserResponse(Long id, String name, String email, Role role) {

	public static UserResponse from(User user) {
		return new UserResponse(user.getId(), user.getName(), user.getEmail(), user.getRole());
	}

}
