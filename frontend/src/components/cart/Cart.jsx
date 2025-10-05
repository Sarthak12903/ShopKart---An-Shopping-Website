import React from "react";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import EmptyState from "../common/EmptyState";

function Cart({ cart, onUpdateQuantity, onRemoveItem, onContinueShopping }) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
        <div className="p-8 border-b border-slate-700 bg-gradient-to-r from-purple-900/20 to-cyan-900/20">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Shopping Cart
          </h2>
          <p className="text-slate-400 mt-2">
            Review your items before checkout
          </p>
        </div>

        {cart.items.length === 0 ? (
          <div className="py-20 px-8">
            <EmptyState
              icon="🛒"
              title="Your cart is empty"
              description="Add some awesome products to get started!"
            >
              <button
                onClick={onContinueShopping}
                className="mt-6 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/80 transition-all hover:scale-105"
              >
                Start Shopping
              </button>
            </EmptyState>
          </div>
        ) : (
          <>
            <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
              {cart.items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemove={onRemoveItem}
                />
              ))}
            </div>

            <CartSummary cart={cart} onContinueShopping={onContinueShopping} />
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
