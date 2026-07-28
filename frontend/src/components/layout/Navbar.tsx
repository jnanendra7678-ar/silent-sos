export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <h1 className="text-2xl font-bold text-red-500">
          SilentSOS
        </h1>

        <div className="flex gap-6 text-slate-300">
          <a href="#features" className="hover:text-red-500">
            Features
          </a>

          <a href="#how" className="hover:text-red-500">
            How it Works
          </a>

          <a href="#contact" className="hover:text-red-500">
            Contact
          </a>
        </div>

        <button className="rounded-lg bg-red-600 px-5 py-2 hover:bg-red-700 transition">
          Get Started
        </button>
      </div>
    </nav>
  );
}