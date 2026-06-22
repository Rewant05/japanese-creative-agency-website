import { Link } from 'react-router-dom';
import { siteData } from '../config/siteData';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div className="marquee-container" style={{ marginBottom: '4rem', padding: '2rem 0' }}>
        <div className="marquee-content">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="marquee-item">{siteData.studioName} — {siteData.tagline} — </span>
          ))}
        </div>
      </div>

      <div className="container">
        <div style={styles.grid}>
          <div style={styles.col}>
            <h2 style={styles.logo}>{siteData.studioName}</h2>
            <p style={styles.address}>{siteData.address}</p>
          </div>
          
          <div style={styles.col}>
            <p style={styles.contactItem}><a href={`mailto:${siteData.email}`} className="hover-target">{siteData.email}</a></p>
            <p style={styles.contactItem}><a href={`tel:${siteData.phone}`} className="hover-target">{siteData.phone}</a></p>
            <p style={styles.contactItem}>{siteData.businessHours}</p>
          </div>
          
          <div style={styles.col}>
            <ul style={styles.linkList}>
              <li><Link to="/about" className="hover-target">About</Link></li>
              <li><Link to="/works" className="hover-target">Works</Link></li>
              <li><Link to="/services" className="hover-target">Services</Link></li>
              <li><Link to="/contact" className="hover-target">Contact</Link></li>
            </ul>
          </div>
          
          <div style={styles.col}>
            <ul style={styles.linkList}>
              <li><a href={siteData.socials.instagram} target="_blank" rel="noreferrer" className="hover-target">Instagram</a></li>
              <li><a href={siteData.socials.twitter} target="_blank" rel="noreferrer" className="hover-target">X / Twitter</a></li>
            </ul>
          </div>
        </div>

        <div style={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} {siteData.studioName} All rights reserved.</p>
          <div style={styles.legal}>
            <Link to="/privacy-policy" className="hover-target">Privacy Policy</Link>
            <Link to="/terms-of-use" className="hover-target">Terms of Use</Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .footer-bottom {
            flex-direction: column !important;
            gap: 1rem !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </footer>
  );
};

const styles: Record<string, React.CSSProperties> = {
  footer: {
    backgroundColor: 'var(--color-inverse-bg)',
    color: 'var(--color-inverse-text)',
    paddingTop: 0,
    paddingBottom: '2rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '4rem',
    marginBottom: '6rem',
  },
  col: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  logo: {
    fontSize: '2rem',
    fontWeight: 900,
    letterSpacing: '-0.02em',
    marginBottom: '1rem',
  },
  address: {
    fontSize: '0.875rem',
    opacity: 0.8,
  },
  contactItem: {
    fontSize: '0.875rem',
    fontWeight: 500,
  },
  linkList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    fontSize: '0.875rem',
    fontWeight: 500,
    textTransform: 'uppercase',
  },
  bottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '2rem',
    borderTop: '1px solid rgba(255,255,255,0.1)',
    fontSize: '0.75rem',
    opacity: 0.6,
  },
  legal: {
    display: 'flex',
    gap: '1.5rem',
  }
};

export default Footer;
