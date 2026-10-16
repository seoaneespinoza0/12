import { useState } from 'react';
import { ViewMode, Process } from './types';
import { sampleProcesses } from './data';
import Dashboard from './components/Dashboard';
import ProcessUpload from './components/ProcessUpload';
import BpmnEditor from './components/BpmnEditor';
import ProcessComparison from './components/ProcessComparison';
import AnalysisPanel from './components/AnalysisPanel';
import MaturityModel from './components/MaturityModel';
import Sidebar from './components/Sidebar';

function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('dashboard');
  const [processes, setProcesses] = useState<Process[]>(sampleProcesses);
  const [selectedProcess, setSelectedProcess] = useState<Process | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSelectProcess = (process: Process) => {
    setSelectedProcess(process);
    setCurrentView('editor');
  };

  const handleProcessCreated = (process: Process) => {
    setProcesses(prev => [...prev, process]);
    setSelectedProcess(process);
    setCurrentView('editor');
  };

  const handleUpdateProcess = (updatedProcess: Process) => {
    setProcesses(prev => prev.map(p => p.id === updatedProcess.id ? updatedProcess : p));
    setSelectedProcess(updatedProcess);
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard processes={processes} onSelectProcess={handleSelectProcess} />;
      case 'upload':
        return <ProcessUpload onProcessCreated={handleProcessCreated} />;
      case 'editor':
        return (
          <BpmnEditor 
            process={selectedProcess || processes[0]} 
            onUpdate={handleUpdateProcess}
          />
        );
      case 'comparison':
        return (
          <ProcessComparison 
            process={selectedProcess || processes[0]} 
          />
        );
      case 'analysis':
        return <AnalysisPanel processes={processes} />;
      case 'maturity':
        return <MaturityModel processes={processes} />;
      default:
        return <Dashboard processes={processes} onSelectProcess={handleSelectProcess} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar 
        currentView={currentView} 
        onViewChange={setCurrentView}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <main className={`flex-1 overflow-auto transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        {renderView()}
      </main>
    </div>
  );
}

export default App;
