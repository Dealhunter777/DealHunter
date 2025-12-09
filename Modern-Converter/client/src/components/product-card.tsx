import { Link } from "wouter";
import { ExternalLink, Eye, Clock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CountdownTimer } from "@/components/countdown-timer";
import { formatPrice, calculateSavings } from "@/lib/products-data";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export function ProductCard({ product, featured = false }: ProductCardProps) {
  const savings = calculateSavings(product.originalPrice, product.salePrice);

  if (featured) {
    return (
      <Card className="overflow-visible group" data-testid={`card-product-featured-${product.id}`}>
        <CardContent className="p-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="relative aspect-square lg:aspect-auto overflow-hidden rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              {product.badge && (
                <Badge 
                  className="absolute top-4 left-4 bg-primary text-primary-foreground"
                  data-testid={`badge-product-${product.id}`}
                >
                  {product.badge}
                </Badge>
              )}
              <Badge 
                variant="destructive" 
                className="absolute top-4 right-4"
              >
                -{product.discountPercent}%
              </Badge>
            </div>

            <div className="p-6 flex flex-col">
              <div className="flex items-start justify-between gap-2 mb-2">
                <Badge variant="outline" className="text-xs">
                  {product.partner}
                </Badge>
                {product.viewCount && product.viewCount > 1000 && (
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Eye className="h-3 w-3" />
                    {product.viewCount.toLocaleString()}
                  </span>
                )}
              </div>

              <Link href={`/produkt/${product.id}`}>
                <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors line-clamp-2">
                  {product.title}
                </h3>
              </Link>

              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                {product.shortDescription || product.description}
              </p>

              {product.features && product.features.length > 0 && (
                <ul className="space-y-1 mb-4">
                  {product.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              )}

              {product.dealEndsAt && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-destructive" />
                    <span className="text-sm font-medium text-destructive">Endet in:</span>
                  </div>
                  <CountdownTimer endTime={product.dealEndsAt} />
                </div>
              )}

              <div className="mt-auto space-y-4">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-3xl font-bold text-primary">
                    {formatPrice(product.salePrice)}
                  </span>
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                </div>

                <div className="flex items-center gap-2 p-2 bg-primary/10 rounded-md">
                  <span className="text-sm font-medium text-primary">
                    Du sparst {formatPrice(savings)} ({product.discountPercent}%)
                  </span>
                </div>

                {product.stock && product.stock < 10 && (
                  <div className="flex items-center gap-2 text-sm text-destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Nur noch {product.stock} auf Lager!</span>
                  </div>
                )}

                <a 
                  href={product.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full" size="lg" data-testid={`button-deal-${product.id}`}>
                    Zum Angebot
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-visible group hover-elevate" data-testid={`card-product-${product.id}`}>
      <CardContent className="p-0">
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-xl">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          {product.badge && (
            <Badge 
              className="absolute top-3 left-3 bg-primary text-primary-foreground"
              data-testid={`badge-product-${product.id}`}
            >
              {product.badge}
            </Badge>
          )}
          <Badge 
            variant="destructive" 
            className="absolute top-3 right-3"
          >
            -{product.discountPercent}%
          </Badge>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between gap-2 mb-2">
            <Badge variant="outline" className="text-xs">
              {product.partner}
            </Badge>
            {product.stock && product.stock < 10 && (
              <span className="text-xs text-destructive font-medium">
                Nur noch {product.stock}!
              </span>
            )}
          </div>

          <Link href={`/produkt/${product.id}`}>
            <h3 className="font-semibold mb-2 hover:text-primary transition-colors line-clamp-2 min-h-[2.5rem]">
              {product.title}
            </h3>
          </Link>

          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {product.shortDescription || product.description}
          </p>

          <div className="flex items-baseline gap-2 mb-3 flex-wrap">
            <span className="text-xl font-bold text-primary">
              {formatPrice(product.salePrice)}
            </span>
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          </div>

          <div className="text-xs text-primary font-medium mb-4">
            Du sparst {formatPrice(savings)}
          </div>

          <a 
            href={product.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button className="w-full" data-testid={`button-deal-${product.id}`}>
              Zum Angebot
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
