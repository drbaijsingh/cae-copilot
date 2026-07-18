// lib/abaqus/types.ts

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

export interface ParserResult {
  success: boolean;
  model?: EngineeringModel;
  error?: string;
  warnings: string[];
}