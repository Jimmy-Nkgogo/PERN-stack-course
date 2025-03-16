import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:3000";

export const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,

  formData: {
    name: "",
    price: "",
    image: "",
  },
  setFormData: (formData) => set({ formData }),
  resetForm: () =>
    set({
      formData: {
        name: "",
        price: "",
        image: "",
      },
    }),
  fetchProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/products`);
      set({ products: response.data.data, error: null }); // the first .data is coming from axios
    } catch (error) {
      if (error.status == 429) {
        set({ error: "Rate limit exceeded", products: [] });
      } else {
        set({ error: "Something went wrong", products: [] });
      }
    } finally {
      set({ loading: false });
    }
  },
  deleteProduct: async (id) => {
    set({ loading: true });

    try {
      await axios.delete(`${BASE_URL}/api/products/${id}`);
      set((prev) => ({
        products: prev.products.filter((product) => product.id !== id),
      }));
      toast.success("Product deleted successfully");
    } catch (error) {
      console.log("error in deleteProduct function", error);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },
  addProduct: async (e) => {
    e.preventDefault();
    set({ loading: true });

    try {
      const { formData } = get();
      await axios.post(`${BASE_URL}/api/products`, formData);
      await get().fetchProducts(); // this is updating the UI after adding a new product
      get().resetForm(); // reset our form after adding a new product
      toast.success("Product added successfully");

      //TODO: close the model after creating a new product
    } catch (error) {
      console.log("Error in addProduct function", error);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },
}));
