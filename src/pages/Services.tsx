import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { siteData } from '../config/siteData';

const Services = () => {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.service-block', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="page-enter-active" style={styles.page}>
      <div className="container" style={{ paddingTop: '150px', paddingBottom: '100px' }}>
        <h1 className="text-jumbo fw-black" style={{ marginBottom: '4rem', textTransform: 'uppercase' }}>
          SERVICES
        </h1>
        
        <div style={styles.grid}>
          {siteData.services.map((service, idx) => (
            <div key={service.id} className="service-block" style={{
              ...styles.serviceBlock,
              backgroundColor: idx % 3 === 1 ? 'var(--color-inverse-bg)' : '#fff',
              color: idx % 3 === 1 ? 'var(--color-inverse-text)' : 'inherit',
              border: idx % 3 !== 1 ? '1px solid var(--color-border)' : 'none',
              transform: idx % 2 !== 0 ? 'translateY(50px)' : 'none'
            }}>
              <div style={styles.number}>{(idx + 1).toString().padStart(2, '0')}</div>
              <h2 style={styles.title}>{service.title}</h2>
              <p style={styles.desc}>{service.description}</p>
              
              <div style={styles.details}>
                <div style={styles.detailGroup}>
                  <strong style={styles.detailLabel}>Deliverables:</strong>
                  <ul style={styles.list}>
                    {service.deliverables.map(item => <li key={item} style={styles.listItem}>- {item}</li>)}
                  </ul>
                </div>
                <div style={styles.detailGroup}>
                  <strong style={styles.detailLabel}>For:</strong>
                  <p style={{fontSize: '0.875rem'}}>{service.clientType}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        @media (max-width: 768px) {
          .service-block {
            transform: none !important;
          }
          .services-grid {
            grid-template-columns: 1fr !important;
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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '2rem',
  },
  serviceBlock: {
    padding: '3rem',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
  number: {
    fontSize: '3rem',
    fontWeight: 900,
    opacity: 0.1,
    position: 'absolute',
    top: '1rem',
    right: '1rem',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 900,
    marginBottom: '1rem',
  },
  desc: {
    fontSize: '1rem',
    marginBottom: '2rem',
    opacity: 0.9,
    flex: 1,
  },
  details: {
    borderTop: '1px solid currentColor',
    paddingTop: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    opacity: 0.8,
  },
  detailGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  detailLabel: {
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  },
  list: {
    fontSize: '0.875rem',
  },
  listItem: {
    marginBottom: '0.25rem',
  }
};

export default Services;
