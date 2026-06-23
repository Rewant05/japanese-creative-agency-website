import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { siteData } from '../config/siteData';

const optimizedImageUrl = (url: string, width: number) =>
  url
    .replace('q=80', 'q=45')
    .replace('w=1600', `w=${width}`)
    .replace('auto=format', 'fm=webp');

const DeferredWorkImage = ({ url }: { url: string }) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const image = imageRef.current;
    if (!image || shouldLoad) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setShouldLoad(true);
      observer.disconnect();
    }, { rootMargin: '300px' });

    observer.observe(image);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <img
      ref={imageRef}
      className="work-img"
      src={shouldLoad ? optimizedImageUrl(url, 800) : undefined}
      srcSet={shouldLoad
        ? `${optimizedImageUrl(url, 400)} 400w, ${optimizedImageUrl(url, 600)} 600w, ${optimizedImageUrl(url, 800)} 800w`
        : undefined}
      sizes="(max-width: 768px) 100vw, 70vw"
      alt=""
      width="960"
      height="600"
      decoding="async"
      fetchPriority="low"
      style={styles.workImg}
    />
  );
};

const Home = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    // GSAP is enhancement-only. Loading it after the first paint keeps the
    // hero text (the LCP element) visible and out of the critical JS path.
    const initializeAnimations = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);

      if (cancelled || !mainRef.current) return;

      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
      // Parallax hero shapes on scroll
      gsap.to('.hero-shape', {
        y: (i) => (i === 0 ? -300 : -500),
        rotation: (i) => (i === 0 ? 45 : 90),
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });

      // 2. Marquee Text
      gsap.to('.marquee-inner', {
        xPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: '.marquee-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });

      // 3. Vertical Parallax Works
      const workItems = gsap.utils.toArray<HTMLElement>('.work-parallax-item');
      workItems.forEach((item) => {
        const img = item.querySelector('.work-img');
        const text = item.querySelector('.work-text-block');

        // Image Parallax & Fade (moves slower than scroll, fades in/out)
        gsap.fromTo(img, 
          { yPercent: -15, scale: 1.1, opacity: 0.2 },
          {
            yPercent: 30,
            scale: 1,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1
            }
          }
        );

        // Text block entrance
        gsap.fromTo(text, 
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 75%',
            }
          }
        );
      });

      // 4. Services Parallax Entrance
      gsap.fromTo('.service-anim-block',
        { y: 150, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.services-section',
            start: 'top 80%',
            end: 'center center',
            scrub: 1
          }
        }
      );

      // Background color change on heavy scroll
      gsap.to(mainRef.current, {
        backgroundColor: '#111111',
        color: '#f9f9f9',
        scrollTrigger: {
          trigger: '.services-section',
          start: 'top center',
          end: 'bottom center',
          scrub: 1
        }
      });

      }, mainRef);
    };

    let started = false;
    const interactionEvents: Array<keyof WindowEventMap> = [
      'pointerdown',
      'keydown',
      'wheel',
      'touchstart',
    ];
    const removeInteractionListeners = () => {
      interactionEvents.forEach((eventName) => {
        window.removeEventListener(eventName, startAnimations);
      });
    };
    const startAnimations = () => {
      if (started) return;
      started = true;
      removeInteractionListeners();
      void initializeAnimations();
    };
    interactionEvents.forEach((eventName) => {
      window.addEventListener(eventName, startAnimations, { once: true, passive: true });
    });

    return () => {
      cancelled = true;
      removeInteractionListeners();
      ctx?.revert();
    };
  }, []);

  return (
    <div ref={mainRef} className="page-enter-active" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* 1. HERO SECTION */}
      <section className="hero-section" style={styles.hero}>
        <div className="container" style={{ position: 'relative', height: '100%' }}>
          <div style={styles.heroContent}>
            <div style={{ overflow: 'hidden' }}>
              <h1 className="hero-anim text-jumbo fw-black" style={{ lineHeight: 1, textTransform: 'uppercase' }}>
                見えない
              </h1>
            </div>
            <div style={{ overflow: 'hidden' }}>
              <h1 className="hero-anim text-jumbo fw-black" style={{ lineHeight: 1, textTransform: 'uppercase', paddingLeft: '10vw' }}>
                境界。
              </h1>
            </div>
            <div style={{ overflow: 'hidden', marginTop: '3rem' }}>
              <p className="hero-anim" style={{ fontSize: '1.25rem', maxWidth: '500px', fontWeight: 500, opacity: 0.8 }}>
                {siteData.tagline}<br />
                私たちは、定石を壊し、記憶に焼きつくデジタル体験を創造するクリエイティブスタジオです。
              </p>
            </div>
            <div style={{ overflow: 'hidden', marginTop: '3rem' }}>
              <Link to="/contact" className="hero-anim btn btn-solid hover-target" style={{ display: 'inline-block' }}>
                プロジェクトを始める
              </Link>
            </div>
          </div>
          
          <div className="hero-shape" style={styles.heroShape1}></div>
          <div className="hero-shape" style={styles.heroShape2}></div>
          <div style={styles.scrollDown}>
            スクロール ↓
          </div>
        </div>
      </section>

      {/* 2. MARQUEE STATEMENT */}
      <section className="marquee-section" style={styles.marqueeSection}>
        <div className="marquee-inner" style={styles.marqueeInner}>
          <span style={styles.marqueeText}>見えないものを形に。違和感を楽しむ。 </span>
          <span style={styles.marqueeText}>見えないものを形に。違和感を楽しむ。 </span>
          <span style={styles.marqueeText}>見えないものを形に。違和感を楽しむ。 </span>
        </div>
      </section>

      {/* 3. VERTICAL PARALLAX WORKS */}
      <section className="below-fold" style={styles.worksSection}>
        <div className="container">
          <div style={{ marginBottom: '6rem', overflow: 'hidden' }}>
            <h2 className="text-jumbo fw-black" style={{ textTransform: 'uppercase', borderBottom: '2px solid var(--color-border)', paddingBottom: '1rem' }}>
              実績
            </h2>
          </div>

          <div style={styles.worksList}>
            {siteData.works.slice(0, 4).map((work, index) => (
              <div key={work.id} className="work-parallax-item" style={{
                ...styles.workItem,
                marginLeft: index % 2 === 0 ? '0' : 'auto',
                marginRight: index % 2 === 0 ? 'auto' : '0',
                paddingTop: index !== 0 ? '10rem' : '0'
              }}>
                <div style={styles.workImgWrapper} className="hover-target">
                  <DeferredWorkImage url={work.imageUrl} />
                  <div style={styles.workOverlay}></div>
                </div>
                <div className="work-text-block" style={{
                  ...styles.workTextBlock,
                  left: index % 2 === 0 ? 'auto' : '-10%',
                  right: index % 2 === 0 ? '-10%' : 'auto',
                  alignItems: index % 2 === 0 ? 'flex-start' : 'flex-end',
                  textAlign: index % 2 === 0 ? 'left' : 'right'
                }}>
                  <span style={styles.workNumber}>{work.id}</span>
                  <h3 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem', textTransform: 'uppercase' }}>{work.title}</h3>
                  <p style={{ fontSize: '0.875rem', opacity: 0.7, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{work.category}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '8rem' }}>
            <Link to="/works" className="btn hover-target">すべての実績を見る</Link>
          </div>
        </div>
      </section>

      {/* 4. ASYMMETRIC SERVICES */}
      <section className="services-section below-fold" style={styles.servicesSection}>
        <div className="container">
          <div style={styles.servicesHeader}>
            <h2 className="text-jumbo fw-black service-anim-block" style={{ textTransform: 'uppercase' }}>専門性</h2>
            <p className="service-anim-block" style={{ maxWidth: '400px', fontSize: '1rem', opacity: 0.8 }}>
              ブランドの価値を最大化するための、多角的なクリエイティブアプローチ。
            </p>
          </div>

          <div className="services-grid" style={styles.servicesGrid}>
            <div className="service-anim-block" style={styles.serviceBox1}>
              <h3 style={styles.serviceTitle}>Branding</h3>
              <p style={styles.serviceDesc}>コアバリューの抽出から視覚・言語化まで、ブランドの土台を構築。</p>
            </div>
            <div className="service-anim-block" style={styles.serviceBox2}>
              <h3 style={styles.serviceTitle}>Digital</h3>
              <p style={styles.serviceDesc}>Webサイトやアプリケーションなど、記憶に残るインタラクティブ体験の設計。</p>
            </div>
            <div className="service-anim-block" style={styles.serviceBox3}>
              <h3 style={styles.serviceTitle}>Identity</h3>
              <p style={styles.serviceDesc}>ロゴ、タイポグラフィ、カラーシステムなど、一貫性のある視覚設計。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FOOTER CTA */}
      <section className="below-fold" style={styles.ctaSection}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center' }}>
          <h2 className="text-jumbo fw-black" style={{ color: 'var(--color-inverse-text)', textTransform: 'uppercase', marginBottom: '3rem' }}>
            プロジェクトをお考えですか？
          </h2>
          <Link to="/contact" className="hover-target huge-contact-btn" style={styles.hugeContactBtn}>
            ご相談はこちら
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .work-parallax-item {
            width: 100% !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
            padding-top: 4rem !important;
          }
          .work-text-block {
            left: 0 !important;
            right: 0 !important;
            bottom: -5% !important;
            align-items: flex-start !important;
            text-align: left !important;
          }
          .services-section .container > div {
            display: flex !important;
            flex-direction: column !important;
          }
          .service-anim-block {
            margin-top: 2rem !important;
          }
          .huge-contact-btn {
            font-size: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  hero: {
    height: '100vh',
    minHeight: '800px',
    paddingTop: '150px',
    position: 'relative',
    overflow: 'hidden',
  },
  heroContent: {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
  },
  heroShape1: {
    position: 'absolute',
    top: '20%',
    right: '10%',
    width: '40vw',
    height: '40vw',
    maxWidth: '500px',
    maxHeight: '500px',
    backgroundColor: 'var(--color-inverse-bg)',
    clipPath: 'polygon(0% 0%, 100% 15%, 85% 100%, 15% 85%)',
    zIndex: 1,
  },
  heroShape2: {
    position: 'absolute',
    bottom: '10%',
    right: '25%',
    width: '20vw',
    height: '30vw',
    maxWidth: '250px',
    maxHeight: '400px',
    backgroundColor: 'var(--color-border)',
    opacity: 0.1,
    clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
    zIndex: 0,
  },
  scrollDown: {
    position: 'absolute',
    bottom: '3rem',
    left: '2rem',
    fontSize: '0.75rem',
    fontWeight: 900,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
  },
  marqueeSection: {
    backgroundColor: 'var(--color-inverse-bg)',
    color: 'var(--color-inverse-text)',
    padding: '4rem 0',
    overflow: 'hidden',
    display: 'flex',
    whiteSpace: 'nowrap',
    borderTop: '1px solid var(--color-border)',
    borderBottom: '1px solid var(--color-border)',
  },
  marqueeInner: {
    display: 'flex',
  },
  marqueeText: {
    fontSize: 'clamp(4rem, 8vw, 10rem)',
    fontWeight: 900,
    textTransform: 'uppercase',
    paddingRight: '2rem',
    lineHeight: 1,
  },
  worksSection: {
    padding: '8rem 0',
    backgroundColor: 'var(--color-bg)',
  },
  worksList: {
    display: 'flex',
    flexDirection: 'column',
  },
  workItem: {
    width: '70%',
    position: 'relative',
  },
  workImgWrapper: {
    width: '100%',
    aspectRatio: '16/10',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#000',
  },
  workImg: {
    position: 'absolute',
    top: '-20%',
    left: 0,
    width: '100%',
    height: '140%', // extra height for parallax
    objectFit: 'cover',
    objectPosition: 'center',
    display: 'block',
    filter: 'grayscale(100%)',
    opacity: 0.8,
  },
  workOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'var(--color-inverse-bg)',
    opacity: 0.1,
    pointerEvents: 'none',
  },
  workTextBlock: {
    position: 'absolute',
    bottom: '-10%',
    backgroundColor: 'var(--color-bg)',
    padding: '2rem',
    border: '1px solid var(--color-border)',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 5,
  },
  workNumber: {
    fontSize: '1rem',
    fontWeight: 900,
    marginBottom: '1rem',
    borderBottom: '2px solid var(--color-border)',
    paddingBottom: '0.25rem',
  },
  servicesSection: {
    padding: '8rem 0',
    backgroundColor: '#fff',
    borderTop: '1px solid var(--color-border)',
  },
  servicesHeader: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    marginBottom: '6rem',
  },
  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gap: '2rem',
    position: 'relative',
  },
  serviceBox1: {
    gridColumn: '1 / 6',
    padding: '3rem',
    border: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-bg)',
  },
  serviceBox2: {
    gridColumn: '7 / 13',
    padding: '4rem',
    backgroundColor: 'var(--color-inverse-bg)',
    color: 'var(--color-inverse-text)',
    marginTop: '4rem', // Asymmetric offset
  },
  serviceBox3: {
    gridColumn: '3 / 9',
    padding: '3rem',
    border: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-bg)',
    marginTop: '-2rem',
    zIndex: 2,
  },
  serviceTitle: {
    fontSize: '2rem',
    fontWeight: 900,
    textTransform: 'uppercase',
    marginBottom: '1rem',
  },
  serviceDesc: {
    fontSize: '1rem',
    lineHeight: 1.6,
  },
  ctaSection: {
    height: '60vh',
    minHeight: '500px',
    backgroundColor: 'var(--color-inverse-bg)',
  },
  hugeContactBtn: {
    fontSize: 'clamp(2rem, 5vw, 4rem)',
    fontWeight: 900,
    color: 'var(--color-bg)',
    textDecoration: 'none',
    borderBottom: '4px solid var(--color-accent)',
    paddingBottom: '0.5rem',
    textTransform: 'uppercase',
    transition: 'color 0.3s ease',
  }
};

export default Home;
