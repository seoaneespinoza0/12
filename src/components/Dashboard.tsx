import { Process } from '../types';

interface DashboardProps {
  processes: Process[];
  onSelectProcess: (process: Process) => void;
}

export default function Dashboard({ processes, onSelectProcess }: DashboardProps) {
  const totalProcesses = processes.length;
  const avgAutomation = Math.round(processes.reduce((acc, p) => acc + p.metrics.automationLevel, 0) / totalProcesses);
  const totalPaperDocs = processes.reduce((acc, p) => acc + p.metrics.paperDocuments, 0);
  const totalDoubleEntry = processes.reduce((acc, p) => acc + p.metrics.doubleEntryPoints, 0);
  const modeledCount = processes.filter(p => p.asIsModel || p.toBeModel).length;

  const statusColors = {
    draft: 'bg-slate-100 text-slate-700',
    analyzing: 'bg-amber-100 text-amber-700',
    modeled: 'bg-blue-100 text-blue-700',
    optimized: 'bg-green-100 text-green-700',
  };

  const statusLabels = {
    draft: 'Borrador',
    analyzing: 'Analizando',
    modeled: 'Modelado',
    optimized: 'Optimizado',
  };

  const categoryColors: Record<string, string> = {
    'Operaciones de Bóveda': 'bg-blue-500',
    'Control Interno': 'bg-purple-500',
    'Traslado de Valores': 'bg-orange-500',
    'Gestión de ATM': 'bg-green-500',
    'Conciliación': 'bg-teal-500',
  };

  return (
    <div className="p-6 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Dashboard de Procesos</h1>
            <p className="text-slate-500 mt-1">Monitoreo y control de flujo de procesos de Tesorería — 12 procesos core</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-xs font-medium">
              <i className="fas fa-circle text-[8px] mr-1 animate-pulse"></i>
              Nivel 0 — Dependencia Analógica
            </span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Procesos</p>
              <p className="text-3xl font-bold text-slate-800 mt-1">{totalProcesses}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <i className="fas fa-layer-group text-blue-500 text-lg"></i>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1">
            <span className="text-xs text-blue-600 font-medium">{modeledCount} modelados</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Automatización</p>
              <p className="text-3xl font-bold text-slate-800 mt-1">{avgAutomation}%</p>
            </div>
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
              <i className="fas fa-robot text-amber-500 text-lg"></i>
            </div>
          </div>
          <div className="mt-3">
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-amber-500 h-2 rounded-full transition-all" style={{ width: `${avgAutomation}%` }}></div>
            </div>
            <span className="text-xs text-slate-400 mt-1">Meta: 70%</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Docs Papel/Mes</p>
              <p className="text-3xl font-bold text-red-600 mt-1">{totalPaperDocs}</p>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
              <i className="fas fa-file-alt text-red-500 text-lg"></i>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1">
            <span className="text-xs text-red-600">~23,000 hojas/mes total</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Doble Digitación</p>
              <p className="text-3xl font-bold text-purple-600 mt-1">{totalDoubleEntry}</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
              <i className="fas fa-copy text-purple-500 text-lg"></i>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1">
            <span className="text-xs text-slate-500">Puntos Excel + SAT</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Excepciones</p>
              <p className="text-3xl font-bold text-orange-600 mt-1">{Math.round(processes.reduce((acc, p) => acc + p.metrics.exceptionRate, 0) / totalProcesses)}%</p>
            </div>
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
              <i className="fas fa-exclamation-triangle text-orange-500 text-lg"></i>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1">
            <span className="text-xs text-orange-600">Tasa promedio</span>
          </div>
        </div>
      </div>

      {/* Process Grid */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-800">Procesos de Tesorería</h2>
          <div className="flex items-center gap-3 text-xs">
            {Object.entries(categoryColors).map(([cat, color]) => (
              <span key={cat} className="flex items-center gap-1">
                <span className={`w-2 h-2 rounded-full ${color}`}></span>
                <span className="text-slate-500">{cat}</span>
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {processes.map(p => (
            <div 
              key={p.id} 
              onClick={() => onSelectProcess(p)}
              className="process-card bg-white rounded-xl border border-slate-200 p-5 cursor-pointer hover:border-blue-300"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${categoryColors[p.category] || 'bg-slate-400'}`}></span>
                  <span className="text-xs text-slate-500">{p.category}</span>
                </div>
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusColors[p.status]}`}>
                  {statusLabels[p.status]}
                </span>
              </div>
              <h3 className="font-semibold text-slate-800 mb-1">{p.name}</h3>
              <p className="text-xs text-slate-500 mb-4 line-clamp-2">{p.description}</p>
              
              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="text-center">
                  <p className="text-xs text-slate-400">Auto.</p>
                  <p className={`text-sm font-bold ${p.metrics.automationLevel < 20 ? 'text-red-600' : p.metrics.automationLevel < 50 ? 'text-amber-600' : 'text-green-600'}`}>
                    {p.metrics.automationLevel}%
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-slate-400">Ciclo</p>
                  <p className="text-sm font-bold text-slate-700">{p.metrics.cycleTimeMinutes}m</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-slate-400">Papel</p>
                  <p className="text-sm font-bold text-red-600">{p.metrics.paperDocuments}</p>
                </div>
              </div>

              {/* Model status */}
              <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                <span className={`flex items-center gap-1 text-xs ${p.asIsModel ? 'text-orange-600' : 'text-slate-400'}`}>
                  <i className={`fas ${p.asIsModel ? 'fa-check-circle' : 'fa-circle'}`}></i>
                  AS-IS
                </span>
                <span className={`flex items-center gap-1 text-xs ${p.toBeModel ? 'text-green-600' : 'text-slate-400'}`}>
                  <i className={`fas ${p.toBeModel ? 'fa-check-circle' : 'fa-circle'}`}></i>
                  TO-BE
                </span>
                {p.asIsModel?.sourceType === 'image' && (
                  <span className="ml-auto text-xs text-blue-500">
                    <i className="fas fa-camera mr-1"></i>Imagen
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transformation Progress */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-lg">Progreso de Transformación</h3>
            <p className="text-sm text-slate-400">Hoja de ruta: Nivel 0 → Nivel 4 (2026-2027)</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-orange-400">{Math.round((modeledCount / totalProcesses) * 100)}%</p>
            <p className="text-xs text-slate-400">procesos modelados</p>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {['N0: Analógico', 'N1: Captura Única', 'N2: Auto. Parcial', 'N3: Digitalizado', 'N4: IA'].map((label, i) => (
            <div key={i} className="text-center">
              <div className={`h-2 rounded-full mb-2 ${i === 0 ? 'bg-orange-500' : 'bg-slate-600'}`}></div>
              <p className="text-xs text-slate-400">{label}</p>
              <p className="text-sm font-bold mt-1">{i === 0 ? totalProcesses : 0}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
