import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { siteData } from '../config/siteData';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Works', path: '/works' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <header style={styles.header}>
        <div className="container" style={styles.navContainer}>
          <Link to="/" style={styles.logo} onClick={() => setIsOpen(false)}>
            <span style={styles.logoText}>{siteData.studioName}</span>
          </Link>

          {/* Desktop Nav */}
          <nav style={styles.desktopNav} className="desktop-nav">
            <ul style={styles.navList}>
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} style={styles.navLink} className="hover-target">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button style={styles.menuBtn} onClick={toggleMenu} className="hover-target mobile-btn">
            {isOpen ? 'CLOSE' : 'MENU'}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div style={{...styles.mobileMenu, transform: isOpen ? 'translateY(0)' : 'translateY(-100%)'}}>
        <div style={styles.mobileMenuInner}>
          <ul style={styles.mobileNavList}>
            {navLinks.map((link, index) => (
              <li key={link.name} style={{ overflow: 'hidden' }}>
                <div style={{ 
                  transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
                  transition: `transform 0.5s cubic-bezier(0.19, 1, 0.22, 1) ${0.2 + index * 0.1}s`
                }}>
                  <Link to={link.path} style={styles.mobileNavLink} onClick={() => setIsOpen(false)}>
                    {link.name}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
          
          <div style={styles.mobileMenuFooter}>
            <p style={{marginBottom: '0.5rem'}}>{siteData.email}</p>
            <p>{siteData.phone}</p>
          </div>
        </div>
      </div>

      <style>{`
        .desktop-nav { display: none; }
        @media (min-width: 768px) {
          .desktop-nav { display: block; }
          .mobile-btn { display: none !important; }
        }
      `}</style>
    </>
  );
};

const styles: Record<string, React.CSSProperties> = {
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    padding: '1.5rem 0',
    zIndex: 100,
    mixBlendMode: 'difference',
    color: '#fff',
  },
  navContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '1.25rem',
    fontWeight: 900,
    letterSpacing: '-0.02em',
  },
  logoText: {
    display: 'inline-block',
  },
  desktopNav: {},
  navList: {
    display: 'flex',
    gap: '2rem',
  },
  navLink: {
    fontSize: '0.875rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  menuBtn: {
    background: 'none',
    border: 'none',
    color: 'inherit',
    fontSize: '0.875rem',
    fontWeight: 700,
    cursor: 'pointer',
    zIndex: 101,
  },
  mobileMenu: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    backgroundColor: 'var(--color-inverse-bg)',
    color: 'var(--color-inverse-text)',
    zIndex: 99,
    transition: 'transform 0.6s cubic-bezier(0.85, 0, 0.15, 1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '2rem',
  },
  mobileMenuInner: {
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
  },
  mobileNavList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '4rem',
  },
  mobileNavLink: {
    fontSize: '3rem',
    fontWeight: 900,
    textTransform: 'uppercase',
    display: 'block',
  },
  mobileMenuFooter: {
    fontSize: '0.875rem',
    fontWeight: 500,
    opacity: 0.7,
  }
};

export default Navbar;
