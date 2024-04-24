// ProductCard.js
import React from 'react';
import { Product } from '../../app/Pagination/type';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <img src={product.images[0]} alt={product.title} className="w-full h-auto mb-4" />
      <div className="text-xl font-semibold">{product.title}</div>
      <div className="text-gray-600">${product.price}</div>
      <div className="text-gray-600">{product.description}</div>
    </div>
  );
};

export default ProductCard;
