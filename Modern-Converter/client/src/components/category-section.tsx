import { Link } from "wouter";
import { Smartphone, Gamepad2, Home, Sparkles, Dumbbell, Shirt, TrendingUp, Gift, Loader2, Plane, Download, Laptop } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import type { Category } from "@shared/schema";

const iconComponents: Record<string, typeof Smartphone> = {
  Smartphone,
  Laptop,
  Gamepad2,
  Home,
  Sparkles,
  Dumbbell,
  Shirt,
  TrendingUp,
  Gift,
  Plane,
  Download,
};

export function CategorySection() {
  const { data: categories = [], isLoading } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">Kategorien</h2>
            <p className="text-muted-foreground mt-1">
              Finde Deals in deiner Lieblingskategorie
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((category) => {
              const Icon = iconComponents[category.icon] || Sparkles;
              return (
                <Link key={category.id} href={`/kategorie/${category.slug}`}>
                  <Card 
                    className="overflow-visible hover-elevate active-elevate-2 cursor-pointer h-full"
                    data-testid={`card-category-${category.slug}`}
                  >
                    <CardContent className="p-4 sm:p-6 text-center">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mx-auto mb-3">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold text-sm sm:text-base mb-1">
                        {category.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {category.productCount}+ Deals
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
