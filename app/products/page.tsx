import { ProductsPage } from '@/components/ProductsPage';
import { products } from '../data/products';

export default function Products() {
  return <ProductsPage products={products} />;
}
