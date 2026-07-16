import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { AntiAudience } from "@/components/home/anti-audience";
import { Program } from "@/components/home/program";
import { RoadmapPreview } from "@/components/home/roadmap-preview";
import { Features } from "@/components/home/features";
import { Pricing } from "@/components/home/pricing";
import { Faq } from "@/components/home/faq";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AntiAudience />
      <Program />
      <RoadmapPreview />
      <Features />
      <Pricing />
      <Faq />

      <section className="border-t border-white/[0.06]">
        <div className="container mx-auto px-4 lg:px-6 section-padding text-center">
          <h2 className="display-1 mx-auto max-w-3xl">
            Готов начать свой путь?
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg text-muted-foreground">
            Первый урок займёт 8 минут. Через месяц у тебя будет проект и
            понимание, как заработать.
          </p>
          <Link href="/learn" className="mt-8 inline-block">
            <Button variant="gradient" size="lg">
              К первому уроку <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
