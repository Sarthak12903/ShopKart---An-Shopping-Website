import React from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

function Header({ cartCount, view, onViewChange }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-900/80 border-b border-cyan-500/20 shadow-lg shadow-cyan-500/5">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-50"></div>
              <div className="relative text-4xl">🛍️</div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                ShopKart
              </h1>
              <p className="text-xs text-slate-400">Premium Tech Store</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* User Info */}
            <div className="hidden md:block text-right">
              <p className="text-sm text-slate-300 font-medium">{user?.name}</p>
              <p className="text-xs text-slate-500">{user?.email}</p>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={() => onViewChange("products")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                view === "products"
                  ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/50"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              Products
            </button>
            <button
              onClick={() => onViewChange("cart")}
              className={`relative px-4 py-2 rounded-lg font-medium transition-all ${
                view === "cart"
                  ? "bg-purple-500 text-white shadow-lg shadow-purple-500/50"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <span className="flex items-center space-x-2">
                <span>🛒</span>
                <span>Cart</span>
              </span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
