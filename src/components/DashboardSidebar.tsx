import { 
  FolderKanban, 
  Home,
  Users, 
  BarChart3, 
  Briefcase, 
  Settings 
} from "lucide-react";
import { Button } from "./ui/button";

const navigationItems = [
  {
    title: "Página Inicial",
    icon: Home,
    active: true
  },
  {
    title: "Gestão de Projetos",
    icon: FolderKanban,
    active: false
  },
  {
    title: "CRM - Clientes",
    icon: Users,
    active: false
  },
  {
    title: "Análises & Oportunidades",
    icon: BarChart3,
    active: false
  },
  {
    title: "Serviços",
    icon: Briefcase,
    active: false
  },
  {
    title: "Gestão de Tecnologias",
    icon: Settings,
    active: false
  }
];

export function DashboardSidebar() {
  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 p-4">
      <nav className="space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.title}
              variant={item.active ? "default" : "ghost"}
              className={`w-full justify-start gap-3 h-12 ${
                item.active 
                  ? "bg-primary text-primary-foreground" 
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.title}
            </Button>
          );
        })}
      </nav>
    </aside>
  );
}