import {
  ShieldCheck,
  MapPinned,
  Users,
  BellRing,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Silent SOS",
    description:
      "Trigger emergency alerts instantly with a single tap without drawing attention.",
  },
  {
    icon: MapPinned,
    title: "Live Location",
    description:
      "Continuously share your GPS location with trusted contacts until you're safe.",
  },
  {
    icon: Users,
    title: "Trusted Contacts",
    description:
      "Quickly notify family, friends, or guardians during emergencies.",
  },
  {
    icon: BellRing,
    title: "Instant Alerts",
    description:
      "Emergency notifications are delivered in seconds with real-time updates.",
  },
];

export default function Features() {
  return (
    <section
  id="features"
  className="relative bg-transparent py-24"
>
      <div className="mx-auto max-w-7xl">

        <div className="text-center">
          <h2 className="text-5xl font-bold text-white">
            Everything You Need
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-slate-400">
            Built to provide immediate assistance when every second matters.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-3xl border border-slate-800 bg-slate-900/60 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-red-500"
            >
              <div className="mb-6 inline-flex rounded-2xl bg-red-600/10 p-4 text-red-500">
                <feature.icon size={32} />
              </div>

              <h3 className="text-2xl font-bold text-white">
                {feature.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}