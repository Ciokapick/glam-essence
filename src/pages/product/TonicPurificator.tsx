
import React from 'react';
import ProductPage from '@/components/ProductPage';
import { products } from '@/data/products';

const TonicPurificator = () => {
  return <ProductPage product={products["tonic-purificator"]} />;
};

export default TonicPurificator;
