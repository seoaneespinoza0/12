import { useEffect, useRef, useState } from 'react';
import BpmnViewer from 'bpmn-js/lib/Viewer';
import { Process } from '../types';

interface BpmnEditorProps {
  process: Process;
  onUpdate: (process: Process) => void;
}

export default function BpmnEditor({ process, onUpdate }: BpmnEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<BpmnViewer | null>(null);
  const [activeTab, setActiveTab] = useState<'asis' | 'tobe'>('asis');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const xml = activeTab === 'asis' 
      ? process.asIsModel?.xml 
      : process.toBeModel?.xml;

    if (!xml) {
      setError(activeTab === 'asis' 
        ? 'No hay modelo AS-IS disponible. Suba una imagen para generar el modelo.' 
        : 'No hay modelo TO-BE disponible. Diseñe el modelo objetivo.'
      );
      setLoading(false);
      return;
    }

    // Destroy previous viewer
    if (viewerRef.current) {
      viewerRef.current.destroy();
    }

    // Create new viewer
    const viewer = new BpmnViewer({
      container: containerRef.current,
    });

    viewerRef.current = viewer;
    setLoading(true);
    setError(null);

    viewer.importXML(xml)
      .then(() => {
        const canvas = viewer.get('canvas') as any;
        canvas.zoom('fit-viewport');
        setLoading(false);
      })
      .catch((err: Error) => {
        console.error('Error importing BPMN:', err);
        setError(`Error al cargar el diagrama: ${err.message}`);
        setLoading(false);
      });

    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy();
      }
    };
  }, [process, activeTab]);

  const handleExportXml = () => {
    if (!viewerRef.current) return;
    viewerRef.current.saveXML({ format: true })
      .then((result: any) => {
        const blob = new Blob([result.xml], { type: 'application/xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${process.name.replace(/\s+/g, '_')}_${activeTab}.bpmn`;
        a.click();
        URL.revokeObjectURL(url);
      });
  };

  const handleExportSvg = () => {
    if (!viewerRef.current) return;
    viewerRef.current.saveSVG()
      .then((result: any) => {
        const blob = new Blob([result.svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${process.name.replace(/\s+/g, '_')}_${activeTab}.svg`;
        a.click();
        URL.revokeObjectURL(url);
      });
  };

  return (
    <div className="h-full flex flex-col animate-fade-in">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-800">{process.name}</h1>
            <p className="text-sm text-slate-500">{process.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleExportXml}
              className="px-3 py-2 text-sm border border-slate-300 rounded-lg hover:bg-slate-50 text-slate-600"
            >
              <i className="fas fa-download mr-1"></i> XML
            </button>
            <button 
              onClick={handleExportSvg}
              className="px-3 py-2 text-sm border border-slate-300 rounded-lg hover:bg-slate-50 text-slate-600"
            >
              <i className="fas fa-image mr-1"></i> SVG
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mt-4">
          <button
            onClick={() => setActiveTab('asis')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'asis' 
                ? 'bg-orange-100 text-orange-700' 
                : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            <i className="fas fa-eye mr-2"></i>
            Modelo AS-IS
          </button>
          <button
            onClick={() => setActiveTab('tobe')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'tobe' 
                ? 'bg-green-100 text-green-700' 
                : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            <i className="fas fa-bullseye mr-2"></i>
            Modelo TO-BE
          </button>
        </div>
      </div>

      {/* BPMN Canvas */}
      <div className="flex-1 relative bg-white">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
            <div className="text-center">
              <div className="w-10 h-10 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-sm text-slate-500">Cargando diagrama...</p>
            </div>
          </div>
        )}
        
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
            <div className="text-center max-w-md">
              <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-exclamation-triangle text-2xl text-amber-500"></i>
              </div>
              <p className="text-slate-600 mb-4">{error}</p>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600">
                <i className="fas fa-camera mr-2"></i>
                Subir imagen del proceso
              </button>
            </div>
          </div>
        )}

        <div 
          ref={containerRef} 
          className="w-full h-full"
          style={{ minHeight: '500px' }}
        />
      </div>

      {/* Metrics Bar */}
      <div className="bg-white border-t border-slate-200 px-6 py-3">
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-slate-500">Automatización:</span>
            <span className="font-medium text-slate-700">{process.metrics.automationLevel}%</span>
            <div className="w-20 bg-slate-100 rounded-full h-1.5">
              <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${process.metrics.automationLevel}%` }}></div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-500">Tiempo ciclo:</span>
            <span className="font-medium text-slate-700">{process.metrics.cycleTimeMinutes} min</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-500">Docs papel:</span>
            <span className="font-medium text-red-600">{process.metrics.paperDocuments}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-500">Doble entrada:</span>
            <span className="font-medium text-amber-600">{process.metrics.doubleEntryPoints} puntos</span>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-slate-500">Nivel madurez:</span>
            <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs font-medium">
              Nivel {process.maturityLevel}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
