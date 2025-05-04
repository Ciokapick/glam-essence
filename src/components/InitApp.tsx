
import { useEffect } from 'react';
import { initDatabase } from '@/utils/jsonDb';

const InitApp = () => {
  useEffect(() => {
    // Initialize the database
    const init = async () => {
      await initDatabase();
    };
    
    init();
  }, []);
  
  return null; // This component doesn't render anything
};

export default InitApp;
