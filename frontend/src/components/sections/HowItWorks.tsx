import {
  UserPlus,
  Smartphone,
  BellRing,
  ShieldCheck,
} from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create Account",
    description:
      "Register and add trusted emergency contacts.",
  },
  {
    icon: Smartphone,
    title: "Trigger SOS",
    description:
      "Press the emergency button whenever you need immediate help.",
  },
  {
    icon: BellRing,
    title: "Contacts Notified",
    description:
      "Your trusted contacts instantly receive your emergency alert and live location.",
  },
  {
    icon: ShieldCheck,
    title: "Stay Protected",
    description:
      "Your location keeps updating until you're safe.",
  },
];

export default function HowItWorks() {
  return (
    <section
  id="how-it-works"
  className="relative bg-transparent py-24"
>
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-white">
            How SilentSOS Works
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-slate-400">
            Four simple steps that could make all the difference in an emergency.
          </p>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="relative rounded-3xl border border-slate-800 bg-slate-950 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-red-500"
              >
                <div className="absolute -top-5 left-8 flex h-10 w-10 items-center justify-center rounded-full bg-red-600 font-bold text-white">
                  {index + 1}
                </div>

                <div className="mt-6 text-red-500">
                  <Icon size={38} />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-white">
                  {step.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}