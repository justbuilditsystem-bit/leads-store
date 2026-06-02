# Brief — Tienda de Leads (Shopify Theme)

**Cliente / dueño:** Chief (Angel Joubert)
**Marca:** Tienda de Leads Just Build It
**Dominio actual:** leads.justbuilditnow.com

## Origen del brief

- **Estructura/arquitectura del site:** copiada del competidor [xclusiveagentleads.com](https://xclusiveagentleads.com/) — 8 secciones de homepage (hero · video pre-venta · reassurance · grid productos · página verificada upsell · FAQ · contacto · footer signup). Testimonios REMOVIDOS por decisión de Chief.
- **Branding (logo, colores, tipografía, pricing, tagline):** de la tienda actual de Chief en `leads.justbuilditnow.com`.

## Paleta + tipografía + voz

| Token | Valor |
|---|---|
| `--jb-bg` | `#FFFFFF` |
| `--jb-bg-soft` | `#FAFAFA` |
| `--jb-text` | `#1A1A1A` |
| `--jb-text-muted` | `#666666` |
| `--jb-accent` | `#00A86B` (teal/turquesa — botones y links) |
| `--jb-accent-hover` | `#008556` |
| `--jb-badge-sale` | `#F27830` (sale badges) |
| `--jb-star` | `#FFD700` (estrellas amarillas si se reusan en algún rating futuro) |
| `--jb-border` | `#E5E5E5` |
| Tipografía body | system-ui sans-serif |
| Tipografía display | system-ui (peso 700 para H1/H2, 600 para H3) |
| Tagline | "Conecta Con Prospectos Listos Para Actuar" |

## Pricing inicial (mismo que la tienda actual)

| Producto | Variante | Precio |
|---|---|---|
| Paquete de Leads | 10 leads | $300 USD |
| Paquete de Leads | 25 leads | $650 USD |
| Paquete de Leads | 50 leads | $1,000 USD |

Editable desde el admin de Shopify sin tocar código.

## Voz del copy

- Español neutro USA — forma "tú" (NO "vosotros" de España, NO "vos" rioplatense). Conjugaciones estándar: puedes, tienes, quieres, necesitas, sabes, recibes, eliges.
- Anti-genérico. Cero palabras tipo "potenciar / innovador / soluciones / absolutamente".
- Concreto, números cuando ayude, sin promesas vacías.
- Hablamos a un agente hispano de seguros 28-45 años que ya intentó cold calling y quiere leads ya calificados.

## Pendientes para Chief después de instalar

1. Subir logo definitivo (ahora referencia el CDN de la tienda actual; cambiarlo en el admin si migra a otra tienda).
2. Revisar copy de FAQs y editar lo que no le suene.
3. Configurar checkout / dominio / payment gateway desde Shopify admin.
4. Crear los productos en Shopify admin con sus variantes y precios (paths sugeridos en README.md).
