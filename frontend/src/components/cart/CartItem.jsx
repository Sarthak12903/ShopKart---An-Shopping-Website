import React from "react";

function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-all">
      <div className="flex items-center space-x-4 flex-1">
        <div className="w-16 h-16 bg-gradient-to-br from-cyan-900/30 to-purple-900/30 rounded-xl flex items-center justify-center text-3xl border border-slate-700">
          {item.image_url || "📦"}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-white">{item.name}</h3>
          <p className="text-sm text-cyan-400 font-semibold">₹{item.price}</p>
          <p className="text-xs text-slate-500">Stock: {item.stock}</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 bg-slate-900 rounded-lg border border-slate-700">
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="p-2 hover:bg-slate-800 rounded-l-lg transition-colors text-cyan-400 disabled:text-slate-600 disabled:cursor-not-allowed"
          >
            <span className="font-bold">−</span>
          </button>
          <span className="font-bold w-10 text-center text-white">
            {item.quantity}
          </span>
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            disabled={item.quantity >= item.stock}
            className="p-2 hover:bg-slate-800 rounded-r-lg transition-colors text-cyan-400 disabled:text-slate-600 disabled:cursor-not-allowed"
          >
            <span className="font-bold">+</span>
          </button>
        </div>

        <p className="font-bold text-xl text-white w-24 text-right">
          ₹{(item.price * item.quantity).toLocaleString()}
        </p>

        <button
          onClick={() => onRemove(item.id)}
          className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-all"
        >
          <span className="text-xl">🗑️</span>
        </button>
      </div>
    </div>
  );
}

export default CartItem;
