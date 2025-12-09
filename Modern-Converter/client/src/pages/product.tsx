import { useParams, Link } from "wouter";
import { 
  ArrowLeft, 
  ChevronRight, 
  ExternalLink, 
  Shield, 
  Truck, 
  RotateCcw, 
  Check,
  Eye,
  AlertTriangle,
  Clock,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CountdownTimer } from "@/components/countdown-timer";
import { ProductCard } from "@/components/product-card";
import { formatPrice, calculateSavings } from "@/lib/products-data";
import { useQuery } from "@tanstack/react-query";
import type { Product, Category } from "@shared/schema";

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const productId = params.id || "";

  const { data: product, isLoading: productLoading } = useQuery<Product>({
    queryKey: ['/api/products', productId],
    enabled: !!productId,
  });

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  const { data: allProducts = [] } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  if (productLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Produkt nicht gefunden</h1>
        <p className="text-muted-foreground mb-6">
          Das gesuchte Produkt existiert leider nicht mehr.
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

  const category = categories.find(c => c.id === product.categoryId);
  const relatedProducts = allProducts
    .filter(p => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);
  const savings = calculateSavings(product.originalPrice, product.salePrice);

  return (
    <div className="min-h-screen">
      <div className="bg-muted/30 border-b py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors" data-testid="breadcrumb-home">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            {category && (
              <>
                <Link 
                  href={`/kategorie/${category.slug}`} 
                  className="hover:text-foreground transition-colors"
                  data-testid="breadcrumb-category"
                >
                  {category.name}
                </Link>
                <ChevronRight className="h-4 w-4" />
              </>
            )}
            <span className="text-foreground font-medium line-clamp-1">{product.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="relative aspect-square rounded-xl overflow-hidden bg-muted">
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <Badge 
                className="absolute top-4 left-4 bg-primary text-primary-foreground"
              >
                {product.badge}
              </Badge>
            )}
            <Badge 
              variant="destructive" 
              className="absolute top-4 right-4 text-base px-3 py-1"
            >
              -{product.discountPercent}%
            </Badge>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <Badge variant="outline">{product.partner}</Badge>
              {product.viewCount && product.viewCount > 1000 && (
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Eye className="h-4 w-4" />
                  {product.viewCount.toLocaleString()} Aufrufe
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold mb-4">{product.title}</h1>

            <p className="text-muted-foreground mb-6">{product.description}</p>

            {product.features && product.features.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Card className="mb-6">
              <CardContent className="p-6">
                {product.dealEndsAt && (
                  <div className="mb-4 pb-4 border-b">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="h-5 w-5 text-destructive" />
                      <span className="font-semibold text-destructive">Angebot endet in:</span>
                    </div>
                    <CountdownTimer endTime={new Date(product.dealEndsAt)} />
                  </div>
                )}

                <div className="flex items-baseline gap-4 mb-4 flex-wrap">
                  <span className="text-4xl font-bold text-primary">
                    {formatPrice(product.salePrice)}
                  </span>
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                </div>

                <div className="bg-primary/10 rounded-md p-3 mb-4">
                  <p className="text-primary font-semibold text-lg">
                    Du sparst {formatPrice(savings)} ({product.discountPercent}%)
                  </p>
                </div>

                {product.stock && product.stock < 10 && (
                  <div className="flex items-center gap-2 text-destructive mb-4">
                    <AlertTriangle className="h-5 w-5" />
                    <span className="font-medium">Nur noch {product.stock} auf Lager!</span>
                  </div>
                )}

                <a 
                  href={product.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full" size="lg" data-testid="button-main-deal">
                    Zum Angebot bei {product.partner}
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-md bg-muted/50">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Sichere Weiterleitung</p>
                  <p className="text-xs text-muted-foreground">Geprüfter Partner</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-md bg-muted/50">
                <Truck className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Schneller Versand</p>
                  <p className="text-xs text-muted-foreground">Je nach Anbieter</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-md bg-muted/50">
                <RotateCcw className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Rückgaberecht</p>
                  <p className="text-xs text-muted-foreground">Beim Anbieter</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <Separator className="mb-16" />
            <h2 className="text-2xl font-bold mb-8">Weitere Deals in dieser Kategorie</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-background border-t z-40">
        <a 
          href={product.affiliateLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <Button className="w-full" size="lg" data-testid="button-sticky-deal">
            Zum Angebot – {formatPrice(product.salePrice)}
            <ExternalLink className="ml-2 h-5 w-5" />
          </Button>
        </a>
      </div>

      <div className="lg:hidden h-20" />
    </div>
  );
}
