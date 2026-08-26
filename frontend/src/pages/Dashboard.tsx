import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import {
  api,
  type Contact,
  type Location,
  type SOSAlert,
} from "../services/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [activeSOS, setActiveSOS] = useState<SOSAlert | null>(null);
  const [history, setHistory] = useState<SOSAlert[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [location, setLocation] = useState<Location | null>(null);

  const [loadingSOS, setLoadingSOS] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [showContactForm, setShowContactForm] = useState(false);

  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactRelationship, setContactRelationship] = useState("");

  const locationInterval = useRef<number | null>(null);

  const loadDashboard = useCallback(async () => {
    try {
      setLoadingData(true);

      const [active, previous, contactList, latestLocation] =
        await Promise.all([
          api.getActiveSOS(),
          api.getSOSHistory(),
          api.getContacts(),
          api.getLatestLocation(),
        ]);

      setActiveSOS(active);
      setHistory(previous);
      setContacts(contactList);
      setLocation(latestLocation);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load dashboard"
      );
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();

    return () => {
      if (locationInterval.current !== null) {
        window.clearInterval(locationInterval.current);
      }
    };
  }, [loadDashboard]);

  function getCurrentLocation(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by this browser."));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        resolve,
        reject,
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    });
  }

  async function updateLocation(sosId?: string) {
    try {
      const position = await getCurrentLocation();

      const data = await api.sendLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        sosId,
      });

      setLocation(data);
    } catch (err) {
      console.error("Location update failed:", err);
    }
  }

  async function triggerSOS() {
    if (activeSOS) return;

    setError("");
    setMessage("");
    setLoadingSOS(true);

    try {
      let gps;

      try {
        gps = await getCurrentLocation();
      } catch {
        gps = null;
      }

      const sos = await api.createSOS(
        gps
          ? {
              latitude: gps.coords.latitude,
              longitude: gps.coords.longitude,
              accuracy: gps.coords.accuracy,
              message: "SilentSOS emergency alert",
            }
          : {
              message: "SilentSOS emergency alert",
            }
      );

      setActiveSOS(sos);
      setMessage("SOS activated successfully.");

      if (gps) {
        setLocation({
          latitude: gps.coords.latitude,
          longitude: gps.coords.longitude,
          accuracy: gps.coords.accuracy,
        });
      }

      locationInterval.current = window.setInterval(() => {
        updateLocation(sos.id);
      }, 10000);

      const updatedHistory = await api.getSOSHistory();
      setHistory(updatedHistory);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to activate SOS."
      );
    } finally {
      setLoadingSOS(false);
    }
  }

  async function resolveSOS() {
    if (!activeSOS) return;

    try {
      const resolved = await api.resolveSOS(activeSOS.id);

      setActiveSOS(null);
      setHistory((current) =>
        current.map((item) =>
          item.id === resolved.id ? resolved : item
        )
      );

      setMessage("SOS alert resolved.");

      if (locationInterval.current !== null) {
        window.clearInterval(locationInterval.current);
        locationInterval.current = null;
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to resolve SOS."
      );
    }
  }

  async function addContact() {
    setError("");

    if (!contactName || !contactPhone) {
      setError("Contact name and phone are required.");
      return;
    }

    try {
      const contact = await api.addContact({
        name: contactName,
        phone: contactPhone,
        email: contactEmail,
        relationship: contactRelationship,
      });

      setContacts((current) => [...current, contact]);

      setContactName("");
      setContactPhone("");
      setContactEmail("");
      setContactRelationship("");

      setShowContactForm(false);
      setMessage("Emergency contact added.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to add contact."
      );
    }
  }

  async function deleteContact(id: string) {
    try {
      await api.deleteContact(id);

      setContacts((current) =>
        current.filter((contact) => contact.id !== id)
      );

      setMessage("Emergency contact removed.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to delete contact."
      );
    }
  }

  function handleLogout() {
    logout();
    navigate("/login");
  }

  if (loadingData) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <p className="text-slate-400">Loading SilentSOS...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-6">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <header className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center mb-8">
          <div>
            <p className="text-red-500 font-semibold tracking-wider">
              SILENTSOS
            </p>

            <h1 className="text-3xl font-bold">
              Emergency Dashboard
            </h1>

            <p className="text-slate-400 mt-1">
              Welcome, {user?.name}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="border border-slate-700 hover:border-red-500 px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </header>

        {/* ALERTS */}
        {message && (
          <div className="mb-4 bg-green-950 border border-green-800 text-green-300 rounded-lg p-4">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 bg-red-950 border border-red-800 text-red-300 rounded-lg p-4">
            {error}
          </div>
        )}

        {/* SOS CARD */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mb-6 text-center">
          <p className="text-slate-400 mb-2">
            Emergency assistance
          </p>

          {!activeSOS ? (
            <>
              <h2 className="text-2xl font-bold mb-6">
                Need help?
              </h2>

              <button
                onClick={triggerSOS}
                disabled={loadingSOS}
                className="mx-auto w-52 h-52 rounded-full bg-red-600 hover:bg-red-700 disabled:opacity-50 shadow-[0_0_60px_rgba(239,68,68,0.35)] transition flex flex-col items-center justify-center"
              >
                <span className="text-5xl font-black">
                  SOS
                </span>

                <span className="text-sm mt-2">
                  {loadingSOS
                    ? "ACTIVATING..."
                    : "PRESS TO SEND"}
                </span>
              </button>

              <p className="text-slate-500 text-sm mt-6">
                Sends a silent emergency alert with your location.
              </p>
            </>
          ) : (
            <>
              <div className="inline-flex items-center gap-2 bg-red-950 border border-red-700 text-red-300 px-4 py-2 rounded-full mb-5">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                SOS ACTIVE
              </div>

              <h2 className="text-2xl font-bold mb-2">
                Emergency alert is active
              </h2>

              <p className="text-slate-400 mb-6">
                Your alert has been recorded and location tracking is active.
              </p>

              <button
                onClick={resolveSOS}
                className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-lg font-semibold transition"
              >
                Resolve Emergency
              </button>
            </>
          )}
        </section>

        {/* LOCATION */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">
            📍 Current Location
          </h2>

          {location ? (
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-slate-800 rounded-lg p-4">
                <p className="text-slate-500 text-sm">
                  Latitude
                </p>

                <p className="font-mono mt-1">
                  {location.latitude.toFixed(6)}
                </p>
              </div>

              <div className="bg-slate-800 rounded-lg p-4">
                <p className="text-slate-500 text-sm">
                  Longitude
                </p>

                <p className="font-mono mt-1">
                  {location.longitude.toFixed(6)}
                </p>
              </div>

              <div className="bg-slate-800 rounded-lg p-4">
                <p className="text-slate-500 text-sm">
                  Accuracy
                </p>

                <p className="font-mono mt-1">
                  {location.accuracy
                    ? `${Math.round(location.accuracy)} m`
                    : "N/A"}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-slate-500">
              Location will appear when GPS is available.
            </p>
          )}
        </section>

        {/* CONTACTS */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between gap-3 mb-5">
            <div>
              <h2 className="text-xl font-bold">
                Emergency Contacts
              </h2>

              <p className="text-slate-500 text-sm mt-1">
                Trusted people who can be notified during emergencies.
              </p>
            </div>

            <button
              onClick={() =>
                setShowContactForm((current) => !current)
              }
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
            >
              {showContactForm ? "Cancel" : "+ Add Contact"}
            </button>
          </div>

          {showContactForm && (
            <div className="bg-slate-800 rounded-xl p-5 mb-5">
              <div className="grid sm:grid-cols-2 gap-3">
                <input
                  placeholder="Name"
                  value={contactName}
                  onChange={(e) =>
                    setContactName(e.target.value)
                  }
                  className="bg-slate-900 p-3 rounded-lg border border-slate-700"
                />

                <input
                  placeholder="Phone"
                  value={contactPhone}
                  onChange={(e) =>
                    setContactPhone(e.target.value)
                  }
                  className="bg-slate-900 p-3 rounded-lg border border-slate-700"
                />

                <input
                  placeholder="Email (optional)"
                  value={contactEmail}
                  onChange={(e) =>
                    setContactEmail(e.target.value)
                  }
                  className="bg-slate-900 p-3 rounded-lg border border-slate-700"
                />

                <input
                  placeholder="Relationship"
                  value={contactRelationship}
                  onChange={(e) =>
                    setContactRelationship(e.target.value)
                  }
                  className="bg-slate-900 p-3 rounded-lg border border-slate-700"
                />
              </div>

              <button
                onClick={addContact}
                className="mt-4 bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg font-semibold"
              >
                Save Contact
              </button>
            </div>
          )}

          {contacts.length === 0 ? (
            <p className="text-slate-500">
              No emergency contacts added yet.
            </p>
          ) : (
            <div className="space-y-3">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="bg-slate-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <p className="font-semibold">
                      {contact.name}
                    </p>

                    <p className="text-slate-400 text-sm">
                      {contact.phone}
                    </p>

                    {contact.relationship && (
                      <p className="text-slate-500 text-sm">
                        {contact.relationship}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => deleteContact(contact.id)}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* HISTORY */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-5">
            SOS Alert History
          </h2>

          {history.length === 0 ? (
            <p className="text-slate-500">
              No previous emergency alerts.
            </p>
          ) : (
            <div className="space-y-3">
              {history.map((alert) => (
                <div
                  key={alert.id}
                  className="bg-slate-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <p className="font-semibold">
                      Emergency Alert
                    </p>

                    <p className="text-slate-500 text-sm">
                      {alert.createdAt
                        ? new Date(alert.createdAt).toLocaleString()
                        : "Unknown time"}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      alert.status === "ACTIVE"
                        ? "bg-red-950 text-red-300"
                        : "bg-green-950 text-green-300"
                    }`}
                  >
                    {alert.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        <footer className="text-center text-slate-600 text-sm py-8">
          SilentSOS — Emergency assistance when speaking isn't possible.
        </footer>
      </div>
    </div>
  );
}