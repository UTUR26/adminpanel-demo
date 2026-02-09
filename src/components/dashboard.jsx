import React from 'react';
import { LayoutDashboard, Layers, Activity, Settings, Bell, Download, LogOut } from 'lucide-react';

// Añadimos 'onFeatureClick' a las props recibidas
export default function DashboardLayout({ children, onExport, isExporting, onFeatureClick }) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-zinc-950 text-zinc-400 font-sans">
      
      {/* === SIDEBAR === */}
      <aside className="w-64 flex-shrink-0 border-r border-zinc-800/50 bg-zinc-950 flex flex-col hidden md:flex">
        {/* Logo */}
        <div className="h-14 flex items-center px-4 border-b border-zinc-800/50">
          <div className="w-6 h-6 bg-zinc-100 rounded flex items-center justify-center text-zinc-950 font-bold font-mono text-xs mr-3">
            U
          </div>
          <span className="font-bold text-zinc-100 tracking-tight text-sm">UTUR26<span className="text-zinc-500 font-normal">.ops</span></span>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
          {/* Overview es la única pantalla real, por eso está activa */}
          <NavItem 
            icon={<LayoutDashboard size={16} />} 
            label="Overview" 
            active 
          />
          
          {/* Estos botones disparan el Modal Premium */}
          <NavItem 
            icon={<Layers size={16} />} 
            label="Projects" 
            onClick={() => onFeatureClick && onFeatureClick("Gestión de Proyectos")}
          />
          <NavItem 
            icon={<Activity size={16} />} 
            label="System Health" 
            onClick={() => onFeatureClick && onFeatureClick("Monitoreo de Salud")}
          />
          <NavItem 
            icon={<Settings size={16} />} 
            label="Settings" 
            onClick={() => onFeatureClick && onFeatureClick("Configuración Global")}
          />
        </nav>

        {/* User Footer - También puede disparar modal de "Perfil" */}
        <div className="p-3 border-t border-zinc-800/50">
          <div 
            onClick={() => onFeatureClick && onFeatureClick("Perfil de Usuario")}
            className="flex items-center gap-3 p-2 rounded hover:bg-zinc-900 transition-colors cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 ring-2 ring-zinc-900 group-hover:ring-zinc-700 transition-all"></div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-zinc-100 truncate">Lead Architect</p>
              <p className="text-[10px] text-zinc-500 truncate group-hover:text-zinc-400">admin@utur26.com</p>
            </div>
            <LogOut size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </aside>

      {/* === MAIN CONTENT === */}
      <div className="flex-1 flex flex-col min-w-0 bg-zinc-950/50 relative">
        
        {/* Topbar */}
        <header className="h-14 border-b border-zinc-800/50 flex items-center justify-between px-6 bg-zinc-950/80 backdrop-blur-sm z-20 sticky top-0">
            
          <div className="flex items-center gap-2 text-xs">
            <div className="md:hidden w-6 h-6 bg-zinc-800 rounded mr-2 flex items-center justify-center">
                <LayoutDashboard size={14} />
            </div>

            <span className="text-zinc-100 font-medium">Dashboard</span>
            <span className="text-zinc-700">/</span>
            <span className="hidden sm:inline">Operations Control</span>
          </div>

          <div className="flex items-center gap-4">

            {/* Export Button */}
            {onExport && (
              <button 
                onClick={onExport}
                disabled={isExporting}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded text-[11px] font-medium text-zinc-300 hover:text-white hover:border-zinc-700 transition-all disabled:opacity-50 disabled:cursor-wait active:scale-95"
              >
                {isExporting ? (
                  <>
                    <div className="w-3 h-3 border-2 border-zinc-500 border-t-zinc-200 rounded-full animate-spin"></div>
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Download size={14} />
                    <span>Export Report</span>
                  </>
                )}
              </button>
            )}

            {/* Status Badge */}
            <div className="flex items-center gap-2 px-2.5 py-1 bg-emerald-500/5 border border-emerald-500/20 rounded-full cursor-help" title="Conexión estable">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
              <span className="text-[10px] font-mono font-bold text-emerald-500 tracking-wider hidden sm:inline">ONLINE</span>
            </div>
            
            {/* Notifications - Dispara modal */}
            <button 
                onClick={() => onFeatureClick && onFeatureClick("Centro de Notificaciones")}
                className="relative p-1.5 hover:bg-zinc-900 rounded text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              <Bell size={16} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full border-2 border-zinc-950"></span>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

// Actualizamos NavItem para recibir 'onClick'
function NavItem({ icon, label, active, onClick }) {
  return (
    <button 
      onClick={onClick} // Conectamos el evento aquí
      className={`w-full flex items-center gap-3 px-3 py-2 rounded text-xs font-medium transition-all group ${
      active 
      ? 'bg-zinc-900 text-zinc-100 border border-zinc-800 shadow-sm' 
      : 'text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-300'
    }`}>
      <span className={active ? 'text-indigo-400' : 'text-zinc-500 group-hover:text-zinc-400'}>
        {icon}
      </span>
      {label}
    </button>
  )
}