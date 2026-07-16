import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Политика конфиденциальности — VibeCode",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 lg:px-6 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Политика конфиденциальности</h1>

      <div className="prose prose-invert max-w-none space-y-6 text-sm text-muted-foreground leading-relaxed">
        <p>
          <strong className="text-foreground">1. Общие положения</strong>
          <br />
          Настоящая Политика конфиденциальности определяет порядок сбора,
          использования и хранения персональных данных пользователей
          образовательной платформы VibeCode (далее — «Платформа»).
        </p>

        <p>
          <strong className="text-foreground">2. Какие данные мы собираем</strong>
          <br />
          Мы собираем только те данные, которые вы предоставляете самостоятельно:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Адрес электронной почты (при регистрации)</li>
          <li>Имя пользователя (автоматически из email)</li>
          <li>Прогресс обучения (пройденные уроки, XP, проекты)</li>
        </ul>

        <p>
          <strong className="text-foreground">3. Как мы используем данные</strong>
          <br />
          Собранные данные используются исключительно для:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Предоставления доступа к платформе</li>
          <li>Сохранения вашего прогресса обучения</li>
          <li>Отправки писем с подтверждением и сбросом пароля</li>
        </ul>

        <p>
          <strong className="text-foreground">4. Хранение данных</strong>
          <br />
          Данные хранятся на серверах Supabase (Amazon Web Services). Мы не
          передаём ваши данные третьим лицам без вашего согласия.
        </p>

        <p>
          <strong className="text-foreground">5. Cookies</strong>
          <br />
          Платформа использует технические cookies для авторизации сессии. Мы
          не используем трекинговые cookies.
        </p>

        <p>
          <strong className="text-foreground">6. Безопасность</strong>
          <br />
          Мы принимаем разумные меры для защиты ваших данных, включая шифрование
          передачи данных (HTTPS) и аутентификацию через JWT-токены.
        </p>

        <p>
          <strong className="text-foreground">7. Ваши права</strong>
          <br />
          Вы имеете право запросить удаление вашего аккаунта и всех связанных
          данных, написав на{" "}
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
          <strong className="text-foreground">8. Изменения</strong>
          <br />
          Мы можем обновлять данную политику. Дата последнего обновления:{" "}
          {new Date().toLocaleDateString("ru-RU")}.
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
