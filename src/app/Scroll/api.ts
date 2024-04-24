import {Product} from "./type";

export async function fetchProducts(skip: number, limit: number): Promise<any> {
    const apiUrl = `https://dummyjson.com/products`;
    const response = await fetch(`${apiUrl}?limit=${limit}&skip=${skip}`);
    const data = await response.json();
    return data;
  }
  