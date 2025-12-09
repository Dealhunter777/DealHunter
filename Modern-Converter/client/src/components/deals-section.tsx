import { Link } from "wouter";
import { ArrowRight, Flame, Clock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/product-card";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "@shared/schema";

export function DealsSection() {
  const { data: dealsOfDay = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products/deals'],
  });

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-destructive/10">
              <Flame className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-bold">Deals des Tages</h2>
                <Badge variant="destructive" className="animate-pulse">
                  <Clock className="h-3 w-3 mr-1" />
                  Heute
                </Badge>
              </div>
              <p className="text-muted-foreground mt-1">
                Nur für kurze Zeit – greif schnell zu!
              </p>
            </div>
          </div>
          <Link href="/deals">
            <Button variant="outline" data-testid="button-all-deals">
              Alle Deals
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="space-y-6">
            {dealsOfDay.slice(0, 2).map((product) => (
              <ProductCard key={product.id} product={product} featured />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
