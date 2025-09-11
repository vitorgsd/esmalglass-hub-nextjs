// src/components/layout/DashboardSidebar.tsx
"use client";

import { usePathname } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Link from "next/link";
import {
  Home,
  Users,
  BarChart3,
  Briefcase,
  Settings,
  FlaskConical,
  Paintbrush,
} from "lucide-react";
import { Button } from "../ui/button";

const navigationItems = [
  {
    title: "Página Inicial",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "CRM - Clientes",
    href: "/clientes",
    icon: Users,
  },
  {
    title: "Análises & Oportunidades",
    href: "/analises",
    icon: BarChart3,
  },
  {
    title: "Gestão de Tecnologias",
    href: "/tecnologias",
    icon: Settings,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 p-4">
      <nav className="flex flex-col gap-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link href={item.href} key={item.title} passHref>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start gap-3 h-12 ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.title}
              </Button>
            </Link>
          );
        })}

        {/* Lógica para o submenu "Serviços" */}
        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <Briefcase className="w-5 h-5" />
              Serviços
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pl-6 pt-1 flex flex-col gap-1">
            <Link href="/servicos/laboratorio" passHref>
              <Button
                variant="ghost"
                className={`w-full justify-start gap-3 h-10 pl-5 ${
                  pathname === "/servicos/laboratorio"
                    ? "bg-primary text-primary-foreground" // Alterado para o estilo primário (azul)
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <FlaskConical className="w-4 h-4" />
                Ordens de Serviço
              </Button>
            </Link>
            <Link href="/servicos/projetos" passHref>
              <Button
                variant="ghost"
                className={`w-full justify-start gap-3 h-10 pl-5 ${
                  pathname === "/servicos/projetos"
                    ? "bg-primary text-primary-foreground" // Alterado para o estilo primário (azul)
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Paintbrush className="w-4 h-4" />
                Projetos e Produção
              </Button>
            </Link>
          </CollapsibleContent>
        </Collapsible>
      </nav>
    </aside>
  );
}
