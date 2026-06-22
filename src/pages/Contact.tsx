import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { siteData } from '../config/siteData';

const Contact = () => {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-anim', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out'
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="page-enter-active" style={styles.page}>
      <div className="container" style={{ paddingTop: '150px', paddingBottom: '100px' }}>
        <h1 className="text-jumbo fw-black contact-anim" style={{ marginBottom: '4rem', textTransform: 'uppercase' }}>
          CONTACT
        </h1>

        <div style={styles.grid}>
          <div style={styles.left} className="contact-anim">
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>制作のご相談</h2>
            <p style={{ marginBottom: '3rem', opacity: 0.8 }}>
              新規プロジェクトのご相談、協業についてのお問い合わせは、<br/>
              下記のフォームまたはメールにてご連絡ください。<br/>
              通常2営業日以内にご返信いたします。
            </p>

            <div style={styles.infoBlock}>
              <h3 style={styles.infoTitle}>STUDIO INFO</h3>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Email</span>
                <a href={`mailto:${siteData.email}`} className="hover-target">{siteData.email}</a>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Phone</span>
                <a href={`tel:${siteData.phone}`} className="hover-target">{siteData.phone}</a>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Hours</span>
                <span>{siteData.businessHours}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Address</span>
                <span>{siteData.address}</span>
              </div>
              <div style={{...styles.infoRow, marginTop: '1rem'}}>
                <span style={styles.infoLabel}>Social</span>
                <div style={{display: 'flex', gap: '1rem'}}>
                  <a href={siteData.socials.instagram} target="_blank" rel="noreferrer" className="hover-target">Instagram</a>
                  <a href={siteData.socials.twitter} target="_blank" rel="noreferrer" className="hover-target">X (Twitter)</a>
                </div>
              </div>
            </div>
          </div>

          <div style={styles.right} className="contact-anim">
            <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
              <div style={styles.formGroup}>
                <label style={styles.label}>お問い合わせ種別</label>
                <select style={styles.input}>
                  <option>新規Webサイト制作</option>
                  <option>リブランディング</option>
                  <option>LP制作・キャンペーン</option>
                  <option>その他・協業のご相談</option>
                </select>
              </div>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>貴社名</label>
                  <input type="text" style={styles.input} placeholder="株式会社◯◯" />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>お名前</label>
                  <input type="text" style={styles.input} placeholder="山田 太郎" />
                </div>
              </div>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>メールアドレス</label>
                  <input type="email" style={styles.input} placeholder="hello@example.com" />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>電話番号</label>
                  <input type="tel" style={styles.input} placeholder="03-0000-0000" />
                </div>
              </div>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>ご予算感</label>
                  <select style={styles.input}>
                    <option>未定</option>
                    <option>50万円〜100万円</option>
                    <option>100万円〜300万円</option>
                    <option>300万円以上</option>
                  </select>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>プロジェクト開始時期</label>
                  <select style={styles.input}>
                    <option>なるべく早く</option>
                    <option>1ヶ月以内</option>
                    <option>3ヶ月以内</option>
                    <option>未定</option>
                  </select>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>ご相談内容</label>
                <textarea style={{...styles.input, minHeight: '200px', resize: 'vertical'}} placeholder="プロジェクトの概要、課題、目的などを自由にご記入ください。"></textarea>
              </div>

              <button type="submit" className="btn btn-solid hover-target" style={{width: '100%'}}>
                送信する
              </button>
            </form>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
          .form-row {
            flex-direction: column !important;
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
    gridTemplateColumns: '1fr 1.5fr',
    gap: '6rem',
  },
  left: {
    paddingRight: '2rem',
  },
  right: {
    backgroundColor: '#fff',
    padding: '3rem',
    border: '1px solid var(--color-border)',
  },
  infoBlock: {
    paddingTop: '2rem',
    borderTop: '1px solid var(--color-border)',
  },
  infoTitle: {
    fontSize: '0.875rem',
    fontWeight: 900,
    letterSpacing: '0.1em',
    marginBottom: '1.5rem',
  },
  infoRow: {
    display: 'flex',
    marginBottom: '1rem',
    fontSize: '0.875rem',
  },
  infoLabel: {
    width: '100px',
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  formRow: {
    display: 'flex',
    gap: '2rem',
  },
  formGroup: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: 700,
  },
  input: {
    width: '100%',
    padding: '1rem',
    border: '1px solid var(--color-border)',
    backgroundColor: 'transparent',
    fontFamily: 'inherit',
    fontSize: '1rem',
    outline: 'none',
  }
};

export default Contact;
