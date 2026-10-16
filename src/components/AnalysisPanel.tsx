import { Process } from '../types';

interface AnalysisPanelProps {
  processes: Process[];
}

export default function AnalysisPanel({ processes }: AnalysisPanelProps) {
  const totalPaper = processes.reduce((acc, p) => acc + p.metrics.paperDocuments, 0);
  const avgCycleTime = Math.round(processes.reduce((acc, p) => acc + p.metrics.cycleTimeMinutes, 0) / processes.length);
  const avgExceptionRate = Math.round(processes.reduce((acc, p) => acc + p.metrics.exceptionRate, 0) / processes.length);
  const totalCost = processes.reduce((acc, p) => acc + p.metrics.costPerBatch, 0);

  const bottlenecks = [
    { process: 'Recepción de Remesas', activity: 'Verificación manual de bolsas', delay: 45, impact: 'high' },
    { process: 'Arqueos de Caja', activity: 'Conteo físico y registro', delay: 90, impact: 'high' },
    { process: 'Carga de ATM', activity: 'Elaboración de plan de carga', delay: 60, impact: 'medium' },
    { process: 'Gestión de Resguardos', activity: 'Elaboración manual HPIE', delay: 35, impact: 'medium' },
    { process: 'Recepción de Remesas', activity: 'Doble digitación SAT', delay: 25, impact: 'medium' },
    { process: 'Traslado Inter-Sucursal', activity: 'Documentación física', delay: 55, impact: 'high' },
    { process: 'Gestión de Excepciones', activity: 'Resolución manual diferencias', delay: 40, impact: 'high' },
  ];

  const recommendations = [
    {
      priority: 1,
      title: 'Eliminar doble digitación Excel + SAT',
      description: 'Implementar captura única en SAT como fuente de verdad. Eliminar hojas Excel locales.',
      impact: 'Reducción de 70% en errores de transcripción',
      effort: 'Medio',
      timeline: '60 días',
      level: 'Nivel 1'
    },
    {
      priority: 2,
      title: 'Digitalizar firmas y HPIE',
      description: 'Reemplazar Hojas de Pase Interno en papel con firma electrónica y trazabilidad digital.',
      impact: 'Eliminación de 23,000 hojas/mes',
      effort: 'Medio',
      timeline: '90 días',
      level: 'Nivel 2'
    },
    {
      priority: 3,
      title: 'Validación automática de remesas',
      description: 'Implementar reglas DMN para validación automática de bolsas recibidas vs esperadas.',
      impact: 'Reducción de 80% en excepciones',
      effort: 'Alto',
      timeline: '120 días',
      level: 'Nivel 2'
    },
    {
      priority: 4,
      title: 'Integración con máquinas contadoras',
      description: 'Conectar hardware de conteo inteligente directamente con SAT para captura automática.',
      impact: 'Eliminación de conteo manual',
      effort: 'Alto',
      timeline: '180 días',
      level: 'Nivel 3'
    },
    {
      priority: 5,
      title: 'Detección de anomalías con IA',
      description: 'Implementar modelos de ML para detectar patrones anómalos en operaciones de bóveda.',
      impact: 'Reducción de 90% en incidentes',
      effort: 'Muy Alto',
      timeline: '240 días',
      level: 'Nivel 4'
    },
  ];

  return (
    <div className="p-6 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Análisis de Procesos</h1>
        <p className="text-slate-500 mt-1">Diagnóstico de cuellos de botella, riesgos y oportunidades de mejora</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-5 text-white">
          <div className="flex items-center justify-between mb-2">
            <i className="fas fa-file-alt text-red-200"></i>
            <span className="text-xs bg-red-400/30 px-2 py-0.5 rounded">CRÍTICO</span>
          </div>
          <p className="text-2xl font-bold">{totalPaper}</p>
          <p className="text-sm text-red-100">Formatos papel activos</p>
        </div>

        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-5 text-white">
          <div className="flex items-center justify-between mb-2">
            <i className="fas fa-clock text-amber-200"></i>
            <span className="text-xs bg-amber-400/30 px-2 py-0.5 rounded">ALTO</span>
          </div>
          <p className="text-2xl font-bold">{avgCycleTime} min</p>
          <p className="text-sm text-amber-100">Tiempo ciclo promedio</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-5 text-white">
          <div className="flex items-center justify-between mb-2">
            <i className="fas fa-exclamation-triangle text-orange-200"></i>
            <span className="text-xs bg-orange-400/30 px-2 py-0.5 rounded">MEDIO</span>
          </div>
          <p className="text-2xl font-bold">{avgExceptionRate}%</p>
          <p className="text-sm text-orange-100">Tasa de excepciones</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white">
          <div className="flex items-center justify-between mb-2">
            <i className="fas fa-dollar-sign text-blue-200"></i>
            <span className="text-xs bg-blue-400/30 px-2 py-0.5 rounded">INFO</span>
          </div>
          <p className="text-2xl font-bold">${totalCost.toFixed(2)}</p>
          <p className="text-sm text-blue-100">Costo total por lote</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bottlenecks */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="p-5 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <i className="fas fa-bolt text-amber-500"></i>
              Cuellos de Botella Detectados
            </h2>
            <p className="text-xs text-slate-400 mt-1">Actividades que generan mayor retraso en el flujo</p>
          </div>
          <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
            {bottlenecks.map((bn, i) => (
              <div key={i} className="p-4 hover:bg-slate-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${
                        bn.impact === 'high' ? 'bg-red-500' : 'bg-amber-500'
                      }`}></span>
                      <p className="font-medium text-sm text-slate-700">{bn.activity}</p>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 ml-4">{bn.process}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-700">+{bn.delay} min</p>
                    <p className="text-xs text-slate-400">retraso</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="p-5 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <i className="fas fa-lightbulb text-blue-500"></i>
              Recomendaciones Priorizadas
            </h2>
            <p className="text-xs text-slate-400 mt-1">Acciones ordenadas por impacto y esfuerzo</p>
          </div>
          <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
            {recommendations.map((rec) => (
              <div key={rec.priority} className="p-4 hover:bg-slate-50">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-blue-600">{rec.priority}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm text-slate-700">{rec.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">{rec.description}</p>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded">
                        {rec.impact}
                      </span>
                      <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        {rec.level}
                      </span>
                      <span className="text-xs text-slate-400">
                        <i className="fas fa-calendar mr-1"></i>{rec.timeline}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        rec.effort === 'Alto' || rec.effort === 'Muy Alto' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {rec.effort}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process Heatmap */}
      <div className="mt-6 bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <i className="fas fa-th text-purple-500"></i>
          Mapa de Calor por Proceso
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 px-3 text-slate-500 font-medium">Proceso</th>
                <th className="text-center py-2 px-3 text-slate-500 font-medium">Automatización</th>
                <th className="text-center py-2 px-3 text-slate-500 font-medium">Papel</th>
                <th className="text-center py-2 px-3 text-slate-500 font-medium">Doble Entrada</th>
                <th className="text-center py-2 px-3 text-slate-500 font-medium">Excepciones</th>
                <th className="text-center py-2 px-3 text-slate-500 font-medium">Modelo</th>
              </tr>
            </thead>
            <tbody>
              {processes.map(p => (
                <tr key={p.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-3 font-medium text-slate-700">{p.name}</td>
                  <td className="py-3 px-3 text-center">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      p.metrics.automationLevel < 20 ? 'bg-red-100 text-red-700' :
                      p.metrics.automationLevel < 50 ? 'bg-amber-100 text-amber-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {p.metrics.automationLevel}%
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      p.metrics.paperDocuments > 8 ? 'bg-red-100 text-red-700' :
                      p.metrics.paperDocuments > 4 ? 'bg-amber-100 text-amber-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {p.metrics.paperDocuments}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      p.metrics.doubleEntryPoints > 3 ? 'bg-red-100 text-red-700' :
                      p.metrics.doubleEntryPoints > 1 ? 'bg-amber-100 text-amber-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {p.metrics.doubleEntryPoints}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      p.metrics.exceptionRate > 20 ? 'bg-red-100 text-red-700' :
                      p.metrics.exceptionRate > 10 ? 'bg-amber-100 text-amber-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {p.metrics.exceptionRate}%
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      {p.asIsModel && <span className="w-3 h-3 bg-orange-400 rounded-full" title="AS-IS"></span>}
                      {p.toBeModel && <span className="w-3 h-3 bg-green-400 rounded-full" title="TO-BE"></span>}
                      {!p.asIsModel && !p.toBeModel && <span className="text-xs text-slate-400">—</span>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Risk Matrix */}
      <div className="mt-6 bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <i className="fas fa-shield-alt text-red-500"></i>
          Matriz de Riesgo Operativo
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-slate-600 mb-3">Riesgos Identificados</h4>
            <div className="space-y-2">
              {[
                { risk: 'Faltantes en bóveda sin trazabilidad', severity: 'Crítico', probability: 'Alta' },
                { risk: 'Duplicación de cargas bancarias', severity: 'Alto', probability: 'Media' },
                { risk: 'Abandono de valores en esclusa', severity: 'Crítico', probability: 'Baja' },
                { risk: 'Remesas incompletas sin registro', severity: 'Alto', probability: 'Alta' },
                { risk: 'Errores de transcripción manual', severity: 'Medio', probability: 'Alta' },
              ].map((r, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                      r.severity === 'Crítico' ? 'bg-red-500' : r.severity === 'Alto' ? 'bg-orange-500' : 'bg-amber-500'
                    }`}></span>
                    <span className="text-sm text-slate-700">{r.risk}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      r.severity === 'Crítico' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                    }`}>{r.severity}</span>
                    <span className="text-xs text-slate-400">{r.probability}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-slate-600 mb-3">Controles Propuestos</h4>
            <div className="space-y-2">
              {[
                { control: 'Trazabilidad digital con UUID por sesión', level: 'Nivel 1' },
                { control: 'Validación automática de archivos de entrada', level: 'Nivel 2' },
                { control: 'Sensores IoT en esclusas de bóveda', level: 'Nivel 3' },
                { control: 'Reglas DMN para remesas completas', level: 'Nivel 2' },
                { control: 'Captura única sin transcripción', level: 'Nivel 1' },
              ].map((c, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <i className="fas fa-shield-alt text-green-500 text-xs"></i>
                    <span className="text-sm text-slate-700">{c.control}</span>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-700">{c.level}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
