import { useParams, Link } from "wouter";
import { ArrowLeft, ChevronRight, SlidersHorizontal, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/product-card";
import { useQuery } from "@tanstack/react-query";
import type { Product, Category } from "@shared/schema";

export default function CategoryPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug || "";

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  const { data: category, isLoading: categoryLoading } = useQuery<Category>({
    queryKey: ['/api/categories', slug],
    enabled: !!slug,
  });

  const { data: products = [], isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ['/api/categories', slug, 'products'],
    enabled: !!slug,
  });

  const isLoading = categoryLoading || productsLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Kategorie nicht gefunden</h1>
        <p className="text-muted-foreground mb-6">
          Die gesuchte Kategorie existiert leider nicht.
        </p>
        <Link href="/">
          <Button data-testid="button-back-home">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zurück zur Startseite
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="bg-muted/30 border-b py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors" data-testid="breadcrumb-home">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/" className="hover:text-foreground transition-colors" data-testid="breadcrumb-categories">
              Kategorien
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">{category.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">{category.name}</h1>
            <p className="text-muted-foreground">{category.description}</p>
            <div className="mt-3">
              <Badge variant="secondary">
                {products.length} Produkte gefunden
              </Badge>
            </div>
          </div>
          <Button variant="outline" className="hidden sm:flex" data-testid="button-filter">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/kategorie/${cat.slug}`}>
              <Badge
                variant={cat.id === category.id ? "default" : "outline"}
                className="cursor-pointer whitespace-nowrap"
                data-testid={`filter-category-${cat.slug}`}
              >
                {cat.name}
              </Badge>
            </Link>
          ))}
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">
              Keine Produkte in dieser Kategorie gefunden.
            </p>
            <Link href="/">
              <Button variant="outline">Zurück zur Startseite</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
