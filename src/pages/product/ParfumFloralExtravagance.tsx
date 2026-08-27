import React from 'react';
import ProductPage from '@/components/ProductPage';
import { products } from '@/data/products';

/** Kept as a compatibility entry point; the canonical product layout lives in ProductPage. */
const ParfumFloralExtravagance = () => <ProductPage product={products['parfum-floral-extravagance']} />;

export default ParfumFloralExtravagance;
