import Link from "next/link";

export const metadata = {
  title: "Договор оферты — VibeCode",
};

export default function OfertaPage() {
  return (
    <div className="container mx-auto px-4 lg:px-6 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Договор публичной оферты</h1>

      <div className="prose prose-invert max-w-none space-y-6 text-sm text-muted-foreground leading-relaxed">
        <p>
          <strong className="text-foreground">1. Общие положения</strong>
          <br />
          Настоящий документ является официальным предложением (публичной
          офертой) для заключения договора на оказание образовательных услуг
          по использованию платформы VibeCode.
        </p>

        <p>
          <strong className="text-foreground">2. Предмет договора</strong>
          <br />
          Платформа предоставляет пользователю доступ к образовательным
          материалам по Vibe Coding, включая уроки, генератор промптов,
          каталог инструментов и ИИ-наставника.
        </p>

        <p>
          <strong className="text-foreground">3. Условия использования</strong>
          <br />
          Платформа бесплатна. Все базовые функции доступны без оплаты.
          Пользователь несёт ответственность за сохранность своего аккаунта и
          пароля.
        </p>

        <p>
          <strong className="text-foreground">4. Права и обязанности</strong>
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Пользователь обязуется использовать платформу только в законных
            целях
          </li>
          <li>
            Запрещается копирование и распространение материалов платформы без
            согласия
          </li>
          <li>
            Платформа обязуется обеспечить доступность сервиса в рабочем режиме
          </li>
        </ul>

        <p>
          <strong className="text-foreground">5. Ограничение ответственности</strong>
          <br />
          Платформа предоставляет образовательные материалы «как есть». Мы не
          гарантируем конкретные результаты заработка после прохождения курсов.
        </p>

        <p>
          <strong className="text-foreground">6. Контакты</strong>
          <br />
          По вопросам использования платформы обращайтесь в{" "}
          <a
            href="https://t.me/slimgorur67"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:underline"
          >
            Telegram
          </a>
          .
        </p>

        <p>
          <strong className="text-foreground">7. Срок действия</strong>
          <br />
          Настоящий договор вступает в силу с момента регистрации на платформе
          и действует бессрочно. Дата публикации: {new Date().toLocaleDateString("ru-RU")}.
        </p>
      </div>

      <Link
        href="/"
        className="mt-8 inline-block text-sm text-emerald-400 hover:underline"
      >
        ← На главную
      </Link>
    </div>
  );
}
