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

    // Simulate AI processing (in real app, this would call an AI vision service)
    setTimeout(() => {
      const newProcess: Process = {
        id: uuidv4(),
        name: processName || 'Nuevo Proceso',
        description: processDescription || 'Proceso capturado desde imagen',
        category: processCategory,
        maturityLevel: 0,
        asIsModel: { 
          xml: sampleBpmnXml.remesaAsIs, 
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

      setProcessing(false);
      setStep('complete');
      onProcessCreated(newProcess);
    }, 3000);
  };

  return (
    <div className="p-6 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Subir Proceso desde Imagen</h1>
        <p className="text-slate-500 mt-1">Capture una foto del diagrama de proceso actual para convertirlo a modelo BPMN</p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8">
        {['upload', 'details', 'processing', 'complete'].map((s, i) => (
          <div key={s} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step === s ? 'bg-blue-500 text-white' : 
              ['upload', 'details', 'processing', 'complete'].indexOf(step) > i ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-500'
            }`}>
              {i + 1}
            </div>
            {i < 3 && <div className={`w-12 h-0.5 ${['upload', 'details', 'processing', 'complete'].indexOf(step) > i ? 'bg-green-500' : 'bg-slate-200'}`}></div>}
          </div>
        ))}
      </div>

      {/* Upload Step */}
      {step === 'upload' && (
        <div 
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
            dragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-blue-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-camera text-3xl text-blue-500"></i>
          </div>
          <h3 className="text-lg font-semibold text-slate-700 mb-2">
            Arrastra una imagen del proceso
          </h3>
          <p className="text-slate-500 mb-4">
            O haz clic para seleccionar un archivo
          </p>
          <p className="text-xs text-slate-400 mb-6">
            Formatos: JPG, PNG, WEBP • Máx: 10MB
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
      )}

      {/* Details Step */}
      {step === 'details' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <h3 className="font-medium text-slate-700 mb-3">Imagen Capturada</h3>
            {uploadedImage && (
              <img src={uploadedImage} alt="Proceso capturado" className="w-full rounded-lg object-contain max-h-80" />
            )}
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="font-medium text-slate-700 mb-4">Detalles del Proceso</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Nombre del Proceso</label>
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
                  placeholder="Descripción del proceso..."
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
              <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => setStep('upload')}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50"
                >
                  Volver
                </button>
                <button 
                  onClick={handleProcess}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                >
                  <i className="fas fa-magic mr-2"></i>
                  Convertir a BPMN
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Processing Step */}
      {step === 'processing' && (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h3 className="text-lg font-semibold text-slate-700 mb-2">Procesando imagen...</h3>
          <p className="text-slate-500 mb-4">Analizando diagrama y generando modelo BPMN</p>
          <div className="max-w-md mx-auto">
            <div className="flex items-center gap-3 text-sm text-slate-500 mb-2">
              <i className="fas fa-check-circle text-green-500"></i>
              <span>Imagen cargada correctamente</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-500 mb-2">
              {processing ? (
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <i className="fas fa-check-circle text-green-500"></i>
              )}
              <span>Detectando elementos del diagrama</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <i className="fas fa-circle text-slate-300 text-xs"></i>
              <span>Generando XML BPMN</span>
            </div>
          </div>
        </div>
      )}

      {/* Complete Step */}
      {step === 'complete' && (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-check text-3xl text-green-500"></i>
          </div>
          <h3 className="text-lg font-semibold text-slate-700 mb-2">¡Proceso convertido exitosamente!</h3>
          <p className="text-slate-500 mb-6">El modelo BPMN ha sido generado y está listo para edición</p>
          <div className="flex items-center justify-center gap-3">
            <button 
              onClick={() => {
                setStep('upload');
                setUploadedImage(null);
                setProcessName('');
                setProcessDescription('');
              }}
              className="px-4 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50"
            >
              Subir otro proceso
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600"
            >
              <i className="fas fa-edit mr-2"></i>
              Ir al Editor
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
