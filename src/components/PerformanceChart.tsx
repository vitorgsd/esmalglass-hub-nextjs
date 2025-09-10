"use client";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const performanceData = [
  { month: "Jan", projetos: 18, concluidos: 15 },
  { month: "Fev", projetos: 22, concluidos: 19 },
  { month: "Mar", projetos: 25, concluidos: 22 },
  { month: "Abr", projetos: 28, concluidos: 25 },
  { month: "Mai", projetos: 24, concluidos: 22 },
  { month: "Jun", projetos: 30, concluidos: 28 },
  { month: "Jul", projetos: 32, concluidos: 29 },
  { month: "Ago", projetos: 28, concluidos: 26 },
  { month: "Set", projetos: 35, concluidos: 32 }
];

export function PerformanceChart() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Evolução Mensal de Projetos</CardTitle>
        <p className="text-sm text-gray-600">
          Comparativo entre projetos iniciados e concluídos
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
              <XAxis 
                dataKey="month" 
                className="text-gray-600"
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                className="text-gray-600"
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="projetos" 
                stroke="#1e40af" 
                strokeWidth={3}
                dot={{ fill: '#1e40af', strokeWidth: 2, r: 4 }}
                name="Projetos Iniciados"
              />
              <Line 
                type="monotone" 
                dataKey="concluidos" 
                stroke="#f97316" 
                strokeWidth={3}
                dot={{ fill: '#f97316', strokeWidth: 2, r: 4 }}
                name="Projetos Concluídos"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
