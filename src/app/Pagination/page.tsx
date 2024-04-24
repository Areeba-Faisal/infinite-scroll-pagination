'use client'

import React, { useState, useEffect } from 'react';
import './index.css';
import { Product } from './type';
import ProductCard from '../../Components/Product/product';
import Pagination from '../../Components/pagination/pagination';
import { fetchProducts } from './api'; 

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | unknown>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchProducts(currentPage); // Use the fetchProducts function
        setProducts(data);
      } catch (error: unknown) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = 10; // Total number of pages

  return (
    <main>
      <nav className="width-20 flex justify-between items-center w-full pl-5 pr-5 pt-5 pb-5 bg-gray-800 text-white">
        <div className="pagination-heading">
          <h1 className="text-xl font-semibold">Pagination</h1>
          <p className="text-sm">Page {currentPage} of {totalPages}</p>
        </div>
        <ul className="flex space-x-4">
          <li><a href="/" className="hover:text-gray-300">Home</a></li>
          <li><a href="/Scroll" className="hover:text-gray-300">Scroll</a></li>
        </ul>
      </nav>

      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error as string}</p>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {products.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        )}
      </div>
      <footer className="bg-gray-800 text-white text-center py-4">
        &copy; 2024 Your Company Name. All rights reserved.
      </footer>
    </main>
  );
}
