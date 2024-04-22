'use client'
import { useState, useEffect } from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  description: string;
}

export default function Pagination() {
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
      } catch (error:unknown) {
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
    <main>
      <nav className="width-20 flex justify-center w-full py-4 bg-gray-800 text-white">
        <ul className="flex space-x-4">
          <li><a href="#" className="hover:text-gray-300">Home</a></li>
          <li><a href="#" className="hover:text-gray-300">About</a></li>
          <li><a href="/Scroll" className="hover:text-gray-300">Scroll</a></li>
          <li><a href="#" className="hover:text-gray-300">Contact</a></li>
        </ul>
      </nav>
      <div  className="flex min-h-screen flex-col items-center justify-between p-24">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error as string}</p>
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
          <div className="flex justify-center mt-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((page) => (
              <button key={page} onClick={() => handlePageChange(page)} className="mx-2 px-4 py-2 bg-blue-500 text-white rounded-md">
                {page}
              </button>
            ))}
          </div>
        </div>
      )}
      </div>
    </main>
  );
}