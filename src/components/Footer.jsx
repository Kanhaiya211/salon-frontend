import { Link } from "react-router-dom";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white text-sm font-extrabold">
                S
              </span>
              <span className="text-white font-bold text-xl">SalonBook</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs text-gray-400">
              The easiest way to book salon appointments and manage your schedule — for customers and salon owners alike.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="hover:text-purple-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/salons" className="hover:text-purple-400 transition-colors">
                  Browse Salons
                </Link>
              </li>
              <li>
                <Link to="/my-appointments" className="hover:text-purple-400 transition-colors">
                  My Bookings
                </Link>
              </li>
            </ul>
          </div>

          {/* For Owners */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Salon Owners
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/signup" className="hover:text-purple-400 transition-colors">
                  Create Account
                </Link>
              </li>
              <li>
                <Link to="/owner/dashboard" className="hover:text-purple-400 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/owner/my-salons" className="hover:text-purple-400 transition-colors">
                  Manage Salons
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {year} SalonBook. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs">
            <Link to="/login" className="hover:text-purple-400 transition-colors">
              Log in
            </Link>
            <Link to="/signup" className="hover:text-purple-400 transition-colors">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
