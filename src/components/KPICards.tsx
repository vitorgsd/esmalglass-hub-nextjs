"use client"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TrendingUp, Target, Users, CheckCircle } from "lucide-react";

const kpiData = [
  {
    title: "Projetos Ativos",
    value: "24",
    change: "+12%",
    changeType: "positive",
    icon: CheckCircle
  },
  {
    title: "Novas Oportunidades",
    value: "8",
    change: "+25%",
    changeType: "positive",
    icon: Target
  },
  {
    title: "Clientes Atendidos",
    value: "156",
    change: "+8%",
    changeType: "positive",
    icon: Users
  },
  {
    title: "Performance Mensal",
    value: "92%",
    change: "+5%",
    changeType: "positive",
    icon: TrendingUp
  }
];

export function KPICards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {kpiData.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <Card key={kpi.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {kpi.title}
              </CardTitle>
              <Icon className="w-4 h-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
              <p className="text-xs text-green-600 font-medium mt-1">
                {kpi.change} desde o mês passado
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}