
import React from 'react';
import { Navigate } from 'react-router-dom';
import { products } from '@/data/products';

// We'll use this component to redirect to the actual product detail page
const ProductPages: React.FC<{ slug: string }> = ({ slug }) => {
  // Validate if the product exists
  if (!products[slug]) {
    return <Navigate to="/404" replace />;
  }
  
  // If the product exists, redirect to the product detail page
  return <Navigate to={`/product/${slug}`} replace />;
};

export default ProductPages;
