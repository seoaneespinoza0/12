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

  return (
    <div className="p-6 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Dashboard de Procesos</h1>
        <p className="text-slate-500 mt-1">Monitoreo y control de flujo de procesos de Tesorería</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Procesos Activos</p>
              <p className="text-3xl font-bold text-slate-800 mt-1">{totalProcesses}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <i className="fas fa-layer-group text-blue-500 text-lg"></i>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1">
            <i className="fas fa-arrow-up text-green-500 text-xs"></i>
            <span className="text-xs text-green-600">+2 este mes</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Automatización Prom.</p>
              <p className="text-3xl font-bold text-slate-800 mt-1">{avgAutomation}%</p>
            </div>
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
              <i className="fas fa-robot text-amber-500 text-lg"></i>
            </div>
          </div>
          <div className="mt-3">
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${avgAutomation}%` }}></div>
            </div>
            <span className="text-xs text-slate-400 mt-1">Meta: 70%</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Docs Papel/Mes</p>
              <p className="text-3xl font-bold text-slate-800 mt-1">{totalPaperDocs}</p>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
              <i className="fas fa-file-alt text-red-500 text-lg"></i>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1">
            <i className="fas fa-arrow-down text-red-500 text-xs"></i>
            <span className="text-xs text-red-600">~23,000 hojas/mes</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Doble Digitación</p>
              <p className="text-3xl font-bold text-slate-800 mt-1">{totalDoubleEntry}</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
              <i className="fas fa-copy text-purple-500 text-lg"></i>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1">
            <span className="text-xs text-slate-500">Puntos de Excel + SAT</span>
          </div>
        </div>
      </div>

      {/* Process List */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800">Procesos Registrados</h2>
          <span className="text-sm text-slate-500">{totalProcesses} procesos</span>
        </div>
        <div className="divide-y divide-slate-100">
          {processes.map(process => (
            <div 
              key={process.id}
              onClick={() => onSelectProcess(process)}
              className="p-4 hover:bg-slate-50 cursor-pointer transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium text-slate-800">{process.name}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[process.status]}`}>
                      {statusLabels[process.status]}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mt-1">{process.description}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs text-slate-400">
                      <i className="fas fa-tag mr-1"></i>{process.category}
                    </span>
                    <span className="text-xs text-slate-400">
                      <i className="fas fa-clock mr-1"></i>{process.metrics.cycleTimeMinutes} min
                    </span>
                    <span className="text-xs text-slate-400">
                      <i className="fas fa-robot mr-1"></i>{process.metrics.automationLevel}% auto.
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {process.asIsModel && (
                    <span className="px-2 py-1 bg-orange-50 text-orange-600 rounded text-xs font-medium">
                      AS-IS
                    </span>
                  )}
                  {process.toBeModel && (
                    <span className="px-2 py-1 bg-green-50 text-green-600 rounded text-xs font-medium">
                      TO-BE
                    </span>
                  )}
                  <i className="fas fa-chevron-right text-slate-300"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
