import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5100/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ERR_NETWORK") {
      console.error(
        "Network Error: Make sure backend is running on http://localhost:5100"
      );
    }

    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  signup: async (name, email, password) => {
    const response = await api.post("/auth/signup", { name, email, password });
    return response.data;
  },

  login: async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get("/auth/profile");
    return response.data;
  },
};

// Product API calls
export const productAPI = {
  getAll: async () => {
    const response = await api.get("/products");
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  create: async (product) => {
    const response = await api.post("/products", product);
    return response.data;
  },

  update: async (id, product) => {
    const response = await api.put(`/products/${id}`, product);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },
};

// Cart API calls
export const cartAPI = {
  getCart: async () => {
    const response = await api.get("/cart");
    return response.data;
  },

  addItem: async (productId, quantity = 1) => {
    const response = await api.post("/cart", {
      product_id: productId,
      quantity,
    });
    return response.data;
  },

  updateItem: async (id, quantity) => {
    const response = await api.put(`/cart/${id}`, { quantity });
    return response.data;
  },

  removeItem: async (id) => {
    const response = await api.delete(`/cart/${id}`);
    return response.data;
  },

  clearCart: async () => {
    const response = await api.delete("/cart");
    return response.data;
  },
};

export default api;
