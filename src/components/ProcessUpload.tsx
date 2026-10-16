import { useState, useRef, DragEvent } from 'react';
import { Process } from '../types';
import { sampleBpmnXml } from '../data';
import { v4 as uuidv4 } from 'uuid';

interface ProcessUploadProps {
  onProcessCreated: (process: Process) => void;
}

export default function ProcessUpload({ onProcessCreated }: ProcessUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [processName, setProcessName] = useState('');
  const [processDescription, setProcessDescription] = useState('');
  const [processCategory, setProcessCategory] = useState('Operaciones de Bóveda');
  const [step, setStep] = useState<'upload' | 'details' | 'processing' | 'complete'>('upload');
  const [progress, setProgress] = useState(0);
  const [detectedSteps, setDetectedSteps] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setStep('details');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleProcess = () => {
    setStep('processing');
    setProcessing(true);
    setProgress(0);

    // Simulated steps detection
    const possibleSteps = [
      'Recepción física del documento',
      'Verificación manual de datos',
      'Registro en hoja de cálculo',
      'Digitación en sistema SAT',
      'Validación por supervisor',
      'Firma y aprobación',
      'Archivo y resguardo'
    ];

    // Simulate AI processing with progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Add detected steps progressively
        const stepIndex = Math.floor((prev + 15) / 15);
        if (stepIndex <= possibleSteps.length && stepIndex > detectedSteps.length) {
          setDetectedSteps(possibleSteps.slice(0, stepIndex));
        }
        return Math.min(prev + 15, 100);
      });
    }, 400);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setDetectedSteps(possibleSteps.slice(0, 5));

      // Select appropriate BPMN template based on category
      let asIsXml = sampleBpmnXml.remesaAsIs;
      if (processCategory.includes('Arqueo')) asIsXml = sampleBpmnXml.arqueosAsIs;
      else if (processCategory.includes('ATM')) asIsXml = sampleBpmnXml.atmAsIs;
      else if (processCategory.includes('Resguardo') || processCategory.includes('Traslado')) asIsXml = sampleBpmnXml.resguardosAsIs;

      const newProcess: Process = {
        id: uuidv4(),
        name: processName || 'Nuevo Proceso',
        description: processDescription || 'Proceso capturado desde imagen',
        category: processCategory,
        maturityLevel: 0,
        asIsModel: { 
          xml: asIsXml, 
          imageUrl: uploadedImage || undefined,
          sourceType: 'image' 
        },
        toBeModel: null,
        metrics: {
          automationLevel: 10,
          cycleTimeMinutes: 120,
          paperDocuments: 5,
          doubleEntryPoints: 3,
          exceptionRate: 20,
          costPerBatch: 15.00
        },
        status: 'modeled',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setTimeout(() => {
        setProcessing(false);
        setStep('complete');
        onProcessCreated(newProcess);
      }, 500);
    }, 3000);
  };

  return (
    <div className="p-6 animate-fade-in max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Subir Proceso desde Imagen</h1>
        <p className="text-slate-500 mt-1">Capture una foto del diagrama de proceso actual (AS-IS) para convertirlo automáticamente a modelo BPMN</p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8">
        {[
          { key: 'upload', label: 'Captura' },
          { key: 'details', label: 'Detalles' },
          { key: 'processing', label: 'Procesamiento' },
          { key: 'complete', label: 'Completado' }
        ].map((s, i) => (
          <div key={s.key} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
              step === s.key ? 'bg-blue-500 text-white scale-110' : 
              ['upload', 'details', 'processing', 'complete'].indexOf(step) > i ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-500'
            }`}>
              {['upload', 'details', 'processing', 'complete'].indexOf(step) > i ? <i className="fas fa-check text-xs"></i> : i + 1}
            </div>
            <span className={`ml-2 text-xs font-medium hidden sm:block ${step === s.key ? 'text-blue-600' : 'text-slate-400'}`}>
              {s.label}
            </span>
            {i < 3 && <div className={`w-12 h-0.5 mx-2 ${['upload', 'details', 'processing', 'complete'].indexOf(step) > i ? 'bg-green-500' : 'bg-slate-200'}`}></div>}
          </div>
        ))}
      </div>

      {/* Upload Step */}
      {step === 'upload' && (
        <div className="space-y-6">
          <div 
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
              dragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-blue-400 hover:bg-blue-50/30'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-camera text-3xl text-blue-500"></i>
            </div>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">
              Arrastra una imagen del proceso
            </h3>
            <p className="text-slate-500 mb-4">
              Fotografía de diagrama, flowchart, o documentación visual del proceso AS-IS
            </p>
            <p className="text-xs text-slate-400 mb-6">
              Formatos: JPG, PNG, WEBP • Máx: 10MB • Resolución recomendada: 1920x1080+
            </p>
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors shadow-sm"
            >
              <i className="fas fa-upload mr-2"></i>
              Seleccionar Imagen
            </button>
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
            />
          </div>

          {/* Tips */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg border border-slate-200 p-4">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mb-2">
                <i className="fas fa-lightbulb text-blue-500 text-sm"></i>
              </div>
              <h4 className="font-medium text-sm text-slate-700 mb-1">Buena iluminación</h4>
              <p className="text-xs text-slate-500">Asegure que el diagrama sea legible con buena luz</p>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-4">
              <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center mb-2">
                <i className="fas fa-expand text-green-500 text-sm"></i>
              </div>
              <h4 className="font-medium text-sm text-slate-700 mb-1">Diagrama completo</h4>
              <p className="text-xs text-slate-500">Capture todo el flujo de inicio a fin</p>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-4">
              <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center mb-2">
                <i className="fas fa-text-height text-purple-500 text-sm"></i>
              </div>
              <h4 className="font-medium text-sm text-slate-700 mb-1">Texto legible</h4>
              <p className="text-xs text-slate-500">Los nombres de actividades deben ser claros</p>
            </div>
          </div>
        </div>
      )}

      {/* Details Step */}
      {step === 'details' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <h3 className="font-medium text-slate-700 mb-3">Imagen Capturada</h3>
            {uploadedImage && (
              <img src={uploadedImage} alt="Proceso capturado" className="w-full rounded-lg object-contain max-h-80 border border-slate-200" />
            )}
            <button 
              onClick={() => { setStep('upload'); setUploadedImage(null); }}
              className="mt-3 text-sm text-blue-500 hover:text-blue-600"
            >
              <i className="fas fa-redo mr-1"></i> Cambiar imagen
            </button>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="font-medium text-slate-700 mb-4">Detalles del Proceso</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Nombre del Proceso *</label>
                <input 
                  type="text"
                  value={processName}
                  onChange={e => setProcessName(e.target.value)}
                  placeholder="Ej: Recepción de Remesas"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Descripción</label>
                <textarea 
                  value={processDescription}
                  onChange={e => setProcessDescription(e.target.value)}
                  placeholder="Descripción del proceso actual..."
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Categoría</label>
                <select 
                  value={processCategory}
                  onChange={e => setProcessCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>Operaciones de Bóveda</option>
                  <option>Control Interno</option>
                  <option>Traslado de Valores</option>
                  <option>Gestión de ATM</option>
                  <option>Conciliación</option>
                </select>
              </div>
              <div className="pt-4 border-t border-slate-200">
                <button 
                  onClick={handleProcess}
                  disabled={!processName}
                  className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i className="fas fa-magic mr-2"></i>
                  Generar Modelo BPMN
                </button>
                <p className="text-xs text-slate-400 mt-2 text-center">
                  Se analizará la imagen y se generará automáticamente el diagrama BPMN
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Processing Step */}
      {step === 'processing' && (
        <div className="bg-white rounded-xl border border-slate-200 p-8">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-cog fa-spin text-2xl text-blue-500"></i>
              </div>
              <h3 className="text-lg font-semibold text-slate-700">Procesando imagen...</h3>
              <p className="text-sm text-slate-500 mt-1">Analizando diagrama y generando modelo BPMN</p>
            </div>

            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span>Progreso</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Detected steps */}
            {detectedSteps.length > 0 && (
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-xs font-medium text-slate-500 mb-2">Actividades detectadas:</p>
                <div className="space-y-2">
                  {detectedSteps.map((s, i) => (
                    <div key={i} className="flex items-center gap-2 animate-fade-in">
                      <i className="fas fa-check-circle text-green-500 text-xs"></i>
                      <span className="text-sm text-slate-700">{s}</span>
                    </div>
                  ))}
                  {progress < 100 && (
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-sm text-slate-400">Analizando siguiente actividad...</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Complete Step */}
      {step === 'complete' && (
        <div className="bg-white rounded-xl border border-green-200 p-8">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-check-circle text-4xl text-green-500"></i>
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">¡Modelo BPMN generado!</h3>
            <p className="text-slate-500 mb-6">
              El proceso "{processName || 'Nuevo Proceso'}" ha sido modelado exitosamente en formato BPMN.
            </p>
            <div className="bg-green-50 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-green-600">{detectedSteps.length}</p>
                  <p className="text-xs text-slate-500">Actividades</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-orange-600">Nivel 0</p>
                  <p className="text-xs text-slate-500">Madurez</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">AS-IS</p>
                  <p className="text-xs text-slate-500">Modelo</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <button 
                onClick={() => {
                  setStep('upload');
                  setUploadedImage(null);
                  setProcessName('');
                  setProcessDescription('');
                  setDetectedSteps([]);
                  setProgress(0);
                }}
                className="px-4 py-2 border border-slate-300 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50"
              >
                <i className="fas fa-plus mr-2"></i> Subir otro
              </button>
              <button 
                onClick={() => setStep('upload')}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600"
              >
                <i className="fas fa-eye mr-2"></i> Ver en editor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
