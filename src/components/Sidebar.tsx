import { ViewMode } from '../types';

interface SidebarProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const menuItems: { id: ViewMode; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'fa-chart-line' },
  { id: 'upload', label: 'Subir Proceso', icon: 'fa-camera' },
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
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <i className="fas fa-diagram-project text-white text-sm"></i>
            </div>
            <span className="font-bold text-sm">ProcessFlow</span>
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
            {isOpen && <span className="text-sm font-medium">{item.label}</span>}
          </button>
        ))}
      </nav>

      {isOpen && (
        <div className="absolute bottom-4 left-4 right-4 p-3 bg-slate-700/50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-slate-300">Sistema Activo</span>
          </div>
          <p className="text-xs text-slate-400">
            12 procesos en análisis • Nivel 0→4
          </p>
        </div>
      )}
    </aside>
  );
}
