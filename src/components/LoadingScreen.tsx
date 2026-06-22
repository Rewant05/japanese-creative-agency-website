import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { siteData } from '../config/siteData';

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoaded(true), 400);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleEnter = () => {
    if (!isLoaded || isEntering) return;
    setIsEntering(true);
  };

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isEntering && (
        <motion.div
          className="loading-container"
          onClick={handleEnter}
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.1,
            filter: 'blur(10px)',
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
          }}
          style={{
            ...styles.container,
            cursor: isLoaded ? 'pointer' : 'wait',
          }}
        >
          {/* Interactive Background Gradient attached to mouse */}
          <motion.div
            animate={{
              x: mousePos.x - 400,
              y: mousePos.y - 400,
            }}
            transition={{ type: 'spring', stiffness: 50, damping: 20, mass: 0.5 }}
            style={styles.glow}
          />

          <div style={styles.content}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={styles.textWrapper}
            >
              <h1 style={styles.text}>
                {siteData.studioName}
              </h1>
              
              <div style={styles.statusContainer}>
                <AnimatePresence mode="wait">
                  {!isLoaded ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      style={styles.loadingStatus}
                    >
                      <div style={styles.progressText}>
                        LOADING {Math.min(progress, 100)}%
                      </div>
                      <div style={styles.progressTrack}>
                        <motion.div 
                          style={styles.progressBar}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.2, ease: "linear" }}
                        />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="enter"
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      transition={{ duration: 0.5, ease: "backOut" }}
                      style={styles.enterButton}
                    >
                      <motion.span
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                      >
                        CLICK ANYWHERE TO ENTER
                      </motion.span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
          
          {/* Noise overlay for cinematic texture */}
          <div style={styles.noise} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    backgroundColor: '#050505',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '800px',
    height: '800px',
    background: 'radial-gradient(circle, rgba(255,51,0,0.08) 0%, rgba(0,0,0,0) 70%)',
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: 0,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    zIndex: 2,
  },
  textWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    fontSize: 'clamp(3rem, 8vw, 6rem)',
    fontWeight: 900,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    margin: 0,
    textShadow: '0 10px 30px rgba(0,0,0,0.5)',
  },
  statusContainer: {
    height: '60px',
    marginTop: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingStatus: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
  },
  progressText: {
    fontSize: '0.875rem',
    fontWeight: 500,
    letterSpacing: '0.2em',
    fontVariantNumeric: 'tabular-nums',
    opacity: 0.7,
  },
  progressTrack: {
    width: '200px',
    height: '1px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    position: 'relative',
    overflow: 'hidden',
  },
  progressBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    backgroundColor: '#ff3300', // using accent color
  },
  enterButton: {
    fontSize: '1rem',
    fontWeight: 700,
    letterSpacing: '0.3em',
    padding: '15px 30px',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '100px',
    color: '#ffffff',
    backgroundColor: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(10px)',
  },
  noise: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0.05,
    pointerEvents: 'none',
    zIndex: 1,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
  }
};

export default LoadingScreen;
