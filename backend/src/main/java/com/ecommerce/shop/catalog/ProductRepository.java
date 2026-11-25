package com.ecommerce.shop.catalog;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductRepository extends JpaRepository<Product, Long> {

	/** Busca da vitrine. Filtro vazio ("") significa "sem filtro" (evita parâmetro NULL tipado no PostgreSQL). */
	@EntityGraph(attributePaths = "category")
	@Query("""
			select p from Product p left join p.category c
			where p.active = true
			  and (:category = '' or c.slug = :category)
			  and (:q = '' or lower(p.name) like lower(concat('%', :q, '%')))
			""")
	Page<Product> search(@Param("category") String category, @Param("q") String q, Pageable pageable);

	@EntityGraph(attributePaths = "category")
	Optional<Product> findBySlugAndActiveTrue(String slug);

	@EntityGraph(attributePaths = "category")
	List<Product> findTop5ByActiveTrueAndBestSellerTrueOrderByReviewCountDesc();

	boolean existsBySlug(String slug);

	boolean existsBySlugAndIdNot(String slug, Long id);

}
