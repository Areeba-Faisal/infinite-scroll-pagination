'use client'

import React, { useState, useEffect } from 'react';
import ProductList, { Product } from "./Products/products"
import Pagination from "./Pagination/pagination";


const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | unknown>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const skip = (currentPage - 1) * 10;
        const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${skip}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (error: unknown) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error as string}</p>
      ) : (
        <div>
          <h1 className="text-2xl font-bold mb-">Products</h1>
          <ProductList products={products} />
          <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
        </div>
      )}
    </main>
  );
};

export default Home;
