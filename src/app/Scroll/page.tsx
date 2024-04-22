'use client'
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './index.css';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';

export interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  description: string;
}

const useInfiniteScroll = (callback: () => void) => {
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight
      ) {
        callback();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [callback]);
};

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const limit = 10;
  const apiUrl = `https://dummyjson.com/products`;

  const fetchProducts = async () => {
    setLoading(true);
    const response = await fetch(`${apiUrl}?limit=${limit}&skip=${skip}`);
    const data = await response.json();
    setProducts((prevProducts) => [...prevProducts, ...data?.products]);
    setLoading(false);
  };

  const loadMore = () => {
    setSkip((prevSkip) => prevSkip + limit);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useInfiniteScroll(loadMore);

  useEffect(() => {
    fetchProducts();
  }, [skip]); // Only fetch products when skip changes

  return (
    <div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Infinite Scroll Products</div>
        <ul className="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="/Pagination">Pagination</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
      <br/>

      <div className="container">
        <main>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {products?.map((product: Product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
                <img src={product.images[0]} alt={product.title} className="w-full h-auto mb-4" />
                <div className="text-xl font-semibold">{product.title}</div>
                <div className="text-gray-600"><span className="text-l font-bold">Price:</span> ${product.price}</div>
                <div className="text-gray-600">{product.description}</div>
              </div>
            ))}
          </div>
          {/* {loading && <h4 className="loading">Loading...</h4>} */}
        </main>

        <button className="scroll-to-top" onClick={scrollToTop}>
          <FontAwesomeIcon icon={faAngleUp} /> {/* Use the imported icon directly */}
        </button>
      </div>
    </div>
  );
};

export default Home;
