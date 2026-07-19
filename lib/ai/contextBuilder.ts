// lib/ai/contextBuilder.ts

import { EngineeringModel } from '../abaqus/types';

export class ContextBuilder {
  build(model: EngineeringModel | null, userQuery: string): string {
    // If no model is loaded, use a generic context
    if (!model) {
      return this.buildGenericContext(userQuery);
    }

    // Build a detailed system prompt with all model info
    return `
You are CAE Copilot, an expert AI assistant for computational mechanics and finite element analysis.

=== ENGINEERING MODEL CONTEXT ===
File Name: ${model.fileName}
Model Name: ${model.modelName}
Solver: ${model.solver}
Analysis Type: ${model.analysisType}
Health Score: ${model.healthScore}%

=== MODEL STATISTICS ===
Elements: ${model.elements}
Nodes: ${model.nodes}
Materials: ${model.materials.length} (${model.materials.map(m => m.name).join(', ')})
Steps: ${model.steps.length}
Element Types: ${model.elementTypes.join(', ') || 'Not detected'}
Node Sets: ${model.nodeSets.length}
Element Sets: ${model.elementSets.length}
Boundary Conditions: ${model.boundaryConditions.length}
Loads: ${model.loads.length}

=== MATERIALS ===
${model.materials.map(m => `- ${m.name}: ${JSON.stringify(m.properties)}`).join('\n') || 'No materials detected'}

=== STEPS ===
${model.steps.map(s => `- ${s.name} (Type: ${s.type})`).join('\n') || 'No steps detected'}

=== WARNINGS ===
${model.warnings.length > 0 ? model.warnings.map(w => `- ${w}`).join('\n') : 'None'}

=== USER QUESTION ===
${userQuery}

=== INSTRUCTIONS ===
1. Answer the user's question directly based on the model information above.
2. If the user asks about the model (e.g., "how many elements"), use the exact numbers from the context.
3. Provide clear, concise, and professional engineering responses.
4. If the user asks about convergence, material modeling, or analysis setup, provide expert guidance.
5. If the user asks about something not in the context, say so and suggest what they can ask.
`;
  }

  private buildGenericContext(userQuery: string): string {
    return `
You are CAE Copilot, an expert AI assistant for computational mechanics and finite element analysis.

No model has been uploaded yet. The user is asking a general question.

=== USER QUESTION ===
${userQuery}

=== INSTRUCTIONS ===
1. Provide a professional, detailed engineering response based on your knowledge of FEA.
2. If the user asks about specific software (ABAQUS, ANSYS, LS-DYNA), provide accurate technical guidance.
3. Suggest that the user upload an .inp file for model-specific analysis.
`;
  }
}

export const contextBuilder = new ContextBuilder();