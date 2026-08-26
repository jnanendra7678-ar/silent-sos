import {
  ShieldAlert,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative border-t border-slate-800 bg-slate-950/80 backdrop-blur-xl">

      {/* Top Glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-red-600 p-2">
              <ShieldAlert className="text-white" size={24} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">
                SilentSOS
              </h2>

              <p className="text-sm text-slate-400">
                Emergency Platform
              </p>
            </div>
          </div>

          <p className="mt-6 leading-7 text-slate-400">
            SilentSOS helps people quickly notify trusted contacts
            and share their live location during emergencies.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-5 text-lg font-semibold text-white">
            Quick Links
          </h3>

          <ul className="space-y-3 text-slate-400">
            <li>
              <a href="#features" className="hover:text-red-500">
                Features
              </a>
            </li>

            <li>
              <a href="#how-it-works" className="hover:text-red-500">
                How It Works
              </a>
            </li>

            <li>
              <a href="#statistics" className="hover:text-red-500">
                Statistics
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="mb-5 text-lg font-semibold text-white">
            Legal
          </h3>

          <ul className="space-y-3 text-slate-400">
            <li>
              <a href="#" className="hover:text-red-500">
                Privacy Policy
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-red-500">
                Terms of Service
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-red-500">
                Support
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-5 text-lg font-semibold text-white">
            Contact
          </h3>

          <div className="space-y-4 text-slate-400">

            <div className="flex items-center gap-3">
              <Mail size={18} className="text-red-500" />
              support@silentsos.com
            </div>

            <div className="flex items-center gap-3">
              <Phone size={18} className="text-red-500" />
              +91 XXXXX XXXXX
            </div>

            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-red-500" />
              India
            </div>

            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-3 transition hover:border-red-500 hover:text-red-500"
            >
              <FaGithub size={18} />
              GitHub
            </a>

          </div>
        </div>

      </div>

      <div className="border-t border-slate-800 py-6 text-center text-slate-500">
        © 2026 SilentSOS. All Rights Reserved.
      </div>

    </footer>
  );
}