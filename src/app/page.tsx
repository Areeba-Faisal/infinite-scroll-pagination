"use client"

import { useState, useEffect } from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  description: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products?limit=10");
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        // setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          <h1 className="text-2xl font-bold mb-">Products</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((product: Product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
                <img src={product.images[0]} alt={product.title} className="w-full h-auto mb-4" />
                <div className="text-xl font-semibold">{product.title}</div>
                <div className="text-gray-600">${product.price}</div>
                <div className="text-gray-600">{product.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
