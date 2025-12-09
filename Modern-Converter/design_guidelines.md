# Design Guidelines: Affiliate Deal Website

## Design Approach
**Reference-Based E-commerce/Deal Site** - Drawing inspiration from modern deal platforms (Honey, Amazon deals) and Shopify stores, optimized for conversion and mobile-first browsing. The design prioritizes product visibility, clear pricing hierarchy, and trust-building elements.

## Core Design Principles
1. **Conversion-First**: Every element guides toward the "Zum Angebot" CTA
2. **Visual Hierarchy**: Price savings and discounts demand immediate attention
3. **Trust & Urgency**: Scarcity indicators and social proof drive action
4. **Mobile-Optimized**: 70%+ traffic expected from mobile devices

## Typography System

**Font Families** (Google Fonts via CDN):
- **Primary**: Inter (headings, UI elements) - weights: 400, 600, 700, 800
- **Secondary**: System font stack for body text (optimal performance)

**Type Scale**:
- Hero Headline: 4xl-6xl (mobile: 3xl-4xl), weight: 800
- Section Headers: 3xl-4xl (mobile: 2xl-3xl), weight: 700
- Product Titles: xl-2xl, weight: 600
- Prices/Discounts: 2xl-3xl, weight: 700
- Body Text: base-lg, weight: 400
- Badges/Labels: sm-base, weight: 600, uppercase tracking-wide

## Layout System

**Spacing Primitives**: Tailwind units of 2, 4, 8, 12, 16, 20, 24 (e.g., p-4, gap-8, mb-12)

**Grid Structure**:
- Container: max-w-7xl with px-4 sm:px-6 lg:px-8
- Product Cards: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4, gap-6
- Deal-of-Day Featured: grid-cols-1 lg:grid-cols-2, gap-8
- Category Sections: Full-width containers with generous py-20 (mobile: py-12)

**Responsive Breakpoints**:
- Mobile-first approach
- sm: 640px (2 columns for products)
- lg: 1024px (3-4 columns, side-by-side layouts)
- xl: 1280px (maximum 4 columns for products)

## Component Library

### Navigation
- Sticky header with logo, category dropdowns, search bar
- Mobile: Hamburger menu with full-screen overlay
- Secondary nav: Category pills/chips, horizontally scrollable on mobile
- Icons: Heroicons (shopping-bag, magnifying-glass, bars-3)

### Hero Section (Homepage)
- Full-width hero image showcasing trending products/deals collage
- Centered content overlay with blurred background for text/CTA
- Headline emphasizing savings ("Die besten Deals - Bis zu 70% sparen")
- Primary CTA button: Large, prominent "Jetzt Deals entdecken"
- Trust indicators below CTA: "10.000+ zufriedene Schnäppchenjäger" with checkmark icons

### Product Cards (Standard)
- Card container: Rounded corners (rounded-xl), shadow on hover
- Product image: Aspect ratio 4:3, object-cover, full-width
- Discount badge: Positioned absolute top-right, bright accent treatment (-40%, -60%)
- Content padding: p-4 to p-6
- Product title: 2 lines max, truncate with ellipsis
- Price display: Original price (line-through, muted) + Sale price (large, prominent)
- Savings indicator: "Du sparst €X (Y%)" - emphasized
- CTA button: Full-width "Zum Angebot →" with arrow icon

### Deal-of-Day Featured Cards
- Larger cards with horizontal layout on desktop (image left, content right)
- Countdown timer component: Days/Hours/Minutes/Seconds in grid format
- "Top Deal Heute" badge prominently displayed
- Additional urgency: "Nur noch X verfügbar" with icon
- Enhanced product details: Bullet points for key features

### Category Sections
- Category header with icon + title
- "Alle anzeigen →" link aligned right
- 4-column grid on desktop, responsive down to 1 column
- Each category shows 8-12 products initially

### Product Detail Page
- Breadcrumb navigation at top
- Large product image gallery (main image + thumbnails)
- Right sidebar (desktop) / stacked (mobile) with:
  - Product title (prominent)
  - Star rating + review count (placeholder)
  - Price comparison block (original vs. sale)
  - Savings highlight box
  - Large "Zum Angebot" CTA
  - Trust badges: "Sichere Weiterleitung" + Partner logos
- Product description with rich formatting
- Feature list with checkmark icons
- "Weitere Deals in dieser Kategorie" carousel at bottom

### Trust & Conversion Elements
- Scarcity badges: "Nur noch 3 auf Lager", "Letzte Chance"
- Urgency countdown: Animated timer for time-limited deals
- Social proof: "847 Personen haben dieses Angebot angesehen"
- Trust seals: "Geprüfte Affiliate-Partner" with shield icon
- Benefit icons: Kostenloser Versand, 30 Tage Rückgabe, etc.

### Footer
- Newsletter signup: Email input + CTA ("Spare 10% extra!")
- Quick links: Categories, Legal pages, Kontakt
- Affiliate disclaimer: Prominent, clear disclosure
- Social media icons (TikTok, Instagram emphasized)
- Partner program logos (Amazon, eBay, etc.)

### Legal Pages
- Clean, readable typography (max-w-3xl prose)
- Table of contents for long pages
- Highlighted sections for key information
- Back-to-top button on scroll

## Icons
**Library**: Heroicons via CDN
**Common Icons**: 
- shopping-bag, tag, clock, fire (trending), bolt (flash sales)
- star (ratings), check-circle (features), shield-check (trust)
- chevron-right (navigation), magnifying-glass (search)

## Images

**Hero Section**:
- Full-width hero image: Vibrant collage of trending products with deals/discounts visible
- Aspect ratio: 21:9 for desktop, 16:9 for mobile
- Overlay: Gradient with blur effect for text readability

**Product Images**:
- High-quality product photos with white/clean backgrounds
- Consistent aspect ratio: 4:3 for grid cards
- Lazy loading for performance

**Category Banners**:
- Lifestyle imagery representing each category
- Subtle overlay for text legibility

**Trust Elements**:
- Partner program logos (Amazon, eBay, etc.)
- Payment/security badges as needed

## Accessibility
- ARIA labels for all interactive elements
- Focus states clearly visible on all clickable items
- Sufficient color contrast for price/discount elements
- Semantic HTML hierarchy (h1 → h2 → h3)
- Alt text for all product images describing the product

## Mobile-Specific Optimizations
- Touch-friendly tap targets (minimum 44px height)
- Sticky "Zum Angebot" button at bottom on product detail pages
- Swipeable product image galleries
- Collapsible filter sections for category pages
- Bottom navigation bar for key actions

## Performance Considerations
- Lazy load product images below fold
- Use placeholder skeletons while loading
- Optimize countdown timer updates
- Defer non-critical scripts