import React from "react";

function ProductFilters({
  searchTerm,
  selectedCategory,
  categories,
  onSearchChange,
  onCategoryChange,
}) {
  return (
    <div className="mb-8 space-y-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-6 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl">
          🔍
        </span>
      </div>

      <div className="flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`px-5 py-2 rounded-full font-medium transition-all ${
              selectedCategory === cat
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30"
                : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductFilters;
