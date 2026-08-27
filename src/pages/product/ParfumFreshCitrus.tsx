import React from 'react';
import ProductPage from '@/components/ProductPage';
import { products } from '@/data/products';

/** Kept as a compatibility entry point; the canonical product layout lives in ProductPage. */
const ParfumFreshCitrus = () => <ProductPage product={products['parfum-fresh-citrus']} />;

export default ParfumFreshCitrus;
