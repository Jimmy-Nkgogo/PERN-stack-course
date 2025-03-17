import React, { useEffect } from "react";
import { useProductStore } from "../store/useProductStore";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";

const ProductPage = () => {
  const {
    currentProduct,
    formData,
    setFormData,
    loading,
    error,
    fetchProduct,
    updateProduct,
    deleteProduct,
  } = useProductStore();
  const navigate = useNavigate()
  const {id } = useParams()
  
  useEffect(() => {
    fetchProduct(id)
  },[fetchProduct,id])
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error">{error}</div>
      </div>
    )
  }

  return (
  <div className="container mx-auto px-4 py-8 max-w-4xl">
    <button className="btn btn-ghost mb-8" onClick={() => navigate("/")}>
      <ArrowLeftIcon className="size-4 mr-2"/>
      Back to Products
    </button>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* PRODUCT IMAGE */}
      <div className="rounded-lg overflow-hidden shadow-lg bg-base-100">
        <img src={currentProduct.image} alt={currentProduct.name} 
          className="size-full object-cover"
        />
      </div>
    </div>
  </div>
  )
};

export default ProductPage;
