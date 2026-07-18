// lib/ai/contextBuilder.ts

import { EngineeringModel } from '../abaqus/types';

export class ContextBuilder {
  build(model: EngineeringModel | null, userQuery: string): string {
    if (!model) {
      return this.buildGenericContext(userQuery);
    }

    const parts = model.parts.map(p => p.name).join(', ');
    const materials = model.materials.map(m => m.name).join(', ');

    return `
You are CAE Copilot, an expert AI assistant for computational mechanics and finite element analysis.

=== ENGINEERING CONTEXT ===
File: ${model.fileName}
Solver: ${model.solver}
Analysis Type: ${model.analysisType}
Model Health Score: ${model.healthScore}/100

=== MODEL STATISTICS ===
Parts: ${model.parts.length} (${parts || 'None detected'})
Materials: ${model.materials.length} (${materials || 'None detected'})
Elements: ${model.elements.toLocaleString()}
Nodes: ${model.nodes.toLocaleString()}
Steps: ${model.steps.length}
Element Types: ${model.elementTypes.join(', ') || 'Unknown'}

=== MODEL WARNINGS ===
${model.warnings.length > 0 ? model.warnings.map(w => `- ${w}`).join('\n') : 'No warnings detected ✅'}

=== BOUNDARY CONDITIONS ===
${model.boundaryConditions.length} boundary conditions defined

=== LOADS ===
${model.loads.length} loads defined

=== USER QUESTION ===
${userQuery}

=== INSTRUCTION ===
Provide a professional, detailed engineering response. If the user asks about their specific model, use the context above. If they ask about convergence, material modeling, or analysis setup, provide expert guidance with practical recommendations. Be concise but thorough.
`;
  }

  private buildGenericContext(userQuery: string): string {
    return `
You are CAE Copilot, an expert AI assistant for computational mechanics and finite element analysis.

=== CONTEXT ===
No model has been uploaded yet. The user is asking a general question.

=== USER QUESTION ===
${userQuery}

=== INSTRUCTION ===
Provide a professional, detailed engineering response based on your knowledge of FEA, computational mechanics, and engineering analysis. If the user asks about specific software (ABAQUS, ANSYS, LS-DYNA), provide accurate technical guidance.
`;
  }
}

export const contextBuilder = new ContextBuilder();