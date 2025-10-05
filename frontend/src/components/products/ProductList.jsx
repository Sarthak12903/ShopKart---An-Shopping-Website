import React from "react";
import ProductFilters from "./ProductFilters";
import ProductCard from "./ProductCard";
import EmptyState from "../common/EmptyState";

function ProductList({
  products,
  searchTerm,
  selectedCategory,
  onSearchChange,
  onCategoryChange,
  onAddToCart,
}) {
  const categories = ["all", ...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <ProductFilters
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        categories={categories}
        onSearchChange={onSearchChange}
        onCategoryChange={onCategoryChange}
      />

      {filteredProducts.length === 0 ? (
        <EmptyState
          icon="🔍"
          title="No products found"
          description="Try adjusting your search or filters"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default ProductList;
