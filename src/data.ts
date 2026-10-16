import { Process, MaturityLevel } from './types';

// Sample BPMN XML for AS-IS processes
export const sampleBpmnXml = {
  remesaAsIs: `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" 
  xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" 
  xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
  xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
  id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="Process_Remesa_ASIS" name="Recepción de Remesa (AS-IS)" isExecutable="false">
    <bpmn:startEvent id="Start_1" name="Llegada de Remesa">
      <bpmn:outgoing>Flow_1</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:task id="Task_1" name="Recepción física de bolsas">
      <bpmn:incoming>Flow_1</bpmn:incoming>
      <bpmn:outgoing>Flow_2</bpmn:outgoing>
    </bpmn:task>
    <bpmn:task id="Task_2" name="Verificación manual de bolsas en papel">
      <bpmn:incoming>Flow_2</bpmn:incoming>
      <bpmn:outgoing>Flow_3</bpmn:outgoing>
    </bpmn:task>
    <bpmn:task id="Task_3" name="Registro en Excel local">
      <bpmn:incoming>Flow_3</bpmn:incoming>
      <bpmn:outgoing>Flow_4</bpmn:outgoing>
    </bpmn:task>
    <bpmn:task id="Task_4" name="Doble digitación en SAT">
      <bpmn:incoming>Flow_4</bpmn:incoming>
      <bpmn:outgoing>Flow_5</bpmn:outgoing>
    </bpmn:task>
    <bpmn:task id="Task_5" name="Firma manual HPIE">
      <bpmn:incoming>Flow_5</bpmn:incoming>
      <bpmn:outgoing>Flow_6</bpmn:outgoing>
    </bpmn:task>
    <bpmn:task id="Task_6" name="Almacenamiento en bóveda">
      <bpmn:incoming>Flow_6</bpmn:incoming>
      <bpmn:outgoing>Flow_7</bpmn:outgoing>
    </bpmn:task>
    <bpmn:endEvent id="End_1" name="Remesa Registrada">
      <bpmn:incoming>Flow_7</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Flow_1" sourceRef="Start_1" targetRef="Task_1" />
    <bpmn:sequenceFlow id="Flow_2" sourceRef="Task_1" targetRef="Task_2" />
    <bpmn:sequenceFlow id="Flow_3" sourceRef="Task_2" targetRef="Task_3" />
    <bpmn:sequenceFlow id="Flow_4" sourceRef="Task_3" targetRef="Task_4" />
    <bpmn:sequenceFlow id="Flow_5" sourceRef="Task_4" targetRef="Task_5" />
    <bpmn:sequenceFlow id="Flow_6" sourceRef="Task_5" targetRef="Task_6" />
    <bpmn:sequenceFlow id="Flow_7" sourceRef="Task_6" targetRef="End_1" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_Remesa_ASIS">
      <bpmndi:BPMNShape id="Start_1_di" bpmnElement="Start_1">
        <dc:Bounds x="100" y="200" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_1_di" bpmnElement="Task_1">
        <dc:Bounds x="200" y="178" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_2_di" bpmnElement="Task_2">
        <dc:Bounds x="360" y="178" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_3_di" bpmnElement="Task_3">
        <dc:Bounds x="520" y="178" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_4_di" bpmnElement="Task_4">
        <dc:Bounds x="680" y="178" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_5_di" bpmnElement="Task_5">
        <dc:Bounds x="840" y="178" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_6_di" bpmnElement="Task_6">
        <dc:Bounds x="1000" y="178" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="End_1_di" bpmnElement="End_1">
        <dc:Bounds x="1160" y="200" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_1_di" bpmnElement="Flow_1">
        <di:waypoint x="136" y="218" />
        <di:waypoint x="200" y="218" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_2_di" bpmnElement="Flow_2">
        <di:waypoint x="300" y="218" />
        <di:waypoint x="360" y="218" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_3_di" bpmnElement="Flow_3">
        <di:waypoint x="460" y="218" />
        <di:waypoint x="520" y="218" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_4_di" bpmnElement="Flow_4">
        <di:waypoint x="620" y="218" />
        <di:waypoint x="680" y="218" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_5_di" bpmnElement="Flow_5">
        <di:waypoint x="780" y="218" />
        <di:waypoint x="840" y="218" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_6_di" bpmnElement="Flow_6">
        <di:waypoint x="940" y="218" />
        <di:waypoint x="1000" y="218" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_7_di" bpmnElement="Flow_7">
        <di:waypoint x="1100" y="218" />
        <di:waypoint x="1160" y="218" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`,

  remesaToBe: `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" 
  xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" 
  xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
  xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
  id="Definitions_2" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="Process_Remesa_TOBE" name="Recepción de Remesa (TO-BE)" isExecutable="true">
    <bpmn:startEvent id="Start_1" name="Llegada de Remesa">
      <bpmn:outgoing>Flow_1</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:serviceTask id="Task_1" name="Escaneo automático de bolsas (IoT)">
      <bpmn:incoming>Flow_1</bpmn:incoming>
      <bpmn:outgoing>Flow_2</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:serviceTask id="Task_2" name="Validación automática en SAT">
      <bpmn:incoming>Flow_2</bpmn:incoming>
      <bpmn:outgoing>Flow_3</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:serviceTask id="Task_3" name="Captura única en sistema central">
      <bpmn:incoming>Flow_3</bpmn:incoming>
      <bpmn:outgoing>Flow_4</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:userTask id="Task_4" name="Aprobación digital con firma electrónica">
      <bpmn:incoming>Flow_4</bpmn:incoming>
      <bpmn:outgoing>Flow_5</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:serviceTask id="Task_5" name="Registro automático en bóveda">
      <bpmn:incoming>Flow_5</bpmn:incoming>
      <bpmn:outgoing>Flow_6</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:endEvent id="End_1" name="Remesa Digitalizada">
      <bpmn:incoming>Flow_6</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Flow_1" sourceRef="Start_1" targetRef="Task_1" />
    <bpmn:sequenceFlow id="Flow_2" sourceRef="Task_1" targetRef="Task_2" />
    <bpmn:sequenceFlow id="Flow_3" sourceRef="Task_2" targetRef="Task_3" />
    <bpmn:sequenceFlow id="Flow_4" sourceRef="Task_3" targetRef="Task_4" />
    <bpmn:sequenceFlow id="Flow_5" sourceRef="Task_4" targetRef="Task_5" />
    <bpmn:sequenceFlow id="Flow_6" sourceRef="Task_5" targetRef="End_1" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_2">
    <bpmndi:BPMNPlane id="BPMNPlane_2" bpmnElement="Process_Remesa_TOBE">
      <bpmndi:BPMNShape id="Start_1_di" bpmnElement="Start_1">
        <dc:Bounds x="100" y="200" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_1_di" bpmnElement="Task_1">
        <dc:Bounds x="200" y="178" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_2_di" bpmnElement="Task_2">
        <dc:Bounds x="380" y="178" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_3_di" bpmnElement="Task_3">
        <dc:Bounds x="560" y="178" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_4_di" bpmnElement="Task_4">
        <dc:Bounds x="740" y="178" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_5_di" bpmnElement="Task_5">
        <dc:Bounds x="920" y="178" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="End_1_di" bpmnElement="End_1">
        <dc:Bounds x="1080" y="200" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_1_di" bpmnElement="Flow_1">
        <di:waypoint x="136" y="218" />
        <di:waypoint x="200" y="218" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_2_di" bpmnElement="Flow_2">
        <di:waypoint x="300" y="218" />
        <di:waypoint x="380" y="218" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_3_di" bpmnElement="Flow_3">
        <di:waypoint x="480" y="218" />
        <di:waypoint x="560" y="218" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_4_di" bpmnElement="Flow_4">
        <di:waypoint x="660" y="218" />
        <di:waypoint x="740" y="218" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_5_di" bpmnElement="Flow_5">
        <di:waypoint x="840" y="218" />
        <di:waypoint x="920" y="218" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_6_di" bpmnElement="Flow_6">
        <di:waypoint x="1020" y="218" />
        <di:waypoint x="1080" y="218" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`
};

export const maturityLevels: MaturityLevel[] = [
  {
    level: 0,
    name: 'Dependencia Analógica',
    description: 'Registros manuales en papel y doble digitación en Excel + Sistema',
    criteria: [
      'Más del 60% de registros en papel',
      'Doble digitación en Excel y sistema',
      'Sin trazabilidad digital',
      'Firmas manuscritas obligatorias'
    ],
    color: '#ef4444'
  },
  {
    level: 1,
    name: 'Captura Única Digital',
    description: 'Sistema central (SAT) como única fuente de verdad, eliminación de Excel paralelo',
    criteria: [
      'Captura única en sistema central',
      'Eliminación de hojas Excel locales',
      'Validación automática de datos',
      'Trazabilidad básica por sesión (UUID)'
    ],
    color: '#f97316'
  },
  {
    level: 2,
    name: 'Automatización Parcial',
    description: 'Flujos digitales de aprobación y reglas de excepción parametrizadas',
    criteria: [
      'Aprobaciones digitales con firma electrónica',
      'Reglas de excepción DMN configuradas',
      'Notificaciones automáticas',
      'Dashboards operativos en tiempo real'
    ],
    color: '#eab308'
  },
  {
    level: 3,
    name: 'Operación Digitalizada',
    description: 'Integración con hardware (máquinas contadoras, IoT) y operación sin papel',
    criteria: [
      'Integración con máquinas contadoras inteligentes',
      'Escaneo automático de bolsas/valores',
      'Cero papel en operación diaria',
      'APIs de integración con SAF'
    ],
    color: '#22c55e'
  },
  {
    level: 4,
    name: 'Analítica Predictiva e IA',
    description: 'Detección de anomalías con IA, optimización predictiva y operación autónoma',
    criteria: [
      'IA para detección de anomalías',
      'Analítica predictiva de riesgos',
      'Optimización automática de rutas',
      'Machine Learning para forecasting'
    ],
    color: '#3b82f6'
  }
];

export const sampleProcesses: Process[] = [
  {
    id: 'proc-001',
    name: 'Recepción de Remesas',
    description: 'Proceso de recepción, verificación y registro de remesas de efectivo en Bóveda central',
    category: 'Operaciones de Bóveda',
    maturityLevel: 0,
    asIsModel: { xml: sampleBpmnXml.remesaAsIs, sourceType: 'image' },
    toBeModel: { xml: sampleBpmnXml.remesaToBe, sourceType: 'manual' },
    metrics: {
      automationLevel: 15,
      cycleTimeMinutes: 120,
      paperDocuments: 8,
      doubleEntryPoints: 3,
      exceptionRate: 22,
      costPerBatch: 15.26
    },
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
    asIsModel: null,
    toBeModel: null,
    metrics: {
      automationLevel: 10,
      cycleTimeMinutes: 205,
      paperDocuments: 5,
      doubleEntryPoints: 4,
      exceptionRate: 18,
      costPerBatch: 22.50
    },
    status: 'draft',
    createdAt: '2026-01-18T09:00:00Z',
    updatedAt: '2026-01-18T09:00:00Z'
  },
  {
    id: 'proc-003',
    name: 'Carga de ATM',
    description: 'Preparación, validación y carga de efectivo en cajeros automáticos',
    category: 'Operaciones de Bóveda',
    maturityLevel: 0,
    asIsModel: null,
    toBeModel: null,
    metrics: {
      automationLevel: 20,
      cycleTimeMinutes: 95,
      paperDocuments: 7,
      doubleEntryPoints: 2,
      exceptionRate: 12,
      costPerBatch: 18.75
    },
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
    asIsModel: null,
    toBeModel: null,
    metrics: {
      automationLevel: 5,
      cycleTimeMinutes: 180,
      paperDocuments: 12,
      doubleEntryPoints: 5,
      exceptionRate: 30,
      costPerBatch: 28.00
    },
    status: 'draft',
    createdAt: '2026-01-20T14:00:00Z',
    updatedAt: '2026-01-20T14:00:00Z'
  }
];
