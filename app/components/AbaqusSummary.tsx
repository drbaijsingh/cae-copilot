import { AbaqusSummary as Summary } from "../../lib/types";

interface Props {
  summary: Summary;
}

export default function AbaqusSummary({ summary }: Props) {
  return (
    <div className="mt-6 bg-slate-900 rounded-xl p-6 text-white">

      <h2 className="text-2xl font-bold mb-4">
        📋 Abaqus Model Summary
      </h2>

      <p>
        <strong>Model Name:</strong> {summary.modelName}
      </p>

      <p>
        <strong>Element Types:</strong>{" "}
        {summary.elementTypes.join(", ")}
      </p>

      <p>
        <strong>Materials:</strong>{" "}
        {summary.materials.join(", ")}
      </p>

      <p>
        <strong>Steps:</strong> {summary.steps}
      </p>

    </div>
  );
}