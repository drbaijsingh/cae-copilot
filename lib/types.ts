export interface AbaqusSummary {
  modelName: string;

  analysisType: string;

  partNames: string[];

  elementTypes: string[];

  materials: string[];

  sections: string[];

  nodeSets: string[];

  elementSets: string[];

  nodeCount: number;

  elementCount: number;

  steps: number;
}