import React, { useEffect } from "react";
import { useProductStore } from "../store/useProductStore";
import { PackageIcon, PlusCircleIcon, RefreshCwIcon } from "lucide-react";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { products, fetchProducts, error, loading } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  console.log(products);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <button className="btn btn-primary">
          <PlusCircleIcon className="size-5 mr-2" />
          Add Product
        </button>
        <button className="btn btn-ghost btn-circle" onClick={fetchProducts}>
          <RefreshCwIcon className="size-5" />
        </button>
      </div>
      {error && <div className="alert alert-error mb-8">{error}</div>}

      {products.length === 0 && !loading && (
        <div className="flex flex-col justify-self-center items-center h-96 space-y-4">
          <div className="bg-base-100 rounded-full p-6">
            <PackageIcon className="size-12" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-semibold">No products found</h3>
            <p className="text-gray-500 max-w-sm">
              Get started by adding your first product to the inventory
            </p>
          </div>
        </div>
      )}
      {loading ? (
        <div className="FLEX justify-center items-center h-64">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
};

export default HomePage;
