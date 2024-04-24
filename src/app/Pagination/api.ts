// api.ts
import {Product} from "./type"
export async function fetchProducts(currentPage: number): Promise<Product[]> {
    const skip = (currentPage - 1) * 10;
    const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${skip}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data.products;
  }
  