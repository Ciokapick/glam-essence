
import React from 'react';
import ProductPage from '@/components/ProductPage';
import { products } from '@/data/products';

const CremaHidratantaLuxury = () => {
  const product = products["crema-hidratanta-luxury"];
  
  return <ProductPage product={product} />;
};

export default CremaHidratantaLuxury;
