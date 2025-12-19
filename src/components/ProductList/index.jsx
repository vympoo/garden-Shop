import { useSelector } from 'react-redux';
import ProductCard from '../ProductCard';

const ProductList = () => {
  const { products } = useSelector(state => state.products);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;