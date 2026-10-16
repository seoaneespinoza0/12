import { useEffect, useRef, useState } from 'react';
import BpmnViewer from 'bpmn-js/lib/Viewer';
import { Process } from '../types';

interface ProcessComparisonProps {
  process: Process;
}

export default function ProcessComparison({ process }: ProcessComparisonProps) {
  const asIsContainerRef = useRef<HTMLDivElement>(null);
  const toBeContainerRef = useRef<HTMLDivElement>(null);
  const asIsViewerRef = useRef<BpmnViewer | null>(null);
  const toBeViewerRef = useRef<BpmnViewer | null>(null);
  const [selectedProcesses, setSelectedProcesses] = useState<Process>(process);

  useEffect(() => {
    // AS-IS Viewer
    if (asIsContainerRef.current && selectedProcesses.asIsModel?.xml) {
      if (asIsViewerRef.current) asIsViewerRef.current.destroy();
      
      const viewer = new BpmnViewer({ container: asIsContainerRef.current });
      asIsViewerRef.current = viewer;
      
      viewer.importXML(selectedProcesses.asIsModel.xml)
        .then(() => {
          const canvas = viewer.get('canvas') as any;
          canvas.zoom('fit-viewport');
        })
        .catch(console.error);
    }

    // TO-BE Viewer
    if (toBeContainerRef.current && selectedProcesses.toBeModel?.xml) {
      if (toBeViewerRef.current) toBeViewerRef.current.destroy();
      
      const viewer = new BpmnViewer({ container: toBeContainerRef.current });
      toBeViewerRef.current = viewer;
      
      viewer.importXML(selectedProcesses.toBeModel.xml)
        .then(() => {
          const canvas = viewer.get('canvas') as any;
          canvas.zoom('fit-viewport');
        })
        .catch(console.error);
    }

    return () => {
      if (asIsViewerRef.current) asIsViewerRef.current.destroy();
      if (toBeViewerRef.current) toBeViewerRef.current.destroy();
    };
  }, [selectedProcesses]);

  const improvements = [
    { label: 'Eliminación de doble digitación', impact: 'Alto', status: 'planned' },
    { label: 'Captura única en SAT', impact: 'Alto', status: 'planned' },
    { label: 'Firma electrónica', impact: 'Medio', status: 'planned' },
    { label: 'Validación automática IoT', impact: 'Alto', status: 'future' },
    { label: 'Cero papel', impact: 'Alto', status: 'future' },
  ];

  return (
    <div className="h-full flex flex-col animate-fade-in">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <h1 className="text-xl font-bold text-slate-800">Comparación AS-IS vs TO-BE</h1>
        <p className="text-sm text-slate-500 mt-1">{selectedProcesses.name} — Análisis de transformación del proceso</p>
      </div>

      {/* Comparison View */}
      <div className="flex-1 grid grid-cols-2 gap-0 overflow-hidden">
        {/* AS-IS */}
        <div className="border-r border-slate-200 flex flex-col">
          <div className="bg-orange-50 px-4 py-3 border-b border-orange-200">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <h2 className="font-semibold text-orange-800">AS-IS (Estado Actual)</h2>
            </div>
            <p className="text-xs text-orange-600 mt-1">Nivel {selectedProcesses.maturityLevel} — Dependencia analógica</p>
          </div>
          <div className="flex-1 relative bg-white">
            {selectedProcesses.asIsModel?.xml ? (
              <div ref={asIsContainerRef} className="w-full h-full" style={{ minHeight: '400px' }} />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <i className="fas fa-image text-4xl text-slate-300 mb-3"></i>
                  <p className="text-slate-400">Sin modelo AS-IS</p>
                </div>
              </div>
            )}
          </div>
          <div className="bg-slate-50 px-4 py-3 border-t border-slate-200">
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div>
                <p className="text-slate-500">Automatización</p>
                <p className="font-bold text-red-600">{selectedProcesses.metrics.automationLevel}%</p>
              </div>
              <div>
                <p className="text-slate-500">Tiempo ciclo</p>
                <p className="font-bold text-slate-700">{selectedProcesses.metrics.cycleTimeMinutes} min</p>
              </div>
              <div>
                <p className="text-slate-500">Docs papel</p>
                <p className="font-bold text-red-600">{selectedProcesses.metrics.paperDocuments}</p>
              </div>
            </div>
          </div>
        </div>

        {/* TO-BE */}
        <div className="flex flex-col">
          <div className="bg-green-50 px-4 py-3 border-b border-green-200">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <h2 className="font-semibold text-green-800">TO-BE (Estado Objetivo)</h2>
            </div>
            <p className="text-xs text-green-600 mt-1">Nivel 3+ — Operación digitalizada</p>
          </div>
          <div className="flex-1 relative bg-white">
            {selectedProcesses.toBeModel?.xml ? (
              <div ref={toBeContainerRef} className="w-full h-full" style={{ minHeight: '400px' }} />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <i className="fas fa-bullseye text-4xl text-slate-300 mb-3"></i>
                  <p className="text-slate-400">Sin modelo TO-BE</p>
                  <button className="mt-3 px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600">
                    Diseñar modelo objetivo
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="bg-slate-50 px-4 py-3 border-t border-slate-200">
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div>
                <p className="text-slate-500">Automatización</p>
                <p className="font-bold text-green-600">70-95%</p>
              </div>
              <div>
                <p className="text-slate-500">Tiempo ciclo</p>
                <p className="font-bold text-green-600">-54% a -84%</p>
              </div>
              <div>
                <p className="text-slate-500">Docs papel</p>
                <p className="font-bold text-green-600">0</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Improvements Panel */}
      <div className="bg-white border-t border-slate-200 px-6 py-4">
        <h3 className="font-semibold text-slate-700 mb-3">Mejoras Identificadas</h3>
        <div className="flex flex-wrap gap-2">
          {improvements.map((imp, i) => (
            <div key={i} className={`px-3 py-2 rounded-lg border text-sm ${
              imp.status === 'planned' ? 'border-blue-200 bg-blue-50 text-blue-700' : 'border-slate-200 bg-slate-50 text-slate-600'
            }`}>
              <span className="font-medium">{imp.label}</span>
              <span className={`ml-2 px-1.5 py-0.5 rounded text-xs ${
                imp.impact === 'Alto' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
              }`}>
                {imp.impact}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
