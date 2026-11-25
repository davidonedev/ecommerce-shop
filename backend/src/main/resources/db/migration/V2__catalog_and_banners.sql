ALTER TABLE categories
    ADD COLUMN image_url VARCHAR(500),
    ADD COLUMN position  INTEGER NOT NULL DEFAULT 0;

ALTER TABLE products
    ADD COLUMN old_price         NUMERIC(12, 2) CHECK (old_price IS NULL OR old_price >= 0),
    ADD COLUMN image_url         VARCHAR(500),
    ADD COLUMN hover_image_url   VARCHAR(500),
    ADD COLUMN rating            NUMERIC(2, 1) NOT NULL DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
    ADD COLUMN review_count      INTEGER NOT NULL DEFAULT 0 CHECK (review_count >= 0),
    ADD COLUMN personalizable    BOOLEAN NOT NULL DEFAULT FALSE,
    ADD COLUMN best_seller       BOOLEAN NOT NULL DEFAULT FALSE;

CREATE TABLE banners (
    id               BIGSERIAL PRIMARY KEY,
    title            VARCHAR(160) NOT NULL,
    subtitle         VARCHAR(300),
    image_url        VARCHAR(500) NOT NULL,
    mobile_image_url VARCHAR(500),
    link_url         VARCHAR(500),
    cta_label        VARCHAR(60),
    position         INTEGER NOT NULL DEFAULT 0,
    active           BOOLEAN NOT NULL DEFAULT TRUE,
    starts_at        TIMESTAMP,
    ends_at          TIMESTAMP,
    created_at       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CHECK (ends_at IS NULL OR starts_at IS NULL OR ends_at > starts_at)
);

CREATE INDEX idx_banners_active_position ON banners (active, position);
