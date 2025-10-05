import { useAuth } from "./context/AuthContext.jsx";
import React, { useState, useEffect } from "react";
import Header from "./components/layout/Header";
import Notification from "./components/layout/Notification";
import ProductList from "./components/products/ProductList";
import Cart from "./components/cart/Cart";
import LoadingSpinner from "./components/common/LoadingSpinner";
import { productAPI, cartAPI } from "./services/api";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0, count: 0 });
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("products");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [notification, setNotification] = useState(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
      fetchCart();
    }
  }, [isAuthenticated]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getAll();
      setProducts(response.data);
    } catch (err) {
      showNotification(
        "Failed to fetch products. Check if backend is running.",
        "error"
      );
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCart = async () => {
    try {
      const response = await cartAPI.getCart();
      setCart(response.data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddToCart = async (productId) => {
    try {
      await cartAPI.addItem(productId, 1);
      await fetchCart();
      const product = products.find((p) => p.id === productId);
      showNotification(`${product.name} added to cart`);
    } catch (err) {
      showNotification(
        err.response?.data?.message || "Failed to add item",
        "error"
      );
    }
  };

  const handleUpdateQuantity = async (cartItemId, quantity) => {
    if (quantity < 1) return;
    try {
      await cartAPI.updateItem(cartItemId, quantity);
      await fetchCart();
    } catch (err) {
      showNotification("Failed to update quantity", err);
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    try {
      await cartAPI.removeItem(cartItemId);
      await fetchCart();
      showNotification("Item removed from cart", "error");
    } catch (err) {
      showNotification("Failed to remove item", err);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Notification notification={notification} />

      <Header cartCount={cart.count} view={view} onViewChange={setView} />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {view === "products" ? (
          <ProductList
            products={products}
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            onSearchChange={setSearchTerm}
            onCategoryChange={setSelectedCategory}
            onAddToCart={handleAddToCart}
          />
        ) : (
          <Cart
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onContinueShopping={() => setView("products")}
          />
        )}
      </main>
    </div>
  );
}

export default App;
