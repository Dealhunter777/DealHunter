import { Link } from "wouter";
import { Zap, Mail, Shield } from "lucide-react";
import { SiTiktok, SiInstagram, SiAmazon } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import type { Category } from "@shared/schema";

export function Footer() {
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  return (
    <footer className="bg-card border-t mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2" data-testid="footer-logo">
              <div className="flex items-center justify-center w-9 h-9 rounded-md bg-primary">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">DealHunter</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Wir finden die besten Deals und Angebote für dich. Spare bis zu 70% bei Top-Produkten aus allen Kategorien.
            </p>
            <div className="flex items-center gap-2">
              <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noopener noreferrer"
                data-testid="link-tiktok"
              >
                <Button variant="ghost" size="icon">
                  <SiTiktok className="h-5 w-5" />
                </Button>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                data-testid="link-instagram"
              >
                <Button variant="ghost" size="icon">
                  <SiInstagram className="h-5 w-5" />
                </Button>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Kategorien</h3>
            <ul className="space-y-2">
              {categories.slice(0, 6).map((category) => (
                <li key={category.id}>
                  <Link 
                    href={`/kategorie/${category.slug}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`footer-category-${category.slug}`}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Rechtliches</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/impressum"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="footer-impressum"
                >
                  Impressum
                </Link>
              </li>
              <li>
                <Link 
                  href="/datenschutz"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="footer-datenschutz"
                >
                  Datenschutzerklärung
                </Link>
              </li>
              <li>
                <Link 
                  href="/kontakt"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="footer-kontakt"
                >
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Erhalte die neuesten Deals direkt in dein Postfach!
            </p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Deine E-Mail" 
                className="flex-1"
                data-testid="input-newsletter-email"
              />
              <Button data-testid="button-newsletter-subscribe">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>Geprüfte Affiliate-Partner</span>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-4 text-muted-foreground">
              <span className="text-xs flex items-center gap-1">
                <SiAmazon className="h-4 w-4" /> Amazon Partner
              </span>
              <span className="text-xs">eBay Partner</span>
              <span className="text-xs">Digistore24</span>
              <span className="text-xs">Awin</span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-muted/50 rounded-md">
            <p className="text-xs text-muted-foreground text-center">
              <strong>Affiliate-Hinweis:</strong> Als Teilnehmer an verschiedenen Partnerprogrammen (Amazon PartnerNet, eBay Partner Network, Digistore24, Awin u.a.) verdienen wir an qualifizierten Verkäufen. Für dich entstehen dabei keine zusätzlichen Kosten. Die Preise können sich seit der Veröffentlichung geändert haben.
            </p>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            © {new Date().getFullYear()} DealHunter. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}
