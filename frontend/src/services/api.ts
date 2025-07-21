//responsavel por todas as chamadas http

import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
}

export const getProducts = () => api.get<Product[]>('/products');
export const createProduct = (product: Omit<Product, 'id'>) => api.post<Product>('/products', product);
export const deleteProduct = (id: number) => api.delete(`/products/${id}`);
export const updateProduct = (id: number, product: Omit<Product, 'id'>) =>
  api.put<Product>(`/products/${id}`, product);
