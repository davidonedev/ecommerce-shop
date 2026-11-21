package com.ecommerce.shop.auth;

import com.ecommerce.shop.user.Role;

/** Principal colocado no SecurityContext a partir do token JWT. */
public record AuthenticatedUser(Long id, String email, Role role) {
}
