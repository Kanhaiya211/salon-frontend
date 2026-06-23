import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function Home() {
  const [salons, setSalons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSalons();
  }, []);

  const fetchSalons = async () => {
    try {
      const response = await axios.get("https://salon-backend-vmzr.onrender.com/api/salons");
      setSalons(response.data.slice(0, 6));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white pt-16">
        {/* Subtle gradient orbs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -right-40 w-[640px] h-[640px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(147,51,234,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-40 -left-32 w-[480px] h-[480px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 flex flex-col md:flex-row items-center gap-16">
          {/* Left – copy */}
          <div className="flex-1 text-center md:text-left">
            {/* Eyebrow */}
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-purple-600 uppercase tracking-widest mb-6 bg-purple-50 px-4 py-1.5 rounded-full border border-purple-100">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
              Instant Booking · No Calls Needed
            </span>

            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
              Your next great{" "}
              <span className="text-purple-600">haircut</span>{" "}
              is one tap away
            </h1>

            <p className="mt-6 text-lg text-gray-500 max-w-xl leading-relaxed">
              Browse top-rated salons nearby, choose your service, and lock in a
              time that works for you — no phone tag required.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/salons"
                className="px-8 py-3.5 bg-purple-600 text-white font-semibold rounded-xl text-base hover:bg-purple-700 active:scale-95 transition-all shadow-md shadow-purple-200"
              >
                Explore Salons
              </Link>
              <Link
                to="/signup"
                className="px-8 py-3.5 text-purple-700 font-semibold rounded-xl text-base border border-purple-200 bg-white hover:bg-purple-50 active:scale-95 transition-all"
              >
                List your salon →
              </Link>
            </div>

            {/* Social proof */}
            <div className="mt-10 flex items-center gap-6 justify-center md:justify-start">
              <div className="flex -space-x-2">
                {["8B5CF6", "7C3AED", "A855F7", "9333EA"].map((c, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                    style={{ background: `#${c}` }}
                  >
                    {["A", "M", "R", "S"][i]}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-800">2,400+</span>{" "}
                happy customers this month
              </p>
            </div>
          </div>

          {/* Right – visual card stack */}
          <div className="flex-1 flex justify-center md:justify-end">
            <div className="relative w-72 h-80 select-none">
              {/* Back card */}
              <div className="absolute top-4 right-0 w-64 h-72 rounded-3xl bg-purple-100 rotate-6 shadow-sm" />
              {/* Front card */}
              <div className="absolute inset-0 w-64 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&auto=format&fit=crop"
                  alt="Modern salon interior"
                  className="w-full h-44 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-gray-900 text-sm">Luxe Studio</span>
                    <span className="text-xs bg-green-50 text-green-600 font-semibold px-2 py-0.5 rounded-full">
                      Open
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-3">Mumbai, Bandra West</p>
                  <div className="flex items-center gap-1 mb-3">
                    {[1,2,3,4,5].map(s => (
                      <svg key={s} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-xs text-gray-400 ml-1">4.9 · 128 reviews</span>
                  </div>
                  <button className="w-full bg-purple-600 text-white text-xs font-semibold py-2 rounded-lg hover:bg-purple-700 transition">
                    Book appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="border-t border-gray-100 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-3 gap-6 text-center">
            {[
              { value: "500+", label: "Salons listed" },
              { value: "12k+", label: "Appointments booked" },
              { value: "4.8★", label: "Average rating" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-extrabold text-purple-600">{s.value}</p>
                <p className="text-sm text-gray-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED SALONS ──────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-xs font-semibold text-purple-600 uppercase tracking-widest mb-2">
              Hand-picked
            </p>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Featured Salons
            </h2>
          </div>
          <Link
            to="/salons"
            className="text-purple-600 font-semibold text-sm hover:underline hidden sm:block"
          >
            View all →
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse">
                <div className="w-full h-52 bg-gray-200" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-2/3" />
                  <div className="h-4 bg-gray-100 rounded w-1/3" />
                  <div className="h-4 bg-gray-100 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : salons.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No salons available yet.</p>
            <Link to="/signup" className="mt-4 inline-block text-purple-600 font-semibold hover:underline">
              List the first salon →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {salons.map((salon) => (
              <Link
                to={`/salons/${salon.id}`}
                key={salon.id}
                className="group bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100"
              >
                <div className="overflow-hidden h-52">
                  <img
                    src={
                      salon.image ||
                      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=600&auto=format&fit=crop"
                    }
                    alt={salon.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 leading-snug">
                    {salon.name}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {salon.city}
                  </p>
                  {salon.description && (
                    <p className="text-sm text-gray-500 mt-3 line-clamp-2 leading-relaxed">
                      {salon.description}
                    </p>
                  )}
                  <p className="mt-4 text-xs font-semibold text-purple-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Book now →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-10 text-center sm:hidden">
          <Link to="/salons" className="text-purple-600 font-semibold hover:underline">
            View all salons →
          </Link>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}

export default Home;
