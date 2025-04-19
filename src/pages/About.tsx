
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24">
        <h1 className="text-3xl font-bold mb-6">Despre Noi</h1>
        
        <div className="prose max-w-none">
          <p className="mb-4">
            Bine ați venit la povestea noastră! Suntem un brand de cosmetice premium care se dedică frumuseții și îngrijirii personale prin produse de înaltă calitate.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Misiunea Noastră</h2>
          <p className="mb-4">
            Ne-am propus să oferim produse cosmetice care nu doar că arată bine, ci fac și bine. Misiunea noastră este să îmbinăm știința cu ingredientele naturale pentru a crea formule eficiente și sigure.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Valorile Noastre</h2>
          <ul className="list-disc pl-6 mb-6">
            <li className="mb-2">Calitate fără compromis în fiecare produs</li>
            <li className="mb-2">Transparență și onestitate în tot ceea ce facem</li>
            <li className="mb-2">Respect față de natură și mediul înconjurător</li>
            <li className="mb-2">Inovație constantă și cercetare continuă</li>
            <li className="mb-2">Responsabilitate socială și sustenabilitate</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Povestea Noastră</h2>
          <p className="mb-4">
            Totul a început în anul 2015, când fondatoarea noastră, pasionată de cosmetice și îngrijire personală, a decis să creeze o alternativă la produsele convenționale. Inspirată de tradiții vechi și îmbinându-le cu tehnologii moderne, a creat o linie de produse care a evoluat în ceea ce este astăzi brandul nostru.
          </p>
          
          <p className="mb-4">
            De-a lungul anilor, ne-am extins gama de produse, dar am rămas fideli valorilor noastre inițiale: ingrediente de calitate, formule eficiente și un impact pozitiv asupra clienților noștri și a mediului.
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
