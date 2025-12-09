import { Link } from "wouter";
import { ChevronRight, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function Datenschutz() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
            <span className="text-foreground font-medium">Datenschutzerklärung</span>
          </nav>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8">Datenschutzerklärung</h1>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">1. Datenschutz auf einen Blick</h2>
            
            <h3 className="text-lg font-medium mb-2">Allgemeine Hinweise</h3>
            <p className="text-muted-foreground mb-4">
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            </p>

            <h3 className="text-lg font-medium mb-2">Datenerfassung auf dieser Website</h3>
            <p className="text-muted-foreground mb-4">
              <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">2. Hosting</h2>
            <p className="text-muted-foreground">
              Wir hosten die Inhalte unserer Website bei folgendem Anbieter. Die Server des Hosters befinden sich in der EU. Personenbezogene Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">3. Allgemeine Hinweise und Pflichtinformationen</h2>
            
            <h3 className="text-lg font-medium mb-2">Datenschutz</h3>
            <p className="text-muted-foreground mb-4">
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            </p>

            <h3 className="text-lg font-medium mb-2">Hinweis zur verantwortlichen Stelle</h3>
            <p className="text-muted-foreground mb-4">
              Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br /><br />
              DealHunter<br />
              Musterstraße 123<br />
              12345 Musterstadt<br />
              E-Mail: kontakt@dealhunter.de
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">4. Datenerfassung auf dieser Website</h2>
            
            <h3 className="text-lg font-medium mb-2">Cookies</h3>
            <p className="text-muted-foreground mb-4">
              Unsere Internetseiten verwenden so genannte „Cookies". Cookies sind kleine Datenpakete und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert.
            </p>

            <h3 className="text-lg font-medium mb-2">Server-Log-Dateien</h3>
            <p className="text-muted-foreground mb-4">
              Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li>Browsertyp und Browserversion</li>
              <li>verwendetes Betriebssystem</li>
              <li>Referrer URL</li>
              <li>Hostname des zugreifenden Rechners</li>
              <li>Uhrzeit der Serveranfrage</li>
              <li>IP-Adresse</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">5. Affiliate-Programme</h2>
            <div className="p-4 bg-muted/50 rounded-md mb-4">
              <p className="text-muted-foreground">
                <strong>Hinweis:</strong> Diese Website ist Teilnehmer verschiedener Partnerprogramme. Wir verwenden Affiliate-Links, um auf Produkte bei unseren Partnern zu verweisen.
              </p>
            </div>

            <h3 className="text-lg font-medium mb-2">Amazon PartnerNet</h3>
            <p className="text-muted-foreground mb-4">
              Als Teilnehmer des Amazon PartnerNet setzen wir auf unseren Seiten Amazon-Werbeanzeigen und Links zu Amazon.de ein, an denen wir über Werbekostenerstattung Geld verdienen können.
            </p>

            <h3 className="text-lg font-medium mb-2">Weitere Partnerprogramme</h3>
            <p className="text-muted-foreground">
              Zusätzlich nehmen wir an weiteren Partnerprogrammen teil (z.B. eBay Partner Network, Digistore24, Awin, AliExpress Affiliate). Bei Klick auf entsprechende Links können Cookies gesetzt werden, die eine Zuordnung Ihres Kaufs zu unserer Website ermöglichen.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">6. Ihre Rechte</h2>
            <p className="text-muted-foreground mb-4">
              Sie haben jederzeit das Recht:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground">
              <li>Auskunft über Ihre gespeicherten personenbezogenen Daten zu erhalten</li>
              <li>Berichtigung unrichtiger personenbezogener Daten zu verlangen</li>
              <li>Löschung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen</li>
              <li>Einschränkung der Datenverarbeitung zu verlangen</li>
              <li>Der Verarbeitung zu widersprechen</li>
              <li>Datenübertragbarkeit zu verlangen</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">7. Aktualität und Änderung dieser Datenschutzerklärung</h2>
            <p className="text-muted-foreground">
              Diese Datenschutzerklärung ist aktuell gültig und hat den Stand Dezember 2024. Durch die Weiterentwicklung unserer Website und Angebote oder aufgrund geänderter gesetzlicher beziehungsweise behördlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung zu ändern.
            </p>
          </section>
        </div>
      </div>

      {showScrollTop && (
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-6 right-6 z-50"
          onClick={scrollToTop}
          data-testid="button-scroll-top"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
}
