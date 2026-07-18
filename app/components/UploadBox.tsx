"use client";

interface UploadBoxProps {
  onFileSelect: (file: File | null) => void;
}

export default function UploadBox({ onFileSelect }: UploadBoxProps) {
  return (
    <div className="mt-6 rounded-xl border-2 border-dashed border-blue-500 p-6 text-center">

      <h3 className="mb-2 text-lg font-semibold">
        📂 Upload Abaqus Input File
      </h3>

      <p className="mb-4 text-sm text-gray-500">
        Supported format: .inp
      </p>

      <input
        type="file"
        accept=".inp"
        onChange={(e) =>
          onFileSelect(e.target.files?.[0] || null)
        }
      />

    </div>
  );
}