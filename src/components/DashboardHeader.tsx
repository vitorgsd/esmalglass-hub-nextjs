import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function DashboardHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50 flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
                
        {/* Título */}
        <h1 className="text-xl font-semibold text-primary">Esmalglass Hub Brasil</h1>
      </div>

      {/* Logo */}
        <img 
          src="/logo-esmalglass.svg" 
          alt="Esmalglass Logo" 
          className="h-7 w-auto object-contain"
        />
      
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">Vitor Dente</p>
          <p className="text-xs text-gray-500">Designer</p>
        </div>

        
        
        <Avatar>
          <AvatarImage src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=32&h=32&fit=crop&crop=face" alt="Vitor Dente" />
          <AvatarFallback>VD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}