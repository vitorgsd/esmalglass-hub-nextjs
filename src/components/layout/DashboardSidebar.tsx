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
  ChevronDown,
} from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

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
  const [isServicesOpen, setIsServicesOpen] = useState(
    pathname.startsWith("/servicos")
  );

  // Verificar se algum item do submenu está ativo
  const isServicesActive = pathname.startsWith("/servicos");

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
                className={`w-full justify-start gap-3 h-12 text-sm ${
                  isActive
                    ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="truncate">{item.title}</span>
              </Button>
            </Link>
          );
        })}

        {/* Submenu "Serviços" */}
        <Collapsible open={isServicesOpen} onOpenChange={setIsServicesOpen}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={`w-full justify-between gap-3 h-12 text-sm ${
                isServicesActive
                  ? "bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Briefcase className="w-5 h-5 flex-shrink-0" />
                <span className="truncate">Serviços</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 flex-shrink-0 transition-transform ${
                  isServicesOpen ? "rotate-180" : ""
                }`}
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-1 flex flex-col gap-1">
            <Link href="/servicos/laboratorio" passHref>
              <Button
                variant="ghost"
                className={`w-full justify-start gap-3 h-10 text-sm ml-0 ${
                  pathname === "/servicos/laboratorio"
                    ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <FlaskConical className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">Ordens de Serviço</span>
              </Button>
            </Link>
            <Link href="/servicos/projetos" passHref>
              <Button
                variant="ghost"
                className={`w-full justify-start gap-3 h-10 text-sm ml-0 ${
                  pathname === "/servicos/projetos"
                    ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Paintbrush className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">Projetos e Produção</span>
              </Button>
            </Link>
          </CollapsibleContent>
        </Collapsible>
      </nav>
    </aside>
  );
}