import { Process } from '../types';
import { maturityLevels } from '../data';

interface MaturityModelProps {
  processes: Process[];
}

export default function MaturityModel({ processes }: MaturityModelProps) {
  const currentLevel = 0; // All processes are at level 0
  const targetLevel = 4;

  const getProcessesAtLevel = (level: number) => {
    return processes.filter(p => p.maturityLevel === level);
  };

  return (
    <div className="p-6 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Modelo de Madurez de Procesos</h1>
        <p className="text-slate-500 mt-1">Hoja de ruta de transformación: Nivel 0 → Nivel 4 (2026-2027)</p>
      </div>

      {/* Current State Summary */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6 text-white mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-300">Estado Actual</p>
            <p className="text-3xl font-bold mt-1">Nivel {currentLevel}: {maturityLevels[0].name}</p>
            <p className="text-slate-400 mt-2 text-sm max-w-lg">
              {maturityLevels[0].description}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-300">Meta</p>
            <p className="text-3xl font-bold mt-1 text-green-400">Nivel {targetLevel}</p>
            <p className="text-slate-400 mt-2 text-sm">{maturityLevels[4].name}</p>
          </div>
        </div>
        <div className="mt-6">
          <div className="flex items-center gap-1">
            {maturityLevels.map((level, i) => (
              <div key={i} className="flex-1">
                <div 
                  className={`h-2 rounded-full ${i <= currentLevel ? '' : 'bg-slate-600'}`}
                  style={{ backgroundColor: i <= currentLevel ? level.color : undefined }}
                ></div>
                <p className="text-xs text-slate-400 mt-1 text-center">N{level.level}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Maturity Levels Detail */}
      <div className="space-y-4">
        {maturityLevels.map((level) => {
          const levelProcesses = getProcessesAtLevel(level.level);
          const isCurrent = level.level === currentLevel;
          const isAchieved = level.level <= currentLevel;

          return (
            <div 
              key={level.level}
              className={`bg-white rounded-xl border shadow-sm overflow-hidden transition-all ${
                isCurrent ? 'border-blue-300 ring-2 ring-blue-100' : 'border-slate-200'
              }`}
            >
              <div className="p-5">
                <div className="flex items-start gap-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${level.color}20` }}
                  >
                    <span className="text-lg font-bold" style={{ color: level.color }}>
                      {level.level}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-slate-800">{level.name}</h3>
                      {isCurrent && (
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                          ACTUAL
                        </span>
                      )}
                      {isAchieved && !isCurrent && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium">
                          <i className="fas fa-check mr-1"></i>ALCANZADO
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-500 mt-1">{level.description}</p>
                    
                    {/* Criteria */}
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                      {level.criteria.map((criterion, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <i className={`fas ${isAchieved ? 'fa-check-circle text-green-500' : 'fa-circle text-slate-300'} text-xs`}></i>
                          <span className={isAchieved ? 'text-green-700' : 'text-slate-500'}>{criterion}</span>
                        </div>
                      ))}
                    </div>

                    {/* Processes at this level */}
                    {levelProcesses.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {levelProcesses.map(p => (
                          <span key={p.id} className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs">
                            {p.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-2xl font-bold" style={{ color: level.color }}>
                      {levelProcesses.length}
                    </p>
                    <p className="text-xs text-slate-400">procesos</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Roadmap Timeline */}
      <div className="mt-8 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <i className="fas fa-road text-blue-500"></i>
          Hoja de Ruta de Transformación
        </h2>
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200"></div>
          <div className="space-y-6">
            {[
              { phase: 'Fase 1', level: 'Nivel 0→1', title: 'Captura Única Digital', timeline: 'Q1 2026 (60 días)', status: 'active', color: 'bg-orange-500' },
              { phase: 'Fase 2', level: 'Nivel 1→2', title: 'Automatización Parcial', timeline: 'Q2 2026 (90 días)', status: 'planned', color: 'bg-amber-500' },
              { phase: 'Fase 3', level: 'Nivel 2→3', title: 'Integración Hardware', timeline: 'Q3 2026 (90 días)', status: 'planned', color: 'bg-green-500' },
              { phase: 'Fase 4', level: 'Nivel 3→4', title: 'IA y Analítica Predictiva', timeline: 'Q4 2026-Q1 2027 (120 días)', status: 'future', color: 'bg-blue-500' },
            ].map((phase, i) => (
              <div key={i} className="flex items-start gap-4 relative">
                <div className={`w-12 h-12 rounded-full ${phase.color} flex items-center justify-center z-10 flex-shrink-0 shadow-lg`}>
                  <span className="text-white text-xs font-bold">{phase.phase.split(' ')[1]}</span>
                </div>
                <div className="flex-1 bg-slate-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-700">{phase.title}</p>
                      <p className="text-sm text-slate-500">{phase.level}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      phase.status === 'active' ? 'bg-blue-100 text-blue-700' :
                      phase.status === 'planned' ? 'bg-slate-100 text-slate-600' :
                      'bg-slate-50 text-slate-400'
                    }`}>
                      {phase.status === 'active' ? 'EN PROGRESO' : phase.status === 'planned' ? 'PLANIFICADO' : 'FUTURO'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    <i className="fas fa-calendar mr-1"></i>{phase.timeline}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics Projection */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h4 className="text-sm font-medium text-slate-500 mb-3">Proyección de Automatización</h4>
          <div className="space-y-3">
            {[
              { label: 'Actual (N0)', value: 15, color: 'bg-red-500' },
              { label: 'Fase 1 (N1)', value: 40, color: 'bg-orange-500' },
              { label: 'Fase 2 (N2)', value: 60, color: 'bg-amber-500' },
              { label: 'Fase 3 (N3)', value: 80, color: 'bg-green-500' },
              { label: 'Fase 4 (N4)', value: 95, color: 'bg-blue-500' },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-500">{item.label}</span>
                  <span className="font-medium text-slate-700">{item.value}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h4 className="text-sm font-medium text-slate-500 mb-3">Reducción de Papel</h4>
          <div className="flex items-center justify-center h-32">
            <div className="text-center">
              <p className="text-4xl font-bold text-red-500">23K</p>
              <p className="text-xs text-slate-500 mt-1">hojas/mes actuales</p>
              <div className="mt-3 flex items-center gap-2 justify-center">
                <i className="fas fa-arrow-down text-green-500"></i>
                <p className="text-2xl font-bold text-green-500">0</p>
              </div>
              <p className="text-xs text-slate-500">meta: cero papel</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h4 className="text-sm font-medium text-slate-500 mb-3">ROI Estimado</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Reducción tiempo ciclo</span>
              <span className="text-sm font-bold text-green-600">-54% a -84%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Eliminación Excel</span>
              <span className="text-sm font-bold text-green-600">-70% a -80%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Reducción errores</span>
              <span className="text-sm font-bold text-green-600">-90%</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-sm font-medium text-slate-700">Payback estimado</span>
              <span className="text-sm font-bold text-blue-600">8-12 meses</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
