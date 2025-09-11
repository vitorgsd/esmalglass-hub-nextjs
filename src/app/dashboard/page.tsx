import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { KPICards } from "@/components/dashboard-widgets/KPICards";
import { PerformanceChart } from "@/components/dashboard-widgets/PerformanceChart";
import { NotificationsFeed } from "@/components/dashboard-widgets/NotificationsFeed";
import { ProjectsToDeliver } from "@/components/dashboard-widgets/ProjectsToDeliver";
import { ClientWorkChart } from "@/components/dashboard-widgets/ClientWorkChart";

export default function Dashboard() {
  return (
    <>
      <DashboardHeader />
      <DashboardSidebar />
      
      {/* Main Content Area */}
      <main className="ml-64 pt-16 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8 mt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Bem-vindo ao Dashboard
            </h2>
            <p className="text-gray-600">
              Acompanhe o desempenho dos seus projetos e oportunidades em tempo real
            </p>
          </div>
          
          {/* KPI Cards */}
          <KPICards />
          
          {/* Chart and Notifications Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <PerformanceChart />
            <NotificationsFeed />
          </div>
          
          {/* Projects to Deliver and Client Work Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 items-start">
            <ProjectsToDeliver />
            <ClientWorkChart />
          </div>
        </div>
      </main>
    </>
  );
}
