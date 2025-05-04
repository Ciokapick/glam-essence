
import { useEffect } from 'react';
import { initializeProductsDb } from '@/utils/jsonDb';

const InitApp = () => {
  useEffect(() => {
    // Initialize our JSON database
    const init = async () => {
      await initializeProductsDb();
    };
    
    init();
  }, []);
  
  return null; // This component doesn't render anything
};

export default InitApp;
