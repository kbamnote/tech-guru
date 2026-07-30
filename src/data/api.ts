import type { Product, Category } from './products';

const API = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000';

export async function fetchProducts(category?: string): Promise<Product[]> {
  const url = category ? `${API}/api/products?category=${category}` : `${API}/api/products`;
  const res = await fetch(url);
  const data = await res.json();
  if (!data.success) throw new Error(data.message || 'Failed to fetch products');
  return data.products as Product[];
}

export async function fetchProduct(id: string): Promise<Product> {
  const res = await fetch(`${API}/api/products/${id}`);
  const data = await res.json();
  if (!data.success) throw new Error(data.message || 'Product not found');
  return data.product as Product;
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${API}/api/categories`);
  const data = await res.json();
  if (!data.success) throw new Error(data.message || 'Failed to fetch categories');
  return data.categories as Category[];
}
