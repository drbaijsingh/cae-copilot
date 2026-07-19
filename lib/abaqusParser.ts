// lib/abaqusParser.ts

import { AbaqusSummary } from './types';

export function parseAbaqusFile(content: string, fileName: string): AbaqusSummary {
  // Initialize variables with defaults
  let modelName = fileName.replace(/\.inp$/i, '');
  let analysisType = 'Unknown';
  let elementTypes: string[] = [];
  let materials: string[] = [];
  let sections: string[] = [];
  let nodeSets: string[] = [];
  let elementSets: string[] = [];
  let nodeCount = 0;
  let elementCount = 0;
  let steps = 0;
  let partNames: string[] = [];

  const lines = content.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Detect analysis type
    if (line.toLowerCase().includes('*static')) {
      analysisType = 'Static';
    } else if (line.toLowerCase().includes('*dynamic,explicit')) {
      analysisType = 'Dynamic (Explicit)';
    } else if (line.toLowerCase().includes('*dynamic')) {
      analysisType = 'Dynamic (Implicit)';
    } else if (line.toLowerCase().includes('*heat transfer')) {
      analysisType = 'Heat Transfer';
    } else if (line.toLowerCase().includes('*frequency')) {
      analysisType = 'Frequency';
    }
    
    // Extract materials
    if (line.toLowerCase().includes('*material')) {
      const nameMatch = line.match(/NAME\s*=\s*([^\s,]+)/i);
      if (nameMatch) {
        materials.push(nameMatch[1]);
      }
    }
    
    // Extract element types
    if (line.toLowerCase().includes('*element')) {
      const typeMatch = line.match(/TYPE\s*=\s*([^\s,]+)/i);
      if (typeMatch) {
        elementTypes.push(typeMatch[1]);
      }
    }
    
    // Extract node sets
    if (line.toLowerCase().includes('*nset')) {
      const nameMatch = line.match(/NAME\s*=\s*([^\s,]+)/i);
      if (nameMatch) {
        nodeSets.push(nameMatch[1]);
      }
    }
    
    // Extract element sets
    if (line.toLowerCase().includes('*elset')) {
      const nameMatch = line.match(/NAME\s*=\s*([^\s,]+)/i);
      if (nameMatch) {
        elementSets.push(nameMatch[1]);
      }
    }
    
    // Count steps
    if (line.toLowerCase().includes('*step')) {
      steps++;
    }
    
    // Count nodes
    if (line.toLowerCase().includes('*node')) {
      let count = 0;
      for (let j = i + 1; j < lines.length; j++) {
        const dataLine = lines[j].trim();
        if (dataLine.startsWith('*') || dataLine === '') break;
        if (dataLine.match(/^\d+[,;]/)) count++;
      }
      nodeCount += count;
    }
    
    // Count elements
    if (line.toLowerCase().includes('*element')) {
      let count = 0;
      for (let j = i + 1; j < lines.length; j++) {
        const dataLine = lines[j].trim();
        if (dataLine.startsWith('*') || dataLine === '') break;
        if (dataLine.match(/^\d+[,;]/)) count++;
      }
      elementCount += count;
    }
  }

  // Return complete object matching AbaqusSummary type
  return {
    modelName,
    analysisType,
    elementTypes: [...new Set(elementTypes)], // Remove duplicates
    materials: [...new Set(materials)],       // Remove duplicates
    sections,
    nodeSets,
    elementSets,
    nodeCount,
    elementCount,
    steps,
    partNames,
  };
}