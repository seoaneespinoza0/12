import { ViewMode } from '../types';

interface SidebarProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const menuItems: { id: ViewMode; label: string; icon: string; badge?: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'fa-chart-line' },
  { id: 'upload', label: 'Subir Proceso', icon: 'fa-camera', badge: '📷' },
  { id: 'editor', label: 'Editor BPMN', icon: 'fa-diagram-project' },
  { id: 'comparison', label: 'AS-IS vs TO-BE', icon: 'fa-code-compare' },
  { id: 'analysis', label: 'Análisis', icon: 'fa-magnifying-glass-chart' },
  { id: 'maturity', label: 'Madurez', icon: 'fa-stairs' },
];

export default function Sidebar({ currentView, onViewChange, isOpen, onToggle }: SidebarProps) {
  return (
    <aside className={`fixed left-0 top-0 h-full bg-gradient-to-b from-slate-900 to-slate-800 text-white transition-all duration-300 z-50 ${isOpen ? 'w-64' : 'w-16'}`}>
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        {isOpen && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
              <i className="fas fa-diagram-project text-white text-sm"></i>
            </div>
            <div>
              <span className="font-bold text-sm block leading-tight">ProcessFlow</span>
              <span className="text-[10px] text-slate-400">BPMN Analyzer</span>
            </div>
          </div>
        )}
        <button 
          onClick={onToggle}
          className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
        >
          <i className={`fas ${isOpen ? 'fa-chevron-left' : 'fa-chevron-right'} text-sm`}></i>
        </button>
      </div>

      <nav className="mt-4 px-2">
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg mb-1 transition-all duration-200 ${
              currentView === item.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                : 'text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
            title={!isOpen ? item.label : undefined}
          >
            <i className={`fas ${item.icon} w-5 text-center`}></i>
            {isOpen && (
              <>
                <span className="text-sm font-medium flex-1 text-left">{item.label}</span>
                {item.badge && <span className="text-xs">{item.badge}</span>}
              </>
            )}
          </button>
        ))}
      </nav>

      {/* Quick Stats */}
      {isOpen && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="p-3 bg-slate-700/50 rounded-lg mb-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-slate-300">Sistema Activo</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-slate-800/50 rounded p-1.5">
                <p className="text-xs font-bold text-white">12</p>
                <p className="text-[10px] text-slate-400">Procesos</p>
              </div>
              <div className="bg-slate-800/50 rounded p-1.5">
                <p className="text-xs font-bold text-orange-400">N0</p>
                <p className="text-[10px] text-slate-400">Madurez</p>
              </div>
            </div>
          </div>
          <div className="p-3 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg border border-blue-800/30">
            <p className="text-xs text-blue-300 font-medium mb-1">
              <i className="fas fa-rocket mr-1"></i> Plan Aceleración
            </p>
            <p className="text-[10px] text-slate-400">
              N0 → N4 en 4 fases • 2026-2027
            </p>
          </div>
        </div>
      )}
    </aside>
  );
}
