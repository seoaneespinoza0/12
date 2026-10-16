import { Process, MaturityLevel } from './types';

// BPMN XML Templates
const generateAsIsXml = (processName: string, tasks: string[]): string => {
  const taskElements = tasks.map((task, i) => {
    const x = 200 + (i * 160);
    const incoming = i === 0 ? 'Flow_0' : `Flow_${i}`;
    const outgoing = `Flow_${i + 1}`;
    return `
    <bpmn:task id="Task_${i + 1}" name="${task}">
      <bpmn:incoming>${incoming}</bpmn:incoming>
      <bpmn:outgoing>${outgoing}</bpmn:outgoing>
    </bpmn:task>`;
  }).join('');

  const flowElements = tasks.map((_, i) => {
    const sourceX = i === 0 ? 136 : 200 + ((i - 1) * 160) + 100;
    const targetX = 200 + (i * 160);
    return `
    <bpmn:sequenceFlow id="Flow_${i + 1}" sourceRef="${i === 0 ? 'Start_1' : `Task_${i}`}" targetRef="Task_${i + 1}" />`;
  }).join('');

  const lastTaskX = 200 + ((tasks.length - 1) * 160) + 100;
  const endX = lastTaskX + 60;

  const shapeElements = tasks.map((_, i) => {
    const x = 200 + (i * 160);
    return `
      <bpmndi:BPMNShape id="Task_${i + 1}_di" bpmnElement="Task_${i + 1}">
        <dc:Bounds x="${x}" y="178" width="100" height="80" />
      </bpmndi:BPMNShape>`;
  }).join('');

  const edgeElements = tasks.map((_, i) => {
    const sourceX = i === 0 ? 136 : 200 + ((i - 1) * 160) + 100;
    const targetX = 200 + (i * 160);
    return `
      <bpmndi:BPMNEdge id="Flow_${i + 1}_di" bpmnElement="Flow_${i + 1}">
        <di:waypoint x="${sourceX}" y="218" />
        <di:waypoint x="${targetX}" y="218" />
      </bpmndi:BPMNEdge>`;
  }).join('');

  const lastFlowEdge = `
      <bpmndi:BPMNEdge id="Flow_${tasks.length + 1}_di" bpmnElement="Flow_${tasks.length + 1}">
        <di:waypoint x="${lastTaskX}" y="218" />
        <di:waypoint x="${endX}" y="218" />
      </bpmndi:BPMNEdge>`;

  const lastFlow = `
    <bpmn:sequenceFlow id="Flow_${tasks.length + 1}" sourceRef="Task_${tasks.length}" targetRef="End_1" />`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" 
  xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" 
  xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
  xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
  id="Definitions_ASIS" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="Process_ASIS" name="${processName} (AS-IS)" isExecutable="false">
    <bpmn:startEvent id="Start_1" name="Inicio">
      <bpmn:outgoing>Flow_0</bpmn:outgoing>
    </bpmn:startEvent>
    ${taskElements}
    <bpmn:endEvent id="End_1" name="Fin">
      <bpmn:incoming>Flow_${tasks.length + 1}</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Flow_0" sourceRef="Start_1" targetRef="Task_1" />
    ${flowElements}
    ${lastFlow}
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_ASIS">
      <bpmndi:BPMNShape id="Start_1_di" bpmnElement="Start_1">
        <dc:Bounds x="100" y="200" width="36" height="36" />
      </bpmndi:BPMNShape>
      ${shapeElements}
      <bpmndi:BPMNShape id="End_1_di" bpmnElement="End_1">
        <dc:Bounds x="${endX}" y="200" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_0_di" bpmnElement="Flow_0">
        <di:waypoint x="136" y="218" />
        <di:waypoint x="200" y="218" />
      </bpmndi:BPMNEdge>
      ${edgeElements}
      ${lastFlowEdge}
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`;
};

const generateToBeXml = (processName: string, tasks: { name: string; type: 'service' | 'user' | 'script' }[]): string => {
  const taskElements = tasks.map((task, i) => {
    const x = 200 + (i * 180);
    const incoming = i === 0 ? 'Flow_0' : `Flow_${i}`;
    const outgoing = `Flow_${i + 1}`;
    const tag = task.type === 'service' ? 'serviceTask' : task.type === 'user' ? 'userTask' : 'scriptTask';
    return `
    <bpmn:${tag} id="Task_${i + 1}" name="${task.name}">
      <bpmn:incoming>${incoming}</bpmn:incoming>
      <bpmn:outgoing>${outgoing}</bpmn:outgoing>
    </bpmn:${tag}>`;
  }).join('');

  const flowElements = tasks.map((_, i) => {
    const sourceX = i === 0 ? 136 : 200 + ((i - 1) * 180) + 100;
    const targetX = 200 + (i * 180);
    return `
    <bpmn:sequenceFlow id="Flow_${i + 1}" sourceRef="${i === 0 ? 'Start_1' : `Task_${i}`}" targetRef="Task_${i + 1}" />`;
  }).join('');

  const lastTaskX = 200 + ((tasks.length - 1) * 180) + 100;
  const endX = lastTaskX + 60;

  const shapeElements = tasks.map((_, i) => {
    const x = 200 + (i * 180);
    return `
      <bpmndi:BPMNShape id="Task_${i + 1}_di" bpmnElement="Task_${i + 1}">
        <dc:Bounds x="${x}" y="178" width="100" height="80" />
      </bpmndi:BPMNShape>`;
  }).join('');

  const edgeElements = tasks.map((_, i) => {
    const sourceX = i === 0 ? 136 : 200 + ((i - 1) * 180) + 100;
    const targetX = 200 + (i * 180);
    return `
      <bpmndi:BPMNEdge id="Flow_${i + 1}_di" bpmnElement="Flow_${i + 1}">
        <di:waypoint x="${sourceX}" y="218" />
        <di:waypoint x="${targetX}" y="218" />
      </bpmndi:BPMNEdge>`;
  }).join('');

  const lastFlowEdge = `
      <bpmndi:BPMNEdge id="Flow_${tasks.length + 1}_di" bpmnElement="Flow_${tasks.length + 1}">
        <di:waypoint x="${lastTaskX}" y="218" />
        <di:waypoint x="${endX}" y="218" />
      </bpmndi:BPMNEdge>`;

  const lastFlow = `
    <bpmn:sequenceFlow id="Flow_${tasks.length + 1}" sourceRef="Task_${tasks.length}" targetRef="End_1" />`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" 
  xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" 
  xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
  xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
  id="Definitions_TOBE" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="Process_TOBE" name="${processName} (TO-BE)" isExecutable="true">
    <bpmn:startEvent id="Start_1" name="Inicio">
      <bpmn:outgoing>Flow_0</bpmn:outgoing>
    </bpmn:startEvent>
    ${taskElements}
    <bpmn:endEvent id="End_1" name="Fin">
      <bpmn:incoming>Flow_${tasks.length + 1}</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Flow_0" sourceRef="Start_1" targetRef="Task_1" />
    ${flowElements}
    ${lastFlow}
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_2">
    <bpmndi:BPMNPlane id="BPMNPlane_2" bpmnElement="Process_TOBE">
      <bpmndi:BPMNShape id="Start_1_di" bpmnElement="Start_1">
        <dc:Bounds x="100" y="200" width="36" height="36" />
      </bpmndi:BPMNShape>
      ${shapeElements}
      <bpmndi:BPMNShape id="End_1_di" bpmnElement="End_1">
        <dc:Bounds x="${endX}" y="200" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_0_di" bpmnElement="Flow_0">
        <di:waypoint x="136" y="218" />
        <di:waypoint x="200" y="218" />
      </bpmndi:BPMNEdge>
      ${edgeElements}
      ${lastFlowEdge}
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`;
};

// Pre-generated models for key processes
export const sampleBpmnXml = {
  remesaAsIs: generateAsIsXml('Recepción de Remesa', [
    'Recepción física de bolsas',
    'Verificación manual en papel',
    'Registro en Excel local',
    'Doble digitación en SAT',
    'Firma manual HPIE',
    'Almacenamiento en bóveda'
  ]),
  remesaToBe: generateToBeXml('Recepción de Remesa', [
    { name: 'Escaneo IoT bolsas', type: 'service' },
    { name: 'Validación auto. SAT', type: 'service' },
    { name: 'Captura única central', type: 'service' },
    { name: 'Firma electrónica', type: 'user' },
    { name: 'Registro auto. bóveda', type: 'service' }
  ]),
  arqueosAsIs: generateAsIsXml('Arqueos de Caja', [
    'Solicitud de arqueo en papel',
    'Conteo físico manual',
    'Registro en hoja de trabajo',
    'Transcripción a Excel',
    'Digitación en SAT',
    'Firma supervisor',
    'Archivo físico'
  ]),
  arqueosToBe: generateToBeXml('Arqueos de Caja', [
    { name: 'Solicitud digital', type: 'user' },
    { name: 'Conteo máquina inteligente', type: 'service' },
    { name: 'Validación auto. SAT', type: 'service' },
    { name: 'Aprobación digital', type: 'user' },
    { name: 'Registro y auditoría', type: 'script' }
  ]),
  atmAsIs: generateAsIsXml('Carga de ATM', [
    'Elaboración plan de carga',
    'Exportación manual archivo',
    'Verificación en Excel',
    'Ingreso manual en SAT',
    'Preparación billetes',
    'Traslado a ATM',
    'Carga física',
    'Registro en formato'
  ]),
  atmToBe: generateToBeXml('Carga de ATM', [
    { name: 'Generación auto. plan', type: 'service' },
    { name: 'Validación DMN', type: 'service' },
    { name: 'Preparación asistida', type: 'user' },
    { name: 'Carga conectada', type: 'service' },
    { name: 'Confirmación digital', type: 'user' }
  ]),
  resguardosAsIs: generateAsIsXml('Gestión de Resguardos', [
    'Solicitud de remesa',
    'Elaboración HPIE manual',
    'Verificación física bolsas',
    'Firma traspaso custodia',
    'Registro en Excel',
    'Digitación en SAT',
    'Traslado físico',
    'Confirmación por teléfono'
  ]),
  resguardosToBe: generateToBeXml('Gestión de Resguardos', [
    { name: 'Solicitud digital', type: 'user' },
    { name: 'Generación HPIE auto.', type: 'service' },
    { name: 'Escaneo IoT', type: 'service' },
    { name: 'Firma electrónica', type: 'user' },
    { name: 'Tracking GPS', type: 'service' },
    { name: 'Confirmación auto.', type: 'script' }
  ])
};

// Maturity Levels
export const maturityLevels: MaturityLevel[] = [
  {
    level: 0,
    name: 'Dependencia Analógica',
    description: 'Registros manuales en papel y doble digitación en Excel + Sistema. Sin trazabilidad digital.',
    criteria: [
      'Más del 60% de registros en papel',
      'Doble digitación en Excel y sistema',
      'Sin trazabilidad digital',
      'Firmas manuscritas obligatorias',
      '23,000 hojas/mes generadas'
    ],
    color: '#ef4444'
  },
  {
    level: 1,
    name: 'Captura Única Digital',
    description: 'Sistema central (SAT) como única fuente de verdad. Eliminación de Excel paralelo.',
    criteria: [
      'Captura única en sistema central',
      'Eliminación de hojas Excel locales',
      'Validación automática de datos',
      'Trazabilidad básica por sesión (UUID)',
      '0% doble digitación'
    ],
    color: '#f97316'
  },
  {
    level: 2,
    name: 'Automatización Parcial',
    description: 'Flujos digitales de aprobación y reglas de excepción parametrizadas (DMN).',
    criteria: [
      'Aprobaciones digitales con firma electrónica',
      'Reglas de excepción DMN configuradas',
      'Notificaciones automáticas',
      'Dashboards operativos en tiempo real',
      '70% reducción de formatos Excel'
    ],
    color: '#eab308'
  },
  {
    level: 3,
    name: 'Operación Digitalizada',
    description: 'Integración con hardware (máquinas contadoras, IoT) y operación sin papel.',
    criteria: [
      'Integración con máquinas contadoras inteligentes',
      'Escaneo automático de bolsas/valores',
      'Cero papel en operación diaria',
      'APIs de integración con SAF',
      'App móvil para cajeros'
    ],
    color: '#22c55e'
  },
  {
    level: 4,
    name: 'Analítica Predictiva e IA',
    description: 'Detección de anomalías con IA, optimización predictiva y operación autónoma.',
    criteria: [
      'IA para detección de anomalías',
      'Analítica predictiva de riesgos',
      'Optimización automática de rutas',
      'Machine Learning para forecasting',
      '95% automatización'
    ],
    color: '#3b82f6'
  }
];

// 12 Processes of Treasury
export const sampleProcesses: Process[] = [
  {
    id: 'proc-001',
    name: 'Recepción de Remesas',
    description: 'Recepción, verificación y registro de remesas de efectivo en Bóveda central',
    category: 'Operaciones de Bóveda',
    maturityLevel: 0,
    asIsModel: { xml: sampleBpmnXml.remesaAsIs, sourceType: 'image' },
    toBeModel: { xml: sampleBpmnXml.remesaToBe, sourceType: 'manual' },
    metrics: { automationLevel: 15, cycleTimeMinutes: 120, paperDocuments: 8, doubleEntryPoints: 3, exceptionRate: 22, costPerBatch: 15.26 },
    status: 'modeled',
    createdAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-01-20T14:30:00Z'
  },
  {
    id: 'proc-002',
    name: 'Arqueos de Caja',
    description: 'Verificación y conteo físico de efectivo en bóveda con registro manual',
    category: 'Control Interno',
    maturityLevel: 0,
    asIsModel: { xml: sampleBpmnXml.arqueosAsIs, sourceType: 'image' },
    toBeModel: { xml: sampleBpmnXml.arqueosToBe, sourceType: 'manual' },
    metrics: { automationLevel: 10, cycleTimeMinutes: 205, paperDocuments: 5, doubleEntryPoints: 4, exceptionRate: 18, costPerBatch: 22.50 },
    status: 'modeled',
    createdAt: '2026-01-18T09:00:00Z',
    updatedAt: '2026-01-22T10:00:00Z'
  },
  {
    id: 'proc-003',
    name: 'Carga de ATM',
    description: 'Preparación, validación y carga de efectivo en cajeros automáticos',
    category: 'Operaciones de Bóveda',
    maturityLevel: 0,
    asIsModel: { xml: sampleBpmnXml.atmAsIs, sourceType: 'image' },
    toBeModel: { xml: sampleBpmnXml.atmToBe, sourceType: 'manual' },
    metrics: { automationLevel: 20, cycleTimeMinutes: 95, paperDocuments: 7, doubleEntryPoints: 2, exceptionRate: 12, costPerBatch: 18.75 },
    status: 'analyzing',
    createdAt: '2026-01-19T11:00:00Z',
    updatedAt: '2026-01-21T08:00:00Z'
  },
  {
    id: 'proc-004',
    name: 'Gestión de Resguardos',
    description: 'Traslado de remesas de resguardo a sucursales con documentación HPIE',
    category: 'Traslado de Valores',
    maturityLevel: 0,
    asIsModel: { xml: sampleBpmnXml.resguardosAsIs, sourceType: 'image' },
    toBeModel: { xml: sampleBpmnXml.resguardosToBe, sourceType: 'manual' },
    metrics: { automationLevel: 5, cycleTimeMinutes: 180, paperDocuments: 12, doubleEntryPoints: 5, exceptionRate: 30, costPerBatch: 28.00 },
    status: 'modeled',
    createdAt: '2026-01-20T14:00:00Z',
    updatedAt: '2026-01-23T09:00:00Z'
  },
  {
    id: 'proc-005',
    name: 'Conciliación Bancaria',
    description: 'Conciliación de movimientos entre SAF, SAT y extractos bancarios',
    category: 'Conciliación',
    maturityLevel: 0,
    asIsModel: null,
    toBeModel: null,
    metrics: { automationLevel: 25, cycleTimeMinutes: 150, paperDocuments: 3, doubleEntryPoints: 2, exceptionRate: 15, costPerBatch: 12.00 },
    status: 'draft',
    createdAt: '2026-01-21T08:00:00Z',
    updatedAt: '2026-01-21T08:00:00Z'
  },
  {
    id: 'proc-006',
    name: 'Custodia de Valores',
    description: 'Control de ingreso/salida de valores en bóveda con libro mayor físico',
    category: 'Control Interno',
    maturityLevel: 0,
    asIsModel: null,
    toBeModel: null,
    metrics: { automationLevel: 8, cycleTimeMinutes: 60, paperDocuments: 6, doubleEntryPoints: 3, exceptionRate: 10, costPerBatch: 8.50 },
    status: 'draft',
    createdAt: '2026-01-22T10:00:00Z',
    updatedAt: '2026-01-22T10:00:00Z'
  },
  {
    id: 'proc-007',
    name: 'Traslado Inter-Sucursal',
    description: 'Transporte de efectivo entre sucursales con escolta y documentación',
    category: 'Traslado de Valores',
    maturityLevel: 0,
    asIsModel: null,
    toBeModel: null,
    metrics: { automationLevel: 5, cycleTimeMinutes: 240, paperDocuments: 9, doubleEntryPoints: 4, exceptionRate: 25, costPerBatch: 35.00 },
    status: 'draft',
    createdAt: '2026-01-22T11:00:00Z',
    updatedAt: '2026-01-22T11:00:00Z'
  },
  {
    id: 'proc-008',
    name: 'Recuento de Efectivo',
    description: 'Verificación de billetes por denominación con máquinas contadoras',
    category: 'Operaciones de Bóveda',
    maturityLevel: 0,
    asIsModel: null,
    toBeModel: null,
    metrics: { automationLevel: 30, cycleTimeMinutes: 45, paperDocuments: 2, doubleEntryPoints: 1, exceptionRate: 8, costPerBatch: 6.00 },
    status: 'analyzing',
    createdAt: '2026-01-23T09:00:00Z',
    updatedAt: '2026-01-24T08:00:00Z'
  },
  {
    id: 'proc-009',
    name: 'Gestión de Excepciones',
    description: 'Manejo de diferencias, faltantes y sobrantes en operaciones de bóveda',
    category: 'Control Interno',
    maturityLevel: 0,
    asIsModel: null,
    toBeModel: null,
    metrics: { automationLevel: 5, cycleTimeMinutes: 90, paperDocuments: 4, doubleEntryPoints: 3, exceptionRate: 35, costPerBatch: 20.00 },
    status: 'draft',
    createdAt: '2026-01-23T14:00:00Z',
    updatedAt: '2026-01-23T14:00:00Z'
  },
  {
    id: 'proc-010',
    name: 'Cierre Operativo Diario',
    description: 'Cierre de operaciones, cuadre de caja y generación de reportes',
    category: 'Operaciones de Bóveda',
    maturityLevel: 0,
    asIsModel: null,
    toBeModel: null,
    metrics: { automationLevel: 15, cycleTimeMinutes: 75, paperDocuments: 5, doubleEntryPoints: 3, exceptionRate: 12, costPerBatch: 14.00 },
    status: 'draft',
    createdAt: '2026-01-24T08:00:00Z',
    updatedAt: '2026-01-24T08:00:00Z'
  },
  {
    id: 'proc-011',
    name: 'Recepción de Clientes Bancarios',
    description: 'Ingreso de planes de carga de bancos (LAFISE, Banpro) con validación',
    category: 'Operaciones de Bóveda',
    maturityLevel: 0,
    asIsModel: null,
    toBeModel: null,
    metrics: { automationLevel: 20, cycleTimeMinutes: 60, paperDocuments: 3, doubleEntryPoints: 2, exceptionRate: 18, costPerBatch: 10.00 },
    status: 'analyzing',
    createdAt: '2026-01-24T10:00:00Z',
    updatedAt: '2026-01-25T09:00:00Z'
  },
  {
    id: 'proc-012',
    name: 'Auditoría de Bóveda',
    description: 'Revisión periódica de controles internos y cumplimiento de procedimientos',
    category: 'Control Interno',
    maturityLevel: 0,
    asIsModel: null,
    toBeModel: null,
    metrics: { automationLevel: 10, cycleTimeMinutes: 180, paperDocuments: 8, doubleEntryPoints: 2, exceptionRate: 5, costPerBatch: 30.00 },
    status: 'draft',
    createdAt: '2026-01-25T08:00:00Z',
    updatedAt: '2026-01-25T08:00:00Z'
  }
];
