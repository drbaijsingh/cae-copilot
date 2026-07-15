export default function Navbar() {
  return (
    <nav className="w-full bg-slate-800 text-white px-8 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">
        CAE Copilot
      </h1>

      <div className="flex gap-6">
        <a href="#">Features</a>
        <a href="#">About</a>
        <a href="#">Login</a>
      </div>
    </nav>
  );
}