import type { Product, Category } from "@shared/schema";

export function formatPrice(priceInCents: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(priceInCents / 100);
}

export function calculateSavings(originalPrice: number, salePrice: number): number {
  return originalPrice - salePrice;
}

export function getCategoryBySlug(categories: Category[], slug: string): Category | undefined {
  return categories.find(c => c.slug === slug);
}

export function getProductsByCategory(products: Product[], categoryId: string): Product[] {
  return products.filter(p => p.categoryId === categoryId);
}

export function getFeaturedProducts(products: Product[]): Product[] {
  return products.filter(p => p.isFeatured);
}

export function getDealsOfDay(products: Product[]): Product[] {
  return products.filter(p => p.isDealOfDay);
}

export function getTrendingProducts(products: Product[]): Product[] {
  return products.filter(p => p.isTrending);
}

export function getProductById(products: Product[], id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export const iconMap: Record<string, string> = {
  "Laptop": "Smartphone",
  "Shirt": "Shirt",
  "Home": "Home",
  "Dumbbell": "Dumbbell",
  "Sparkles": "Sparkles",
  "Gamepad2": "Gamepad2",
  "Plane": "TrendingUp",
  "Download": "Gift",
  "Smartphone": "Smartphone",
  "TrendingUp": "TrendingUp",
  "Gift": "Gift",
};
