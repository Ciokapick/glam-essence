import { ReactNode, useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * A lightweight route veil. Keep this component inside BrowserRouter and wrap
 * the route outlet/Routes with it. The veil is decorative and never traps
 * pointer or keyboard input.
 */
const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const firstRender = useRef(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const [transitionId, setTransitionId] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useLayoutEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsTransitioning(false);
      return;
    }

    window.clearTimeout(timeoutRef.current);
    setTransitionId((id) => id + 1);
    setIsTransitioning(true);
    timeoutRef.current = window.setTimeout(() => setIsTransitioning(false), 920);

    return () => window.clearTimeout(timeoutRef.current);
  }, [location.pathname, location.search]);

  return (
    <div className="page-transition-stage">
      <div
        className={`page-transition-content${isTransitioning ? ' is-transitioning' : ''}`}
      >
        {children}
      </div>

      {isTransitioning && (
        <div
          key={transitionId}
          className="page-transition-veil"
          aria-hidden="true"
        >
          <span className="page-transition-veil__ivory" />
          <span className="page-transition-veil__burgundy" />
          <span className="page-transition-veil__mark">Glam Essence</span>
        </div>
      )}
    </div>
  );
};

export default PageTransition;
