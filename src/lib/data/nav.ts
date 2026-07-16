import {
  Home,
  Map,
  Boxes,
  GraduationCap,
  Sparkles,
  Wallet,
  FolderGit2,
  Bot,
  Shield,
} from "lucide-react";

export const adminEmail = "supermax44676@gmail.com";

export const navLinks = [
  { href: "/", label: "Главная", icon: Home },
  { href: "/roadmap", label: "Дорожная карта", icon: Map },
  { href: "/tools", label: "Инструменты", icon: Boxes },
  { href: "/learn", label: "Уроки", icon: GraduationCap },
  { href: "/prompts", label: "Генератор промптов", icon: Sparkles },
  { href: "/money", label: "Первые деньги", icon: Wallet },
  { href: "/projects", label: "Мои проекты", icon: FolderGit2 },
  { href: "/mentor", label: "ИИ-наставник", icon: Bot },
];

export const adminLink = { href: "/admin", label: "Админ", icon: Shield };
