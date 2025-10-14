import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";

export function Hero() {
  return (
    <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-center text-white px-6 overflow-hidden">
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Animated Background - Marquee */}
      <div className="absolute inset-0 w-[200%] h-full flex animate-marquee">
        <img
          src="https://i.imgur.com/rS2yP6g.jpeg"
          className="w-1/2 h-full object-cover"
          alt="Delicious Poke Bowl"
        />
        <img
          src="https://i.imgur.com/rS2yP6g.jpeg"
          className="w-1/2 h-full object-cover"
          alt="Delicious Poke Bowl"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-4xl mx-auto">
        {/* Award Badge */}
        <div
          className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md rounded-full px-6 py-3 mb-6 shadow-xl animate-fade-in"
          data-testid="badge-award"
        >
          <Trophy className="w-6 h-6 text-gold" />
          <span className="font-poppins font-semibold text-ocean">
            Deutschlands Beste Poke Bowl 2024
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-poppins text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in"
          style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.7)" }}
          data-testid="text-hero-title"
        >
          Dein Kurzurlaub in der Schüssel.
        </h1>

        {/* Subheading */}
        <p
          className="font-lato text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto mb-8 animate-fade-in"
          style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.7)", animationDelay: "0.1s" }}
          data-testid="text-hero-subtitle"
        >
          Frische, Geschmack und Hawaii-Feeling direkt in Hamburg. Gönn dir das Beste.
        </p>

        {/* CTA Button */}
        <Link href="/menu">
          <Button
            size="lg"
            className="bg-sunset hover:bg-sunset-dark text-white font-poppins font-bold rounded-full px-10 py-6 text-lg tracking-wide uppercase shadow-2xl hover:shadow-sunset/50 transition-all hover:-translate-y-1 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
            data-testid="button-hero-cta"
          >
            Jetzt bestellen
          </Button>
        </Link>
      </div>
    </section>
  );
}
