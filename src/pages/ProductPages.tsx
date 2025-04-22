
import React, { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { products } from '@/data/products';
import ProductPage from '@/components/ProductPage';

// We'll use this component as a central handling point for product pages
const ProductPages: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  useEffect(() => {
    console.log("Attempting to load product with slug:", slug);
  }, [slug]);
  
  // Validate if the product exists
  if (!slug || !products[slug]) {
    console.error(`Product not found for slug: ${slug}`);
    return <Navigate to="/404" replace />;
  }
  
  // If the product exists, render the product page with the product details
  return <ProductPage product={products[slug]} />;
};

export default ProductPages;
