import { Link } from "wouter";
import { ChevronRight, Flame, Clock, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/product-card";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "@shared/schema";

export default function Deals() {
  const { data: dealsOfDay = [], isLoading: dealsLoading } = useQuery<Product[]>({
    queryKey: ['/api/products/deals'],
  });

  const { data: featuredProducts = [], isLoading: featuredLoading } = useQuery<Product[]>({
    queryKey: ['/api/products/featured'],
  });

  const isLoading = dealsLoading || featuredLoading;

  return (
    <div className="min-h-screen">
      <div className="bg-muted/30 border-b py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors" data-testid="breadcrumb-home">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">Deals des Tages</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-destructive/10">
            <Flame className="h-6 w-6 text-destructive" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-3xl sm:text-4xl font-bold">Deals des Tages</h1>
              <Badge variant="destructive" className="animate-pulse">
                <Clock className="h-3 w-3 mr-1" />
                Live
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1">
              Die besten Angebote – nur für kurze Zeit!
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            {dealsOfDay.length > 0 && (
              <section className="mb-16">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-destructive" />
                  Zeitlich begrenzte Angebote
                </h2>
                <div className="space-y-6">
                  {dealsOfDay.map((product) => (
                    <ProductCard key={product.id} product={product} featured />
                  ))}
                </div>
              </section>
            )}

            {featuredProducts.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold mb-6">Weitere Top-Deals</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {featuredProducts
                    .filter(p => !p.isDealOfDay)
                    .map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}
