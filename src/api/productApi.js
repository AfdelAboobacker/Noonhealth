
import axiosInstance from "./axiosInstance";

// Get all products
export const getProducts = async () => {
  const response = await axiosInstance.get("/products");
  return response.data;
};

// Get new arrivals
export const getNewArrivals = async () => {
  const response = await axiosInstance.get(
    "/products?category=newarrival"
  );
  return response.data;
};

// Get recent products
export const getRecentProducts = async () => {
  const response = await axiosInstance.get(
    "/products?category=recent"
  );
  return response.data;
};

// Get single product
export const getProductById = async (id) => {
  const response = await axiosInstance.get(`/products/${id}`);
  return response.data;
};
