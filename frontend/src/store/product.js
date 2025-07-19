import { create } from "zustand"; // Zustand for state management

export const useProductStore = create((set) => ({ // Zustand store for product management
  products: [], // Initial state for products
  setProducts: (products) => set({ products }), // Function to set products in the store
  createProduct: async (newProduct) => { // Function to create a new product
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all fields." };
    } // Validate that all fields are filled
    const res = await fetch("/api/products", { // API call to create a new product
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    }); // Send the new product data to the server
    const data = await res.json(); // Parse the response from the server
    set((state) => ({ products: [...state.products, data.data] })); // Update the products state with the new product
    return { success: true, message: "Product created successfully" };
  }, // Return success message after creation
  fetchProducts: async () => { // Function to fetch products from the server
    const res = await fetch("/api/products"); // API call to get products
    const data = await res.json(); // Parse the response from the server
    set({ products: data.data }); // Update the products state with the fetched products
  }, // Set the products state with the fetched data
  deleteProduct: async (pid) => { // Function to delete a product by ID
    const res = await fetch(`/api/products/${pid}`, {
      method: "DELETE",
    }); // API call to delete the product
    const data = await res.json(); // Parse the response from the server
    if (!data.success) return { success: false, message: data.message }; // Check if deletion was successful
    // If successful, update the products state to remove the deleted product

    // update the ui immediately, without needing a refresh
    set((state) => ({ // Remove the deleted product from the products state
      products: state.products.filter((product) => product._id !== pid),
    })); // Filter out the deleted product from the products state
    return { success: true, message: data.message };
  },
  updateProduct: async (pid, updatedProduct) => { // Function to update a product by ID
    const res = await fetch(`/api/products/${pid}`, { // API call to update the product
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      }, // Set the content type to JSON
      body: JSON.stringify(updatedProduct), // Send the updated product data to the server
    });
    const data = await res.json(); // Parse the response from the server
    if (!data.success) return { success: false, message: data.message }; // Check if update was successful

    // update the ui immediately, without needing a refresh
    set((state) => ({ // Update the products state with the updated product
      // Replace the product with the updated one
      products: state.products.map((product) =>
        product._id === pid ? data.data : product
      ),
    })); // Map through the products and replace the updated product

    return { success: true, message: data.message };
  },
}));
