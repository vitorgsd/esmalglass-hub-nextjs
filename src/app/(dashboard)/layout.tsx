// src/app/(dashboard)/layout.tsx

// 1. Importamos apenas os componentes que fazem parte do layout
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";

// 2. Criamos o componente de layout que recebe 'children'
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 3. Esta é a "moldura" que você copiou
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <DashboardSidebar />
      
      {/* 4. A 'mágica' do Next.js: o conteúdo da sua página (page.tsx) será inserido aqui */}
      <main className="ml-64 pt-16 p-6">
        {children}
      </main>
    </div>
  );
}