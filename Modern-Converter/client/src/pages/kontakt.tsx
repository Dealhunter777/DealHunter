import { Link } from "wouter";
import { ChevronRight, Mail, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function Kontakt() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Nachricht gesendet!",
      description: "Vielen Dank für Ihre Nachricht. Wir melden uns schnellstmöglich bei Ihnen.",
    });
  };

  return (
    <div className="min-h-screen">
      <div className="bg-muted/30 border-b py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors" data-testid="breadcrumb-home">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">Kontakt</span>
          </nav>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Kontakt</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Haben Sie Fragen, Anregungen oder Feedback? Wir freuen uns von Ihnen zu hören!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 flex items-start gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 flex-shrink-0">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">E-Mail</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Schreiben Sie uns eine E-Mail
                </p>
                <a 
                  href="mailto:kontakt@dealhunter.de" 
                  className="text-primary hover:underline text-sm"
                  data-testid="link-email"
                >
                  kontakt@dealhunter.de
                </a>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-start gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 flex-shrink-0">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Social Media</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Folgen Sie uns für die neuesten Deals
                </p>
                <div className="flex gap-2">
                  <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">
                    TikTok
                  </a>
                  <span className="text-muted-foreground">•</span>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">
                    Instagram
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Kontaktformular</CardTitle>
            <CardDescription>
              Füllen Sie das Formular aus und wir melden uns schnellstmöglich bei Ihnen.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    placeholder="Ihr Name" 
                    required
                    data-testid="input-contact-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-Mail</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="ihre@email.de" 
                    required
                    data-testid="input-contact-email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Betreff</Label>
                <Input 
                  id="subject" 
                  placeholder="Worum geht es?" 
                  required
                  data-testid="input-contact-subject"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Nachricht</Label>
                <Textarea 
                  id="message" 
                  placeholder="Ihre Nachricht an uns..." 
                  rows={6}
                  required
                  data-testid="input-contact-message"
                />
              </div>

              <Button type="submit" className="w-full sm:w-auto" data-testid="button-contact-submit">
                Nachricht senden
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
