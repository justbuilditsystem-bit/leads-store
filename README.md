# Tienda de Leads — Shopify Theme

Tema custom de Shopify inspirado en la arquitectura de xclusiveagentleads.com, con branding de leads.justbuilditnow.com.

## Estructura

```
leads-store/
├── config/                 ← settings editables desde admin
│   ├── settings_schema.json
│   └── settings_data.json
├── layout/
│   └── theme.liquid        ← master template (head + body wrapper)
├── sections/               ← bloques editables y reordenables
│   ├── header.liquid
│   ├── footer.liquid
│   ├── jb-hero.liquid
│   ├── jb-video.liquid
│   ├── jb-reassurance.liquid
│   ├── jb-product-grid.liquid
│   ├── jb-verified.liquid
│   ├── jb-faq.liquid
│   ├── jb-contact.liquid
│   └── jb-footer-signup.liquid
├── snippets/               ← partials reutilizables
│   ├── product-card.liquid
│   └── badge-sale.liquid
├── templates/              ← qué se renderiza por URL
│   ├── index.json          ← homepage (compone secciones)
│   ├── product.json
│   ├── cart.json
│   ├── collection.json
│   ├── page.json
│   └── 404.liquid
├── assets/
│   ├── jb-theme.css
│   └── jb-theme.js
└── locales/
    └── es.default.json
```

## Cómo instalarlo

### 1. Pre-requisitos

- Cuenta de Shopify (cualquier plan, incluso el de $1/mes inicial sirve para dev)
- Node.js 18+
- Shopify CLI:
  ```bash
  npm install -g @shopify/cli @shopify/theme
  ```

### 2. Conectar el tema a tu tienda

Desde esta carpeta:

```bash
cd "Funnels/leads-store"

# Conectar con tu tienda (te abre browser para auth)
shopify theme dev --store=tu-tienda.myshopify.com
```

Esto levanta el tema en modo development con hot reload en `http://127.0.0.1:9292`. Cambios en `.liquid` o `.css` se reflejan al instante.

### 3. Subir el tema a producción

Cuando esté listo:

```bash
# Sube como tema NO publicado (queda en "Themes" del admin sin reemplazar el activo)
shopify theme push --store=tu-tienda.myshopify.com --unpublished

# O sube + publica directo
shopify theme push --store=tu-tienda.myshopify.com --live
```

### 4. Crear los productos en Shopify Admin

El tema espera que existan 3 productos en una collection llamada `leads` (o `frontpage`). Crear desde el admin:

| Producto | Variantes | Precio |
|---|---|---|
| Paquete de 10 Leads | `10` | $300 USD |
| Paquete de 25 Leads | `25` | $650 USD |
| Paquete de 50 Leads | `50` | $1,000 USD |

O alternativamente un solo producto "Paquete de Leads" con 3 variantes 10/25/50 — el theme soporta ambos modelos.

### 5. Editar copy / colores / imágenes sin tocar código

Una vez subido:

1. Shopify admin → **Online Store** → **Themes** → encontrá "Tienda de Leads" → **Customize**
2. En el customizer puedes:
   - Cambiar logo (header)
   - Editar headline / subtitle de cada section
   - Cambiar el video URL
   - Editar las 10 FAQs
   - Cambiar el link de WhatsApp del footer
   - Reordenar secciones drag-and-drop

Las paletas de color y fuentes viven en `config/settings_schema.json` y también son editables desde admin (Theme settings).

## Customización rápida por código

- **Colores**: `assets/jb-theme.css` línea 1-20 (las CSS vars). Cambiá los `--jb-accent` y se propaga a todo.
- **Fuentes**: `layout/theme.liquid` — bloque `<style>` arriba.
- **Copy default**: cada section `.liquid` tiene un `{% schema %}` JSON al final con los textos. Esos son los defaults cuando el customizer no los sobrescribe.

## Notas técnicas

- Compatible con **Shopify Online Store 2.0** (sections en todas las páginas).
- No usa Tailwind ni framework de CSS — todo vanilla CSS con CSS vars para mantenerlo ligero (~12KB total CSS).
- JS mínimo: solo accordion de FAQ + lazy load de video. Cero dependencias.
- Performance: Lighthouse score esperado 95+ en mobile.

## Roadmap (no incluido en esta v1)

- Sección de testimonios (Chief la pidió remover por ahora — el código está disponible si la quieres agregar después, cópialo de xclusive o pídemelo).
- Sub-paquetes por nicho (IUL, Final Expense, Mortgage Protection) si quieres segmentar.
- Integración con GoHighLevel / Make.com para enviar leads vía webhook al CRM del comprador.
- Página separada de "Cómo funciona" si el FAQ no alcanza.
