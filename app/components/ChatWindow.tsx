interface ChatWindowProps {
  reply: string;
}

export default function ChatWindow({ reply }: ChatWindowProps) {
  if (!reply) return null;

  return (
    <div className="mt-8 rounded-xl bg-slate-900 p-6 text-white whitespace-pre-wrap shadow-lg">
      <h2 className="mb-3 text-lg font-semibold text-blue-400">
        🤖 CAE Copilot
      </h2>

      <div>{reply}</div>
    </div>
  );
}