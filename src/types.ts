export type ScreenView = 
  | 'inicio' 
  | 'maquinaria' 
  | 'servicios' 
  | 'repuestos' 
  | 'telemetria' 
  | 'corporativo';

export interface Equipment {
  id: string;
  name: string;
  series: string;
  category: 'acarreo' | 'excavacion' | 'perforacion' | 'subterraneo';
  categoryLabel: string;
  environment: 'superficie' | 'subterranea' | 'mixto';
  headline: string;
  description: string;
  image: string;
  altText: string;
  tag: string;
  badge?: string;
  partnerBrand?: string;
  isAutonomous?: boolean;
  specs: {
    capacidad: string;
    potencia: string;
    pesoOperacional: string;
    trenPotencia?: string;
    dimensiones?: string;
    cicloPromedio?: string;
    alcanceMaximo?: string;
    presionHidraulica?: string;
  };
  features: string[];
  applications: string[];
}

export interface ServiceDetail {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  iconName: string;
  description: string;
  processSteps: string[];
  standards: string[];
  deliverable: string;
  guarantee: string;
  image: string;
}

export interface SparePart {
  id: string;
  code: string;
  name: string;
  category: 'hidraulica' | 'perforacion' | 'transmision' | 'sellos' | 'electricos';
  brand: string;
  compatibility: string;
  stockStatus: 'Inmediato' | '24-48h en Mina' | 'Bajo Pedido';
  description: string;
  oemReference: string;
}

export interface TelemetryNode {
  id: string;
  name: string;
  model: string;
  unitCode: string;
  mineSite: string;
  location: string;
  status: 'Operativo' | 'En Ciclo' | 'Mantenimiento Preventivo' | 'Standby';
  engineTemp: number; // °C
  hydraulicPressure: number; // bar
  fuelOrBattery: number; // %
  vibrationMmS: number;
  payloadTon: number;
  neuralLatencyMs: number;
  distanceObstacleM: number;
  coordinates: string;
  alert?: string;
}

export interface QuoteFormData {
  nombre: string;
  empresa: string;
  ruc: string;
  cargo: string;
  email: string;
  telefono: string;
  tipoRequerimiento: string;
  equipoOservicio: string;
  unidadMinera: string;
  comentarios: string;
}
