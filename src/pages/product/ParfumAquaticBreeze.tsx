import React from 'react';
import ProductPage from '@/components/ProductPage';
import { products } from '@/data/products';

/** Kept as a compatibility entry point; the canonical product layout lives in ProductPage. */
const ParfumAquaticBreeze = () => <ProductPage product={products['parfum-aquatic-breeze']} />;

export default ParfumAquaticBreeze;
