import { Users, ShieldCheck, BellRing, Timer } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "8,000+",
    label: "Users Protected",
  },
  {
    icon: BellRing,
    value: "15,000+",
    label: "Emergency Alerts Sent",
  },
  {
    icon: Timer,
    value: "<2 sec",
    label: "Average Alert Time",
  },
  {
    icon: ShieldCheck,
    value: "24/7",
    label: "System Availability",
  },
];

export default function Stats() {
  return (
    <section
  id="statistics"
  className="relative bg-transparent py-24"
>
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="text-5xl font-bold text-white">
            Trusted When Every Second Matters
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-slate-400">
            Built for reliability, speed, and peace of mind during emergencies.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:border-red-500 hover:shadow-[0_0_35px_rgba(239,68,68,0.15)]"
              >
                <div className="flex justify-center">
                  <div className="rounded-2xl bg-red-600/10 p-4 text-red-500">
                    <Icon size={36} />
                  </div>
                </div>

                <h3 className="mt-6 text-5xl font-black text-white">
                  {stat.value}
                </h3>

                <p className="mt-4 text-slate-400">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}