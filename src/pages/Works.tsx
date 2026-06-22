import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { siteData } from '../config/siteData';

const Works = () => {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.work-item', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out'
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="page-enter-active" style={styles.page}>
      <div className="container" style={{ paddingTop: '150px', paddingBottom: '100px' }}>
        <h1 className="text-jumbo fw-black" style={{ marginBottom: '4rem', textTransform: 'uppercase' }}>
          WORKS
        </h1>
        
        <div style={styles.gallery}>
          {siteData.works.map((work, idx) => (
            <div key={work.id} className="work-item hover-target" style={{
              ...styles.workItem,
              alignSelf: idx % 2 === 0 ? 'flex-start' : 'flex-end',
              marginTop: idx > 0 && idx % 2 !== 0 ? '-100px' : '0'
            }}>
              <div style={styles.imageContainer}>
                <div style={{...styles.image, backgroundImage: `url(${work.imageUrl})`}} className="work-image" />
                <div style={styles.overlay}>
                  <span style={styles.viewText}>VIEW PROJECT</span>
                </div>
              </div>
              <div style={styles.meta}>
                <span style={styles.number}>{work.id}</span>
                <span style={styles.category}>{work.category}</span>
              </div>
              <h2 style={styles.title}>{work.title}</h2>
              <p style={styles.desc}>{work.description}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .work-item {
          cursor: pointer;
        }
        .work-item:hover .work-image {
          transform: scale(1.05);
        }
        .work-item:hover .view-text {
          opacity: 1;
        }
        @media (max-width: 768px) {
          .work-item {
            width: 100% !important;
            align-self: center !important;
            margin-top: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    backgroundColor: 'var(--color-bg)',
  },
  gallery: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6rem',
  },
  workItem: {
    width: '60%',
    display: 'flex',
    flexDirection: 'column',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: '4/3',
    overflow: 'hidden',
    position: 'relative',
    marginBottom: '1.5rem',
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'transform 0.6s cubic-bezier(0.19, 1, 0.22, 1)',
    filter: 'grayscale(100%)',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(17, 17, 17, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'opacity 0.4s ease',
  },
  viewText: {
    color: '#fff',
    fontWeight: 900,
    letterSpacing: '0.1em',
    border: '1px solid #fff',
    padding: '1rem 2rem',
  },
  meta: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'baseline',
    marginBottom: '0.5rem',
  },
  number: {
    fontSize: '0.875rem',
    fontWeight: 900,
  },
  category: {
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    opacity: 0.7,
  },
  title: {
    fontSize: '2rem',
    fontWeight: 900,
    marginBottom: '1rem',
  },
  desc: {
    fontSize: '1rem',
    opacity: 0.8,
    maxWidth: '500px',
  }
};

export default Works;
