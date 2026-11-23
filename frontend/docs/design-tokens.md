# Design tokens: azul-marinho + caramelo

Loja moderna e comercial: **azul-marinho** para estrutura e ação, **caramelo** só como destaque, títulos em **caixa alta e negrito** (Poppins), texto em Inter e **uma** frase manuscrita (Allura) por seção de destaque.

- **Fonte de verdade:** `src/app/globals.css` (variáveis CSS + tema do Tailwind + utilitários).
- **Espelho em código:** `src/lib/tokens/tokens.ts`. O teste `tokens.test.ts` falha se o CSS e o TypeScript se afastarem, ou se a decisão de contraste de algum par deixar de ser verdadeira.
- **Receitas dos componentes:** `src/components/ui/variants.ts`.
- **Vitrine ao vivo:** rota `/design-system` (inclui o topo e a parte de baixo da home montados só com estes componentes).

Regra de ouro: **nenhuma cor, tamanho ou raio solto no código.** Use as classes dos tokens abaixo.

## Cores

| Classe                               | Hex                    | Uso                                                                        |
| ------------------------------------ | ---------------------- | -------------------------------------------------------------------------- |
| `bg-navy` / `text-navy`              | `#0F1B33` Azul-marinho | Botão primário, títulos, barra superior, footer, selo e badge de desconto  |
| `bg-navy-hover`                      | `#1A2A4A`              | Hover do primário                                                          |
| `bg-caramel` / `text-caramel`        | `#B48A5E` Caramelo     | Frase manuscrita, ponto ativo, painel de oferta, bordas de destaque        |
| `bg-caramel-light`                   | `#D9BE9C`              | Botão "Fale conosco", "50%" do selo                                        |
| `bg-sand`                            | `#EFE7DD` Areia        | Fundo do hero, tons quentes                                                |
| `bg-bg`                              | `#FFFFFF`              | Fundo da página                                                            |
| `bg-surface`                         | `#F4F4F5`              | Tiles de categoria, imagem dos cards, painel 3                             |
| `text-text`                          | `#111827`              | Texto principal                                                            |
| `text-text-muted`                    | `#5B6170`              | Descrições, apoio, placeholder                                             |
| `text-text-subtle`                   | `#9CA3AF`              | **Só** preço riscado e legenda decorativa                                  |
| `text-star`                          | `#F5A623`              | Estrelas de avaliação                                                      |
| `border-border`                      | `#E5E7EB`              | Borda de cards e divisores **decorativos**                                 |
| `text-on-dark`                       | `#FFFFFF`              | Texto sobre marinho                                                        |
| **`text-caramel-ink`** (derivado)    | `#7E6142`              | Texto **pequeno** em caramelo sobre claro (overline, badge Personalizável) |
| **`border-field-border`** (derivado) | `#80868F`              | Borda de input, select, botão do card; ponto inativo do carrossel          |
| **`text-on-dark-muted`** (derivado)  | `#C4CAD6`              | Texto secundário sobre marinho (footer, barra superior)                    |
| **`text-danger`** (derivado)         | `#B42318`              | Mensagem de erro de formulário e aviso de erro                             |
| `bg-scrim`                           | `rgb(15 27 51 / .55)`  | Véu atrás de modais e drawers                                              |

Os hex da tabela do briefing **não foram alterados**. Os 4 derivados existem só para passar no contraste, mantendo a mesma família de cor.

### Contraste (WCAG AA): decisão de uso de cada par

Texto precisa de **4,5:1**; texto grande (≥ 24px, ou ≥ 18,66px em negrito) e elementos de interface, de **3:1**. A vitrine mostra esta tabela calculada ao vivo (`lib/tokens/contrast-pairs.ts`).

| Par                              | Razão                 | Decisão                                                                                                                                            |
| -------------------------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| text / bg, sand, surface         | 17,74 / 14,48 / 16,14 | Passa. Texto principal.                                                                                                                            |
| text-muted / bg, sand, surface   | 6,20 / 5,06 / 5,64    | Passa. Descrições e **placeholder**.                                                                                                               |
| on-dark / navy, navy-hover       | 17,14 / 14,25         | Passa. Botão primário, barra, footer, badge `-20%`.                                                                                                |
| navy / bg, sand, surface         | 17,14 / 14,00 / 15,60 | Passa. Títulos, botão outline, painel 3.                                                                                                           |
| on-dark-muted / navy, navy-hover | 10,42 / 8,66          | Passa. Texto secundário do footer.                                                                                                                 |
| **caramel / bg**                 | **3,12**              | **Reprova para texto pequeno.** Só texto grande (Allura ≥ 26px) e UI.                                                                              |
| caramel-ink / bg, surface, sand  | 5,71 / 5,20 / 4,66    | Passa. Substitui o caramelo em texto pequeno.                                                                                                      |
| **on-dark (branco) / caramel**   | **3,12**              | **Reprova.** Texto sobre caramelo é sempre **marinho**.                                                                                            |
| navy / caramel, caramel-light    | 5,50 / 9,63           | Passa. Painel de oferta e botão caramelo.                                                                                                          |
| caramel-light / navy             | 9,63                  | Passa. "50%" do selo e trecho final da barra superior.                                                                                             |
| caramel / navy                   | 5,50                  | Passa. Realce caramelo sobre marinho.                                                                                                              |
| **text-subtle / bg**             | **2,54**              | **Reprova até como UI.** Só preço riscado (que também sai em texto: "Preço anterior:") e legenda decorativa.                                       |
| **border / bg**                  | **1,24**              | **Reprova como borda de campo.** Só divisor decorativo.                                                                                            |
| field-border / bg, surface       | 3,67 / 3,34           | Passa (3:1). Borda de input e controles.                                                                                                           |
| field-border / **sand**          | **2,99**              | Quase: **não** use como borda essencial sobre areia (use `border-text-muted`).                                                                     |
| **text-muted / navy**            | **2,77**              | **Reprova.** Use `on-dark-muted`.                                                                                                                  |
| danger / bg, surface             | 6,57 / 5,98           | Passa.                                                                                                                                             |
| navy (foco) / bg                 | 17,14                 | Passa. Anel de foco de 2px.                                                                                                                        |
| caramel-light (foco) / navy      | 9,63                  | Passa. Anel de foco sobre fundo marinho (`focus-inverse`).                                                                                         |
| **star / bg**                    | **2,03**              | **Reprova como gráfico isolado.** Mitigação: a nota também vai em texto (`<Rating showValue />`) e no `aria-label` ("4,9 de 5, 2.300 avaliações"). |

Regras decorrentes:

1. **Texto sobre marinho:** `text-on-dark` (secundário: `text-on-dark-muted`). **Foco sobre marinho:** `focus-inverse` (ou `focusRingInverse` nas receitas).
2. **Texto sobre caramelo:** **sempre marinho.** Nunca branco.
3. **Caramelo em texto pequeno sobre claro:** `text-caramel-ink`. O caramelo puro é para preenchimento, borda e texto grande.
4. **Placeholder e descrição:** `text-text-muted`, nunca `text-text-subtle`.
5. **Frase manuscrita (Allura):** caramelo **só sobre branco** (3,12:1, texto grande). Sobre areia, use `text-caramel-ink`.

## Tipografia

Poppins (600/700/800) em títulos, menu, botões e preço; Inter (400/500) no texto; Allura (400) em uma frase por seção de destaque. Cada estilo é um utilitário que já define família, tamanho, peso, tracking e caixa. Todos fluidos entre 360px e 1440px.

| Classe                                     | Tamanho (360 → 1440) | Fonte / peso            | Caixa         | Uso                                               |
| ------------------------------------------ | -------------------- | ----------------------- | ------------- | ------------------------------------------------- |
| `text-topbar`                              | 12 → 20px            | Poppins 800             | ALTA          | Barra superior (trecho final em `text-caramel`)   |
| `text-overline`                            | 13px                 | Poppins 600, 0,12em     | ALTA          | "BEM-VINDO À [NOME DA LOJA]" (`text-caramel-ink`) |
| `text-display-hero`                        | 34 → 56px, lh 1,05   | Poppins 800             | ALTA          | Único h1 da home                                  |
| `text-script`                              | 26 → 36px            | Allura 400              | normal        | Frase manuscrita (caramelo sobre branco)          |
| `text-section-title`                       | 18 → 20px, 0,04em    | Poppins 700             | ALTA          | H2 de seção, título de modal/drawer               |
| `text-nav`                                 | 13px, 0,06em         | Poppins 600             | ALTA          | Menu                                              |
| `text-button`                              | 13px, 0,06em         | Poppins 600             | ALTA          | Botões                                            |
| `text-button-sm`                           | 12px, 0,06em         | Poppins 600             | ALTA          | Botão do card, link de seção                      |
| `text-body`                                | 15 → 16px, lh 1,6    | Inter 400               | normal        | Descrições                                        |
| `text-product-name`                        | 14px                 | Inter 500               | normal        | Nome do produto                                   |
| `text-tile-name`                           | 13px                 | Inter 500               | normal        | Nome no tile de categoria                         |
| `text-price`                               | 17px                 | Poppins 700             | normal        | Preço atual                                       |
| `text-cart-total`                          | 14px                 | Poppins 600             | normal        | Total do carrinho no header                       |
| `text-caption`                             | 12px                 | Inter 400               | normal        | Apoio, nº de avaliações                           |
| `text-panel-title`                         | 16px, 0,04em         | Poppins 700             | ALTA          | Título dos painéis promocionais                   |
| `text-benefit-title` / `text-benefit-text` | 11px                 | Poppins 600 / Inter 400 | ALTA / normal | Linha de benefícios do hero                       |
| `text-badge` / `text-badge-xs`             | 11px / 10px          | Poppins 700 / 600       | — / ALTA      | "-20%" / "PERSONALIZÁVEL"                         |
| `text-seal`                                | 24 → 32px            | Poppins 800             | normal        | "50%" do selo de desconto                         |

- Os títulos `h1`–`h4` são Poppins 700 com tracking -0,01em; **a caixa alta vem dos utilitários acima** (assim nomes de produto e páginas antigas ficam em caixa normal).
- O tamanho vem da classe, não da tag. Mantenha **um único `<h1>` por página**. Os slides 2 e 3 do hero usam `<h2>`/`<p>`, nunca um segundo `<h1>`.
- **Largura do título do hero:** "FEITO PARA VOCÊ." em Poppins 800 a 56px mede cerca de **640px**. A coluna de texto do hero precisa de pelo menos isso a 1440px para o título caber em 2 linhas (a 360px, 34px, cabe em 328px de largura útil).
- As variáveis das fontes (`--font-poppins` etc.) vêm de `fontClassNames` (`src/app/fonts.ts`), que **deve estar no `<html>`**.

### Fontes de personalização (não são da interface)

O texto do **cliente** nas prévias e em `/personalizar` usa 4 fontes que só carregam quando aparecem (sem preload): `font-personalize-classic` (Fraunces), `-elegant` (Playfair Display itálico), `-script` (Caveat), `-bold` (Archivo Black). As 5 cores do texto (`personalizeColors`) são opções do **produto**, não da marca, e seus ids vão na query string de `/personalizar` (não mudam).

## Espaço, layout e forma

- Base de **4px**: `p-1`=4, `p-2`=8, `p-3`=12, `p-4`=16, `p-6`=24, `p-8`=32, `p-12`=48, `p-16`=64, `p-20`=80.
- `container-page`: máx. **1280px**, gutter 24px (16px abaixo de 640px).
- **`section-gap`**: ritmo vertical **entre** seções, como margem superior (48px no celular, 56px a partir de 768px, 64px a partir de 1024px). Aplique em cada seção que vem depois de outra; não some `padding` por cima.
- `section-head`: linha do título da seção com o link à direita, 24px de respiro até o conteúdo.
- Raios: `rounded-control` 4px (botões, inputs, badges), `rounded-card` 8px (cards, tiles, modais), `rounded-panel` 8px (faixa promocional), `rounded-full` (selo de desconto, contador, setas). **Legado:** `rounded-sm/md/lg` = 4/8/8.
- Sombras mínimas: `shadow-soft` (quase nada), `shadow-hover` (`0 6px 20px rgb(15 27 51 / .08)`, hover de card), `shadow-lift` (só modal, drawer, toast). A separação é por borda de 1px.
- Ícones: **Lucide**, `strokeWidth={1.5}`, 20 a 24px, cor marinho. O Lucide atual **não tem ícones de marcas** (Instagram, Facebook...): use SVGs próprios nas redes sociais.
- Breakpoints: `xs` 360, `sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1440.

### Recorte diagonal do hero

`clip-diagonal-left` (a partir de 768px) recorta a borda **esquerda** do bloco areia, com o topo mais à direita que a base, como no modelo. Aplique no elemento de fundo areia, posicionado à direita (`absolute inset-y-0 right-0 -z-10 hidden w-[47%] bg-sand md:block`). A inclinação é `--diagonal-inset` (padrão 10%; use `[--diagonal-inset:12%]`). No celular o bloco fica reto, embaixo do texto.

## Movimento

Discreto e funcional. Sem autoplay, sem parallax, sem rolagem sequestrada.

- `fade-slide`: crossfade de slide (400ms). Marque o ativo com `data-active="true"`; os demais ficam `visibility: hidden` (saem do teclado e dos leitores de tela).
- `lift` / hover de tile e card: sobe 2px. Cards e tiles dos componentes já fazem isso (`data-interactive`).
- `image-zoom` (zoom 1,04) e `arrow-slide` (seta 4px): o pai precisa de `group`.
- Botão do card: transição de cor em 200ms (`duration-button`); clique escala 0,98.
- `animate-cart-bump`: o contador do carrinho "pula" quando o número muda (`<CountBadge />` já faz).
- `animate-fade-up`: entrada de seção (fade + 16px, 400ms, uma vez).
- **`prefers-reduced-motion`**: entradas aparecem no estado final, shimmer e "pulo" param, zoom/seta/lift não acontecem e as transições ficam instantâneas. Já tratado em `globals.css`.

## Componentes (`src/components/ui`)

| Componente                                                             | Notas                                                                                                                                                                                                                                                                                                                                                                                                     |
| ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Button`                                                               | `variant`: `primary`, `outline`, `caramel` (**só sobre fundo marinho**), `ghost`, `link`, `cart`. `size`: `xs`, `sm`, `md`, `lg`. `arrow` acrescenta "→"; com `asChild`, use `<ButtonArrow />` dentro do filho. Todos com alvo de toque de 44px (o `xs` estende por pseudo-elemento). **Classes extras passadas em `className` vencem as do botão** (`hidden md:inline-flex` esconde o botão no celular). |
| `Button variant="cart"`                                                | Largura total, outline cinza, ícone à esquerda, 12px caixa alta; hover vira marinho em 200ms. O rótulo pode **quebrar em 2 linhas** em cards estreitos (altura mínima de 48px mantém o alinhamento).                                                                                                                                                                                                      |
| `DiscountSeal`                                                         | Círculo marinho, 80px no celular e 112px no desktop. `prefix`, `value`, `suffix`, `label`. Posicione-o (absolute) sobre a divisa texto/foto.                                                                                                                                                                                                                                                              |
| `Badge`                                                                | `tone`: `discount` ("-20%"), `customizable`, `bestseller`, `new`, `ready`.                                                                                                                                                                                                                                                                                                                                |
| `Rating`                                                               | 5 estrelas de 12px + "(nº)". `showValue` mostra a nota em texto. **Renderiza um `<div>`: nunca dentro de `<p>`.**                                                                                                                                                                                                                                                                                         |
| `ProductCard`                                                          | `variant="shop"` (home: selo `-N%` calculado de `oldPrice`, Rating, preço + antigo riscado, botão `cart` ou link PERSONALIZAR) ou `"detailed"` (padrão, `/produtos`). `onAddToCart` opcional; sem ele adiciona ao carrinho (zustand) e avisa (se houver provedor de toast).                                                                                                                               |
| `CategoryTile`                                                         | Tile quadrado (`name`, `href`, `image`, `more`). `CategoryCard` (foto + degradê) continua para outros usos.                                                                                                                                                                                                                                                                                               |
| `CarouselArrow`                                                        | `appearance="chevron"` (esquerda, sem círculo) ou `"circle"` (direita, branco com borda fina); `direction`.                                                                                                                                                                                                                                                                                               |
| `CarouselDots`                                                         | `count`, `active`, `onSelect`; ativo caramelo e mais largo; alvo de 44px de altura.                                                                                                                                                                                                                                                                                                                       |
| `BenefitRow`                                                           | Linha de benefícios do hero (ícone + título 11px + apoio 11px, divisores finos, rola no celular). **O pai em grid/flex precisa de `min-w-0`.**                                                                                                                                                                                                                                                            |
| `PromoPanels` / `PromoPanel`                                           | Faixa de 3 painéis: `tone="navy" \| "caramel" \| "light"`. O de caramelo usa texto marinho.                                                                                                                                                                                                                                                                                                               |
| `AvatarStack`                                                          | Avatares sobrepostos (decorativo). Combine com `<Rating showValue />`.                                                                                                                                                                                                                                                                                                                                    |
| `CountBadge`                                                           | Contador circular marinho; "pula" quando muda.                                                                                                                                                                                                                                                                                                                                                            |
| `SectionLink`                                                          | "VER TODOS OS PRODUTOS →" com seta que desliza.                                                                                                                                                                                                                                                                                                                                                           |
| `Input`, `Select`, `Field`                                             | 44px, borda `field-border`, foco com anel marinho. Colados: `inputJoinedClass` + `buttonJoinedClass`.                                                                                                                                                                                                                                                                                                     |
| Recipes                                                                | `footerLinkClass`, `socialButtonClass`, `paymentBadgeClass` (footer marinho).                                                                                                                                                                                                                                                                                                                             |
| `Chip`, `Accordion`, `Modal`, `Drawer`, `Toast`, `Tooltip`, `Skeleton` | Na paleta nova; foco visível.                                                                                                                                                                                                                                                                                                                                                                             |

Convenções: botão carregando usa `data-loading`; chip selecionado usa `selected` + `aria-pressed`; cards clicáveis levam `data-interactive`.

## Apelidos legados (remover quando as outras páginas forem redesenhadas)

As páginas `/produtos`, `/carrinho`, `/checkout` e `/personalizar` ainda usam os nomes antigos. Em vez de editá-las, os nomes viraram **apelidos** das cores novas:

| Antigo         | Agora        | Antigo                             | Agora                             |
| -------------- | ------------ | ---------------------------------- | --------------------------------- |
| `ink`          | `text`       | `blush`                            | `sand`                            |
| `ink-muted`    | `text-muted` | `sage`                             | `caramel`                         |
| `accent`       | `navy`       | `on-sage`                          | `navy`                            |
| `accent-hover` | `navy-hover` | `font-display`                     | Poppins                           |
| `on-accent`    | `on-dark`    | `text-h1/h2/h3`, `text-display-xl` | Poppins 700/800, tamanhos menores |

`surface` e `sand` mantêm o nome, mas **já têm os valores novos** (`#F4F4F5` e `#EFE7DD`). `Button variant="accent"` = `primary` e `"secondary"` = `outline`. `text-caption` agora é Inter 400 normal (antes era caixa alta).

## Modo escuro (preparado, não ativado)

`[data-theme="dark"]` já redefine os tokens e passa nos pares principais (texto/fundo 17,0:1; texto suave/fundo 8,4:1; on-dark/navy 9,6:1). Nada define esse atributo hoje.

**Antes de ativar:** footer e barra superior usam `bg-navy` como superfície estrutural, e no escuro `navy` vira o tom claro dos botões. Será preciso um token próprio para essas superfícies.

## Regras de uso

1. Azul-marinho é estrutura e ação; **caramelo só destaque**, nunca blocos grandes de texto.
2. Áreas de toque ≥ 44px (todos os botões, chips, setas e pontos respeitam).
3. Um único `<h1>` por página; o texto da marca vem de `lib/brand` (`[NOME DA LOJA]`), nunca digitado em componentes.
4. Preços no formato `R$ 189,90` (`formatPrice`). Preço riscado sempre acompanhado de texto para leitores de tela.
5. O texto do carrinho no header ("R$ 189,90") e o `CountBadge` são decorativos para leitores de tela: descreva a quantidade e o total no `aria-label` do link do carrinho.
