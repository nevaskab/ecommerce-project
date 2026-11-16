# UI/UX design / Design de UI/UX

## Português

O layout segue uma abordagem mobile-first com Tailwind CSS, usando Grid e Flexbox para adaptar navegação, banners, categorias e cards. O `Layout` mantém header e footer consistentes entre as páginas.

As páginas de autenticação têm fluxos separados para visitantes, enquanto perfil, carrinho e wishlist ficam atrás de `PrivateRoute`. O seletor de idioma está disponível no shell da aplicação. O assistente Cybertech AI fica acessível por um botão flutuante e apresenta sugestões, estado de carregamento e links internos para carrinho e wishlist.

Cuidados de acessibilidade presentes incluem labels ocultos para campos, `aria-label`, `aria-expanded`, `aria-live`, foco visível e botões com estados desabilitados. Imagens promocionais usam variações mobile quando disponíveis.

## English

The layout follows a mobile-first approach with Tailwind CSS, using Grid and Flexbox to adapt navigation, banners, categories, and cards. `Layout` keeps the header and footer consistent across pages.

Authentication pages have separate guest flows, while profile, cart, and wishlist are protected by `PrivateRoute`. The language selector is part of the application shell. The Cybertech AI assistant is available through a floating button and provides suggestions, a loading state, and internal links to cart and wishlist.

Accessibility considerations include hidden field labels, `aria-label`, `aria-expanded`, `aria-live`, visible focus, and disabled button states. Promotional images use mobile variants when available.
