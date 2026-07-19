// lib/abaqus/types.ts

// ✅ MAKE SURE THIS IS EXPORTED
export interface EngineeringModel {
  fileName: string;
  modelName: string;
  solver: "ABAQUS" | "ANSYS" | "LS-DYNA" | "Unknown";
  analysisType: string;
  parts: any[];
  materials: any[];
  sections: any[];
  elementTypes: string[];
  nodes: number;
  elements: number;
  nodeSets: string[];
  elementSets: string[];
  boundaryConditions: any[];
  loads: any[];
  contacts: any[];
  steps: any[];
  warnings: string[];
  healthScore: number;
}

// Also export other types if needed
export interface AbaqusSummary {
  modelName: string;
  analysisType?: string;
  elementTypes: string[];
  materials: string[];
  sections?: string[];
  nodeSets?: string[];
  elementSets?: string[];
  nodeCount?: number;
  elementCount?: number;
  steps: number;
  partNames?: string[];
}

export interface ParserResult {
  success: boolean;
  model?: EngineeringModel;
  error?: string;
  warnings: string[];
}