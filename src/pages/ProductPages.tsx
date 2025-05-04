
import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import ProductPage from '@/components/ProductPage';
import { getAllProducts } from '@/utils/jsonDb';

const ProductPages: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [productData, setProductData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    console.log("Attempting to load product with slug:", slug);
    
    const fetchProduct = async () => {
      try {
        // Get products from localStorage (which includes any stock updates)
        const products = await getAllProducts();
        
        if (!slug || !products[slug]) {
          console.error(`Product not found for slug: ${slug}`);
          setError(true);
          setLoading(false);
          return;
        }
        
        // Make sure we're using just the main image, not the gallery
        const product = products[slug];
        setProductData(product);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(true);
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [slug]);
  
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading product...</div>;
  }
  
  if (error || !productData) {
    return <Navigate to="/404" replace />;
  }
  
  return <ProductPage product={productData} />;
};

export default ProductPages;
