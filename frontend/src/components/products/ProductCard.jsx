import React from "react";

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="group relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-2">
      <div className="relative h-48 bg-gradient-to-br from-cyan-900/20 to-purple-900/20 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 group-hover:scale-110 transition-transform duration-500"></div>
        <span className="relative text-7xl group-hover:scale-110 transition-transform duration-300">
          {product.image_url || "📦"}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors flex-1">
            {product.name}
          </h3>
          {product.category && (
            <span className="text-xs bg-slate-800 text-cyan-400 px-2 py-1 rounded-full border border-cyan-500/30 whitespace-nowrap ml-2">
              {product.category}
            </span>
          )}
        </div>

        {product.description && (
          <p className="text-sm text-slate-400 mb-3 line-clamp-2">
            {product.description}
          </p>
        )}

        <div className="flex items-end justify-between mt-4">
          <div>
            <p className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              ₹{product.price}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {product.stock > 0 ? (
                <span className="text-emerald-400">
                  ✓ {product.stock} available
                </span>
              ) : (
                <span className="text-red-400">✗ Out of stock</span>
              )}
            </p>
          </div>
          <button
            onClick={() => onAddToCart(product.id)}
            disabled={product.stock === 0}
            className={`group/btn px-5 py-2.5 rounded-xl font-bold transition-all duration-300 ${
              product.stock > 0
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/80 hover:scale-105"
                : "bg-slate-800 text-slate-600 cursor-not-allowed"
            }`}
          >
            <span className="flex items-center space-x-1">
              <span>+</span>
              <span>Add</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
