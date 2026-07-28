const features = [
  {
    title: "Silent SOS",
    desc: "Trigger emergency alerts with a single tap.",
  },
  {
    title: "Live Location",
    desc: "Continuously share GPS location.",
  },
  {
    title: "Trusted Contacts",
    desc: "Notify family and friends instantly.",
  },
  {
    title: "Alert Tracking",
    desc: "Monitor alert status in real time.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="mx-auto max-w-7xl px-6 py-24"
    >
      <h2 className="mb-12 text-center text-4xl font-bold">
        Features
      </h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
          >
            <h3 className="text-xl font-bold text-red-500">
              {feature.title}
            </h3>

            <p className="mt-4 text-slate-400">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}