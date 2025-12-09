import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-3 items-center">
            <AlertCircle className="h-8 w-8 text-destructive" />
            <h1 className="text-2xl font-bold" data-testid="text-404-title">404 - Seite nicht gefunden</h1>
          </div>

          <p className="mt-4 text-sm text-muted-foreground" data-testid="text-404-message">
            Die gesuchte Seite existiert leider nicht oder wurde verschoben.
          </p>

          <div className="flex flex-wrap gap-3 mt-6">
            <Button asChild variant="default" data-testid="button-home">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Zur Startseite
              </Link>
            </Button>
            <Button asChild variant="outline" data-testid="button-back" onClick={() => window.history.back()}>
              <span>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Zurück
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
