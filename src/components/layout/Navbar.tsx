import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, LogOut, LayoutDashboard, GitBranch } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <nav className="sticky top-0 z-40 w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <img className="h-16 object-cover" src="/logo.png" alt="logo" />
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className="text-gray-700 hover:text-brand-500 transition-colors font-medium"
              >
                Home
              </Link>
              <Link
                to="/search"
                className="text-gray-700 hover:text-brand-500 transition-colors font-medium"
              >
                Search
              </Link>
              {isAuthenticated && (
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-brand-500 transition-colors font-medium"
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Desktop auth */}
            <div className="hidden md:flex items-center gap-4">
              {!isAuthenticated ? (
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors font-medium"
                >
                  <GitBranch size={18} />
                  Login
                </Link>
              ) : (
                <div className="relative">
                  {/* User avatar and dropdown */}
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors"
                  >
                    <img
                      src={user?.avatar_url}
                      alt={user?.username}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-gray-700 font-medium text-sm">
                      {user?.username}
                    </span>
                  </button>

                  {/* Dropdown menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <LayoutDashboard size={16} />
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setIsDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors text-left"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-4">
            <Link
              to="/"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/search"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Search
            </Link>
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}

            {/* Mobile auth */}
            <div className="border-t border-gray-200 pt-4">
              {!isAuthenticated ? (
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors font-medium justify-center"
                >
                  <GitBranch size={18} />
                  Login with GitHub
                </Link>
              ) : (
                <>
                  <div className="px-4 py-2 flex items-center gap-2 mb-2">
                    <img
                      src={user?.avatar_url}
                      alt={user?.username}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-gray-700 font-medium">
                      {user?.username}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors justify-center font-medium"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
