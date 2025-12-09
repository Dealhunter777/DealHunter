import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Search, Zap, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { useQuery } from "@tanstack/react-query";
import type { Category } from "@shared/schema";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const { data: categories = [], isLoading } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2" data-testid="link-home">
            <div className="flex items-center justify-center w-9 h-9 rounded-md bg-primary">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight hidden sm:inline-block">
              DealHunter
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            <Link href="/">
              <Button 
                variant={location === "/" ? "secondary" : "ghost"} 
                size="sm"
                data-testid="nav-home"
              >
                Home
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" data-testid="nav-categories-dropdown">
                  Kategorien
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {isLoading ? (
                  <div className="flex items-center justify-center py-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                ) : (
                  categories.map((category) => (
                    <DropdownMenuItem key={category.id} asChild>
                      <Link 
                        href={`/kategorie/${category.slug}`}
                        className="w-full cursor-pointer"
                        data-testid={`nav-category-${category.slug}`}
                      >
                        {category.name}
                      </Link>
                    </DropdownMenuItem>
                  ))
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/deals">
              <Button 
                variant={location === "/deals" ? "secondary" : "ghost"} 
                size="sm"
                data-testid="nav-deals"
              >
                Deals des Tages
              </Button>
            </Link>
          </nav>

          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Deals suchen..."
                className="pl-9 w-full"
                data-testid="input-search"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="md:hidden" data-testid="button-search-mobile">
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="button-menu-toggle"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <nav className="flex flex-col gap-2">
              <Link href="/" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start" data-testid="mobile-nav-home">
                  Home
                </Button>
              </Link>
              <Link href="/deals" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start" data-testid="mobile-nav-deals">
                  Deals des Tages
                </Button>
              </Link>
              <div className="py-2">
                <p className="px-4 text-sm font-medium text-muted-foreground mb-2">Kategorien</p>
                {categories.map((category) => (
                  <Link 
                    key={category.id} 
                    href={`/kategorie/${category.slug}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start pl-8"
                      data-testid={`mobile-nav-category-${category.slug}`}
                    >
                      {category.name}
                    </Button>
                  </Link>
                ))}
              </div>
              <Link href="/impressum" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start" data-testid="mobile-nav-impressum">
                  Impressum
                </Button>
              </Link>
              <Link href="/datenschutz" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start" data-testid="mobile-nav-datenschutz">
                  Datenschutz
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
