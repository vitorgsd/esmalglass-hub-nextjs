"use client"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Bell, AlertCircle, CheckCircle, Clock, TrendingUp } from "lucide-react";

const notifications = [
  {
    id: 1,
    title: "Projeto Mármore Travertino finalizado",
    message: "Cliente aprovou a entrega final",
    time: "2 min atrás",
    type: "success",
    icon: CheckCircle
  },
  {
    id: 2,
    title: "Nova oportunidade identificada",
    message: "Máquina de efeito em Formigrês",
    time: "15 min atrás",
    type: "info",
    icon: TrendingUp
  },
  {
    id: 3,
    title: "Reunião de acompanhamento",
    message: "Projeto Esmalte Especial em 30 min",
    time: "25 min atrás",
    type: "warning",
    icon: Clock
  },
  {
    id: 4,
    title: "Coleção Formigrês 2026 Pendente",
    message: "Projeto está próximo da data de entrega",
    time: "1h atrás",
    type: "alert",
    icon: AlertCircle
  },
  {
    id: 5,
    title: "Novo cliente cadastrado",
    message: "Cerâmica Damme Porcelanatos",
    time: "2h atrás",
    type: "success",
    icon: CheckCircle
  }
];

const getTypeColor = (type: string) => {
  switch (type) {
    case "success": return "bg-green-100 text-green-800";
    case "info": return "bg-blue-100 text-blue-800";
    case "warning": return "bg-yellow-100 text-yellow-800";
    case "alert": return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const getIconColor = (type: string) => {
  switch (type) {
    case "success": return "text-green-600";
    case "info": return "text-blue-600";
    case "warning": return "text-yellow-600";
    case "alert": return "text-red-600";
    default: return "text-gray-600";
  }
};

export function NotificationsFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Alertas e Notificações Recentes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {notifications.map((notification) => {
          const Icon = notification.icon;
          return (
            <div key={notification.id} className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-shrink-0">
                <Icon className={`w-5 h-5 ${getIconColor(notification.type)}`} />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-start justify-between">
                  <h4 className="text-sm font-medium text-gray-900">
                    {notification.title}
                  </h4>
                  <Badge variant="outline" className={`text-xs ${getTypeColor(notification.type)}`}>
                    {notification.type}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{notification.message}</p>
                <p className="text-xs text-gray-500">{notification.time}</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}