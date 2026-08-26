import { Shield, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  function handleLearnMore() {
    document
      .getElementById("features")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-transparent px-6">

      {/* Soft Dark Overlay */}
      <div className="absolute inset-0 z-10 bg-slate-950/20"></div>

      {/* Red Glow */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/10 blur-[170px]" />
      </div>

      {/* Grid */}
      <div
        className="absolute inset-0 z-20 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(30,41,59,.25) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(30,41,59,.25) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Hero Content */}
      <div className="relative z-30 mx-auto max-w-6xl text-center">

        <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-5 py-2 text-red-400 backdrop-blur-md">
          <Shield size={18} />
          Personal Safety Platform
        </div>

        <h1 className="mt-8 text-6xl font-black tracking-tight text-white md:text-8xl">
          Stay Safe.
          <br />
          <span className="text-red-500">Stay Silent.</span>
        </h1>

        <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-400 md:text-xl">
          Send silent emergency alerts with one tap, share your live location,
          and notify trusted contacts instantly when every second matters.
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">
          <button
            onClick={() => navigate("/register")}
            className="flex items-center gap-2 rounded-xl bg-red-600 px-8 py-4 font-semibold transition-all duration-300 hover:scale-105 hover:bg-red-700"
          >
            Get Started
            <ArrowRight size={20} />
          </button>

          <button
            onClick={handleLearnMore}
            className="rounded-xl border border-slate-700 px-8 py-4 transition-all duration-300 hover:border-red-500 hover:bg-slate-900"
          >
            Learn More
          </button>
        </div>

      </div>
    </section>
  );
}