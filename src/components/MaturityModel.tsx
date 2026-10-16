import { Process } from '../types';
import { maturityLevels } from '../data';

interface MaturityModelProps {
  processes: Process[];
}

export default function MaturityModel({ processes }: MaturityModelProps) {
  const currentLevel = 0;
  const targetLevel = 4;
  const totalProcesses = processes.length;
  const modeledProcesses = processes.filter(p => p.asIsModel || p.toBeModel).length;

  return (
    <div className="p-6 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Modelo de Madurez de Procesos</h1>
        <p className="text-slate-500 mt-1">Hoja de ruta de transformación: Nivel 0 → Nivel 4 (2026-2027)</p>
      </div>

      {/* Current State Summary */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6 text-white mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
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
                  className={`h-3 rounded-full ${i <= currentLevel ? '' : 'bg-slate-600'}`}
                  style={{ backgroundColor: i <= currentLevel ? level.color : undefined }}
                ></div>
                <p className="text-xs text-slate-400 mt-1 text-center">N{level.level}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="bg-slate-700/50 rounded-lg p-3">
            <p className="text-xs text-slate-400">Procesos Totales</p>
            <p className="text-xl font-bold">{totalProcesses}</p>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-3">
            <p className="text-xs text-slate-400">Modelados</p>
            <p className="text-xl font-bold text-blue-400">{modeledProcesses}</p>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-3">
            <p className="text-xs text-slate-400">Avance Global</p>
            <p className="text-xl font-bold text-orange-400">{Math.round((modeledProcesses / totalProcesses) * 100)}%</p>
          </div>
        </div>
      </div>

      {/* Maturity Levels Detail */}
      <div className="space-y-4">
        {maturityLevels.map((level) => {
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
                    className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${level.color}15` }}
                  >
                    <span className="text-xl font-bold" style={{ color: level.color }}>
                      {level.level}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-lg font-semibold text-slate-800">{level.name}</h3>
                      {isCurrent && (
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium animate-pulse">
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

                    {/* Process count at this level */}
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-xs text-slate-400">Procesos en este nivel:</span>
                      <span className="text-sm font-bold" style={{ color: level.color }}>
                        {level.level === 0 ? totalProcesses : 0}
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-2xl font-bold" style={{ color: level.color }}>
                      {level.level === 0 ? totalProcesses : 0}
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
              { phase: 'Fase 1', level: 'Nivel 0→1', title: 'Captura Única Digital', timeline: 'Q1 2026 (60 días)', status: 'active', color: 'bg-orange-500', desc: 'SAT como fuente de verdad, eliminar Excel paralelo' },
              { phase: 'Fase 2', level: 'Nivel 1→2', title: 'Automatización Parcial', timeline: 'Q2 2026 (90 días)', status: 'planned', color: 'bg-amber-500', desc: 'Firma electrónica, reglas DMN, dashboards' },
              { phase: 'Fase 3', level: 'Nivel 2→3', title: 'Integración Hardware', timeline: 'Q3 2026 (90 días)', status: 'planned', color: 'bg-green-500', desc: 'Máquinas contadoras, IoT, App móvil' },
              { phase: 'Fase 4', level: 'Nivel 3→4', title: 'IA y Analítica Predictiva', timeline: 'Q4 2026-Q1 2027 (120 días)', status: 'future', color: 'bg-blue-500', desc: 'Detección anomalías, forecasting, optimización' },
            ].map((phase, i) => (
              <div key={i} className="flex items-start gap-4 relative">
                <div className={`w-12 h-12 rounded-full ${phase.color} flex items-center justify-center z-10 flex-shrink-0 shadow-lg`}>
                  <span className="text-white text-xs font-bold">{phase.phase.split(' ')[1]}</span>
                </div>
                <div className="flex-1 bg-slate-50 rounded-lg p-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <p className="font-semibold text-slate-700">{phase.title}</p>
                      <p className="text-sm text-slate-500">{phase.level}</p>
                      <p className="text-xs text-slate-400 mt-1">{phase.desc}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      phase.status === 'active' ? 'bg-blue-100 text-blue-700' :
                      phase.status === 'planned' ? 'bg-slate-100 text-slate-600' :
                      'bg-slate-50 text-slate-400'
                    }`}>
                      {phase.status === 'active' ? '🔄 EN PROGRESO' : phase.status === 'planned' ? '📋 PLANIFICADO' : '🔮 FUTURO'}
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
              <p className="text-sm text-slate-500">hojas/mes actual</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <i className="fas fa-arrow-down text-green-500"></i>
                <p className="text-2xl font-bold text-green-500">0</p>
              </div>
              <p className="text-xs text-slate-400">meta Nivel 3+</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h4 className="text-sm font-medium text-slate-500 mb-3">Tiempo de Ciclo</h4>
          <div className="space-y-3">
            {[
              { label: 'Recepción Remesa', current: 120, target: 25 },
              { label: 'Arqueos', current: 205, target: 40 },
              { label: 'Carga ATM', current: 95, target: 20 },
              { label: 'Resguardos', current: 180, target: 35 },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-500">{item.label}</span>
                  <span className="text-green-600 font-medium">-{Math.round((1 - item.target / item.current) * 100)}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-slate-100 rounded-full h-1.5">
                    <div className="bg-red-400 h-1.5 rounded-full" style={{ width: `${(item.current / 205) * 100}%` }}></div>
                  </div>
                  <span className="text-xs text-slate-400">{item.current}→{item.target}m</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
