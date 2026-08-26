import { useState } from "react";
import { ShieldAlert, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const links = [
  { name: "Features", href: "#features" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Statistics", href: "#statistics" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-slate-800/50 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-red-600 p-2">
            <ShieldAlert size={24} className="text-white" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-white">
              SilentSOS
            </h1>

            <p className="text-xs text-slate-400">
              Emergency Platform
            </p>
          </div>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-10 md:flex">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-slate-300 transition hover:text-red-500"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop Button */}
        <button
  onClick={() => {
    navigate("/register");
  }}
  className="hidden rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 md:block"
>
  Get Started
</button>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="text-white md:hidden"
        >
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t border-slate-800 bg-slate-950 md:hidden">
          <nav className="flex flex-col gap-5 p-6">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-slate-300 transition hover:text-red-500"
              >
                {link.name}
              </a>
            ))}

            <button
              onClick={() => navigate("/register")}
              className="hidden rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 md:block"
            >
              Get Started
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}