export default function Hero() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <span className="rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-red-400">
        Personal Safety Platform
      </span>

      <h1 className="mt-8 text-7xl font-black text-red-600">
        SilentSOS
      </h1>

      <p className="mt-6 text-2xl text-slate-300">
        One Tap. Zero Noise. Maximum Safety.
      </p>

      <p className="mt-4 max-w-3xl text-slate-400">
        Instantly alert trusted contacts and share your live location during emergencies when speaking isn't possible.
      </p>

      <div className="mt-10 flex gap-4">
        <button className="rounded-xl bg-red-600 px-8 py-4 hover:bg-red-700">
          Get Started
        </button>

        <button className="rounded-xl border border-slate-700 px-8 py-4 hover:bg-slate-800">
          Learn More
        </button>
      </div>
    </section>
  );
}