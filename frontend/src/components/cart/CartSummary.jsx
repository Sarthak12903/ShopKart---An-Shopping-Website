import React from "react";

function CartSummary({ cart, onContinueShopping }) {
  return (
    <div className="p-8 border-t border-slate-700 bg-slate-900/50">
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-slate-400 text-sm">Total Items: {cart.count}</p>
          <p className="text-2xl font-bold text-slate-300">Grand Total</p>
        </div>
        <p className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          ₹{cart.total.toLocaleString()}
        </p>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={onContinueShopping}
          className="flex-1 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all"
        >
          Continue Shopping
        </button>
        <button className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 text-white font-bold rounded-xl shadow-lg shadow-purple-500/50 hover:shadow-purple-500/80 transition-all hover:scale-105">
          Checkout Now
        </button>
      </div>
    </div>
  );
}

export default CartSummary;
