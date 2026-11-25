package com.ecommerce.shop.banner;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BannerRepository extends JpaRepository<Banner, Long> {

	/** Banners ativos e dentro da janela de exibição (datas nulas = sem limite). */
	@Query("""
			select b from Banner b
			where b.active = true
			  and (b.startsAt is null or b.startsAt <= :now)
			  and (b.endsAt is null or b.endsAt > :now)
			order by b.position asc, b.id asc
			""")
	List<Banner> findVisible(@Param("now") LocalDateTime now);

	List<Banner> findAllByOrderByPositionAscIdAsc();

}
