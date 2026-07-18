import { AbaqusSummary } from "./types";

export function parseAbaqusInput(text: string): AbaqusSummary {
  const lines = text.split(/\r?\n/);

  let modelName = "Unknown Model";
  const elementTypes = new Set<string>();
  const materials = new Set<string>();
  let steps = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.toUpperCase() === "*HEADING") {
      if (i + 1 < lines.length) {
        const heading = lines[i + 1].replace(/\*\*/g, "").trim();

        const match =
          heading.match(/Model name:\s*([^\s]+)/i) ||
          heading.match(/Job name:\s*([^\s]+)/i);

        if (match) {
          modelName = match[1];
        } else {
          modelName = heading;
        }
      }
    }

    if (line.toUpperCase().startsWith("*ELEMENT")) {
      const match = line.match(/TYPE=([^,\s]+)/i);

      if (match) {
        elementTypes.add(match[1]);
      }
    }

    if (line.toUpperCase().startsWith("*MATERIAL")) {
      const match = line.match(/NAME=([^,\s]+)/i);

      if (match) {
        materials.add(match[1]);
      }
    }

    if (line.toUpperCase().startsWith("*STEP")) {
      steps++;
    }
  }

  return {
    modelName,
    elementTypes: [...elementTypes],
    materials: [...materials],
    steps,
  };
}