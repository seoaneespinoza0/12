export interface Process {
  id: string;
  name: string;
  description: string;
  category: string;
  maturityLevel: number;
  asIsModel: BpmnModel | null;
  toBeModel: BpmnModel | null;
  metrics: ProcessMetrics;
  status: 'draft' | 'analyzing' | 'modeled' | 'optimized';
  createdAt: string;
  updatedAt: string;
}

export interface BpmnModel {
  xml: string;
  imageUrl?: string;
  sourceType: 'image' | 'manual' | 'imported';
}

export interface ProcessMetrics {
  automationLevel: number; // 0-100%
  cycleTimeMinutes: number;
  paperDocuments: number;
  doubleEntryPoints: number;
  exceptionRate: number; // 0-100%
  costPerBatch: number;
}

export interface MaturityLevel {
  level: number;
  name: string;
  description: string;
  criteria: string[];
  color: string;
}

export interface AnalysisResult {
  processId: string;
  bottlenecks: Bottleneck[];
  improvements: Improvement[];
  estimatedSavings: number;
  riskScore: number;
}

export interface Bottleneck {
  id: string;
  activity: string;
  impact: 'high' | 'medium' | 'low';
  description: string;
  estimatedDelayMinutes: number;
}

export interface Improvement {
  id: string;
  area: string;
  action: string;
  priority: number;
  estimatedImpact: string;
}

export type ViewMode = 'dashboard' | 'upload' | 'editor' | 'comparison' | 'analysis' | 'maturity';
