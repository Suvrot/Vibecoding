import { MentorChat } from "@/components/mentor/chat";

export const metadata = {
  title: "ИИ-наставник — VibeCode",
  description: "Чат с ИИ-наставником по Vibe Coding.",
};

export default function MentorPage() {
  return (
    <div className="container mx-auto px-4 lg:px-6 py-12 max-w-3xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold">ИИ-наставник</h1>
        <p className="mt-2 text-muted-foreground">
          Задай любой вопрос по коду, инструментам и заработку
        </p>
      </div>
      <MentorChat />
    </div>
  );
}
