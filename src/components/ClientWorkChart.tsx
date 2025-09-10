"use client";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";

const clientData = [
  { client: "Embramaco", trabalhos: 42 },
  { client: "Pisoforte", trabalhos: 38 },
  { client: "Karina", trabalhos: 35 },
  { client: "Damme", trabalhos: 31 },
  { client: "Delta", trabalhos: 28 },
  { client: "Dexco", trabalhos: 26 },
  { client: "Eliane - BA", trabalhos: 23 },
  { client: "Incesa", trabalhos: 21 },
  { client: "Incopisos", trabalhos: 19 },
  { client: "Karina Igaraçu", trabalhos: 17 },
  { client: "Lanzi", trabalhos: 15 },
  { client: "Lef", trabalhos: 13 },
  { client: "Via Rosa", trabalhos: 11 },
  { client: "Lourdes", trabalhos: 9 },
  { client: "Rafaela", trabalhos: 7 },
  { client: "Savane", trabalhos: 5 },
  { client: "Serra Azul", trabalhos: 3 }
];

export function ClientWorkChart() {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Trabalhos por Cliente (2025)
        </CardTitle>
        <p className="text-sm text-gray-600">
          Número de trabalhos executados por cliente no ano
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[480px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={clientData}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                type="number"
                stroke="#64748b"
                fontSize={12}
                axisLine={false}
                tickLine={false}
                domain={[0, 'dataMax + 5']}
              />
              <YAxis 
                type="category"
                dataKey="client"
                stroke="#64748b"
                fontSize={10}
                axisLine={false}
                tickLine={false}
                width={100}
                interval={0}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value: any) => [`${value} trabalhos`, 'Total']}
                labelStyle={{ color: '#1e293b' }}
              />
              <Bar 
                dataKey="trabalhos" 
                fill="#1e40af"
                radius={[0, 4, 4, 0]}
                name="Trabalhos"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Summary stats */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-semibold text-gray-900">17</p>
              <p className="text-sm text-gray-600">Clientes Ativos</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">353</p>
              <p className="text-sm text-gray-600">Total de Trabalhos</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">21</p>
              <p className="text-sm text-gray-600">Média por Cliente</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
