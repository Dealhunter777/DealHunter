import { Shield, Clock, Heart, ThumbsUp } from "lucide-react";

export function TrustSection() {
  const benefits = [
    {
      icon: Shield,
      title: "100% Sicher",
      description: "Alle Partner sind geprüft und vertrauenswürdig",
    },
    {
      icon: Clock,
      title: "Tägliche Updates",
      description: "Jeden Tag neue Deals und Angebote",
    },
    {
      icon: ThumbsUp,
      title: "Beste Preise",
      description: "Wir finden die günstigsten Angebote für dich",
    },
    {
      icon: Heart,
      title: "Handverlesen",
      description: "Jeder Deal wird von uns persönlich geprüft",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Warum DealHunter?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Wir machen das Schnäppchenjagen einfach und sicher
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-xl bg-card border"
              data-testid={`trust-benefit-${index}`}
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
                <benefit.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
