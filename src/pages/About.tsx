import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { siteData } from '../config/siteData';

const About = () => {
  const comp = useRef(null);
  
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.fade-up', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out'
      });
    }, comp);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={comp} className="page-enter-active" style={styles.page}>
      <div className="container" style={{ paddingTop: '150px', paddingBottom: '150px' }}>
        <h1 className="text-jumbo fw-black fade-up" style={{ marginBottom: '6rem', textTransform: 'uppercase', borderBottom: '1px solid var(--color-border)', paddingBottom: '2rem' }}>
          私たちについて
        </h1>
        
        <div className="about-grid" style={styles.grid}>
          <div className="about-left" style={styles.left}>
            <p className="fade-up" style={styles.hugeText}>
              整えるだけではなく、<br />
              引っかかりをつくる。
            </p>
          </div>
          <div className="about-right fade-up" style={styles.right}>
            <h2 style={{fontSize: '2rem', marginBottom: '2rem', fontWeight: 900}}>フィロソフィー</h2>
            <p style={styles.paragraph}>
              私たちは、きれいに整えるだけのデザインを目的にしていません。少し引っかかる余白、視線が止まる文字、記憶に残る動き。その小さな違和感から、ブランドの輪郭をつくります。
            </p>
            <p style={styles.paragraph}>
              {siteData.studioName}は、対比、静寂、リズム、そして心地よい違和感を探求する少数精鋭のクリエイティブスタジオです。
            </p>
            <p style={styles.paragraph}>
              ブランドが本当に伝えたい言葉にならない感情を、視覚と体験に翻訳します。私たちは直接的なコミュニケーションを大切にし、クライアントと同じ熱量でプロジェクトに向き合います。
            </p>

            <div style={styles.infoBlock}>
              <h3 style={styles.infoTitle}>スタジオ情報</h3>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>名前</span>
                <span>{siteData.studioName}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>住所</span>
                <span>{siteData.address}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>連絡先</span>
                <span>{siteData.email} <br/> {siteData.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .about-left, .about-right {
            border: none !important;
            padding: 0 !important;
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
    gridTemplateColumns: '1fr 1fr',
    gap: '4rem',
  },
  left: {
    paddingRight: '2rem',
  },
  right: {
    paddingLeft: '4rem',
    borderLeft: '1px solid var(--color-border)',
    maxWidth: '600px',
  },
  hugeText: {
    fontSize: 'clamp(2.5rem, 5vw, 5rem)',
    fontWeight: 900,
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
  },
  paragraph: {
    fontSize: '1.25rem',
    marginBottom: '2.5rem',
    lineHeight: 1.8,
  },
  infoBlock: {
    marginTop: '4rem',
    paddingTop: '2rem',
    borderTop: '1px solid var(--color-border)',
  },
  infoTitle: {
    fontSize: '1rem',
    fontWeight: 900,
    letterSpacing: '0.1em',
    marginBottom: '1.5rem',
  },
  infoRow: {
    display: 'flex',
    marginBottom: '1.5rem',
    fontSize: '1rem',
  },
  infoLabel: {
    width: '120px',
    fontWeight: 700,
    textTransform: 'uppercase',
  }
};

export default About;
