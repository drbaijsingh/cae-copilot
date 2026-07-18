// lib/abaqus/parser.ts

import { EngineeringModel, ParserResult } from './types';

export class AbaqusParser {
  parse(content: string, fileName: string): ParserResult {
    const model: EngineeringModel = {
      fileName: fileName,
      modelName: fileName.replace(/\.inp$/i, ''),
      solver: 'ABAQUS',
      analysisType: 'Unknown',
      parts: [],
      materials: [],
      sections: [],
      elementTypes: [],
      nodes: 0,
      elements: 0,
      nodeSets: [],
      elementSets: [],
      boundaryConditions: [],
      loads: [],
      contacts: [],
      steps: [],
      warnings: [],
      healthScore: 100,
    };

    const lines = content.split('\n');
    let i = 0;

    try {
      while (i < lines.length) {
        const line = lines[i].trim();

        // Skip empty lines and comments
        if (!line || line.startsWith('**')) {
          i++;
          continue;
        }

        // Detect analysis type
        if (line.toLowerCase().includes('*static')) {
          model.analysisType = 'Static';
        } else if (line.toLowerCase().includes('*dynamic,explicit')) {
          model.analysisType = 'Dynamic (Explicit)';
        } else if (line.toLowerCase().includes('*dynamic')) {
          model.analysisType = 'Dynamic (Implicit)';
        } else if (line.toLowerCase().includes('*heat transfer')) {
          model.analysisType = 'Heat Transfer';
        } else if (line.toLowerCase().includes('*frequency')) {
          model.analysisType = 'Frequency';
        } else if (line.toLowerCase().includes('*buckle')) {
          model.analysisType = 'Buckling';
        }

        // Extract materials
        if (line.toLowerCase().includes('*material')) {
          const nameMatch = line.match(/NAME\s*=\s*([^\s,]+)/i);
          if (nameMatch) {
            model.materials.push({ name: nameMatch[1], properties: {} });
          }
        }

        // Extract steps
        if (line.toLowerCase().includes('*step')) {
          const nameMatch = line.match(/NAME\s*=\s*([^\s,]+)/i);
          if (nameMatch) {
            model.steps.push({
              name: nameMatch[1],
              type: 'Unknown',
              nlgeom: false,
              inc: 0,
            });
          }
        }

        // Extract element types
        if (line.toLowerCase().includes('*element')) {
          const typeMatch = line.match(/TYPE\s*=\s*([^\s,]+)/i);
          if (typeMatch && !model.elementTypes.includes(typeMatch[1])) {
            model.elementTypes.push(typeMatch[1]);
          }
        }

        // Extract node sets
        if (line.toLowerCase().includes('*nset')) {
          const nameMatch = line.match(/NAME\s*=\s*([^\s,]+)/i);
          if (nameMatch) {
            model.nodeSets.push(nameMatch[1]);
          }
        }

        // Extract element sets
        if (line.toLowerCase().includes('*elset')) {
          const nameMatch = line.match(/NAME\s*=\s*([^\s,]+)/i);
          if (nameMatch) {
            model.elementSets.push(nameMatch[1]);
          }
        }

        // Count nodes
        if (line.toLowerCase().includes('*node')) {
          let count = 0;
          for (let j = i + 1; j < lines.length; j++) {
            const dataLine = lines[j].trim();
            if (dataLine.startsWith('*') || dataLine === '') break;
            if (dataLine.match(/^\d+[,;]/)) count++;
          }
          model.nodes += count;
        }

        // Count elements
        if (line.toLowerCase().includes('*element')) {
          let count = 0;
          for (let j = i + 1; j < lines.length; j++) {
            const dataLine = lines[j].trim();
            if (dataLine.startsWith('*') || dataLine === '') break;
            if (dataLine.match(/^\d+[,;]/)) count++;
          }
          model.elements += count;
        }

        i++;
      }

      // Calculate health score
      model.healthScore = this.calculateHealthScore(model);

      return {
        success: true,
        model: model,
        warnings: model.warnings,
      };

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        warnings: model.warnings,
      };
    }
  }

  private calculateHealthScore(model: EngineeringModel): number {
    let score = 100;
    const warnings = [];

    if (model.materials.length === 0) {
      warnings.push('No materials defined');
      score -= 15;
    }

    if (model.steps.length === 0) {
      warnings.push('No analysis steps defined');
      score -= 20;
    }

    if (model.nodes === 0) {
      warnings.push('No nodes found');
      score -= 20;
    }

    if (model.elements === 0) {
      warnings.push('No elements found');
      score -= 20;
    }

    if (model.boundaryConditions.length === 0 && model.loads.length === 0) {
      warnings.push('No boundary conditions or loads defined');
      score -= 10;
    }

    model.warnings = warnings;
    return Math.max(0, score);
  }
}

export const abaqusParser = new AbaqusParser();