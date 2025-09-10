"use client"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Clock, AlertTriangle, Calendar } from "lucide-react";

const projectsData = [
  {
    id: 1,
    name: "Projeto Geométrico",
    client: "Damme",
    deadline: "2024-09-15",
    daysLeft: 7,
    progress: 85,
    priority: "high"
  },
  {
    id: 2,
    name: "Relevo Ondulado",
    client: "Formigrês",
    deadline: "2024-09-18",
    daysLeft: 10,
    progress: 70,
    priority: "medium"
  },
  {
    id: 3,
    name: "Desenvolvimento de Frita Especial",
    client: "Helena",
    deadline: "2024-09-12",
    daysLeft: 4,
    progress: 92,
    priority: "high"
  },
  {
    id: 4,
    name: "Teste de Resistência Térmica",
    client: "Majopar",
    deadline: "2024-09-20",
    daysLeft: 12,
    progress: 60,
    priority: "low"
  },
  {
    id: 5,
    name: "Formulação de Esmalte Mate",
    client: "Formigrês",
    deadline: "2024-09-16",
    daysLeft: 8,
    progress: 78,
    priority: "medium"
  },
  {
    id: 6,
    name: "Desenvolvimento Coleção 2026 - Fábrica",
    client: "Damme",
    deadline: "2024-09-14",
    daysLeft: 6,
    progress: 90,
    priority: "high"
  },
  {
    id: 7,
    name: "Escanear Mármore",
    client: "Formigrês",
    deadline: "2024-09-22",
    daysLeft: 14,
    progress: 45,
    priority: "low"
  },
  {
    id: 8,
    name: "Criação Madeira Deepink",
    client: "Damme",
    deadline: "2024-09-17",
    daysLeft: 9,
    progress: 65,
    priority: "medium"
  },
  {
    id: 9,
    name: "Desenvolvimento Interno - Navarro",
    client: "Formigrês",
    deadline: "2024-09-13",
    daysLeft: 5,
    progress: 88,
    priority: "high"
  },
  {
    id: 10,
    name: "Criação de Apresentação PDF",
    client: "Via Rosa",
    deadline: "2024-09-19",
    daysLeft: 11,
    progress: 55,
    priority: "medium"
  }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high": return "bg-red-100 text-red-800";
    case "medium": return "bg-yellow-100 text-yellow-800";
    case "low": return "bg-green-100 text-green-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const getPriorityLabel = (priority: string) => {
  switch (priority) {
    case "high": return "Alta";
    case "medium": return "Média";
    case "low": return "Baixa";
    default: return "Normal";
  }
};

const getUrgencyIcon = (daysLeft: number) => {
  if (daysLeft <= 5) return <AlertTriangle className="w-4 h-4 text-red-500" />;
  if (daysLeft <= 10) return <Clock className="w-4 h-4 text-yellow-500" />;
  return <Calendar className="w-4 h-4 text-green-500" />;
};

export function ProjectsToDeliver() {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Projetos para Entregar
        </CardTitle>
        <p className="text-sm text-gray-600">
          Acompanhe os projetos próximos do prazo de entrega
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projectsData.map((project) => (
            <div key={project.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getUrgencyIcon(project.daysLeft)}
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{project.name}</h4>
                      <p className="text-sm text-gray-600">{project.client}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className={getPriorityColor(project.priority)}>
                      {getPriorityLabel(project.priority)}
                    </Badge>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {project.daysLeft} dias restantes
                      </p>
                      <p className="text-xs text-gray-500">
                        Entrega: {new Date(project.deadline).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={project.progress} className="flex-1 h-2" />
                  <span className="text-sm font-medium text-gray-600 min-w-[3rem]">
                    {project.progress}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}