
 export interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  description: string;
}

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
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
  );
};

export default ProductList;
