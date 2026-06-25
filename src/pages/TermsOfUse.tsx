import { siteData } from '../config/siteData';

const TermsOfUse = () => {
  return (
    <div className="page-enter-active" style={styles.page}>
      <div className="container" style={{ paddingTop: '150px', paddingBottom: '100px', maxWidth: '800px' }}>
        <h1 className="text-jumbo fw-black" style={{ marginBottom: '4rem', textTransform: 'uppercase' }}>
          利用規約
        </h1>
        
        <div style={styles.content}>
          <p style={styles.intro}>
            この利用規約（以下、「本規約」といいます。）は、{siteData.studioName}（以下、「当スタジオ」といいます。）が提供するすべてのサービス及びウェブサイトの利用条件を定めるものです。
          </p>

          <section style={styles.section}>
            <h2 style={styles.heading}>1. サービスの利用条件</h2>
            <p>お客様は、本規約に同意した上で、当スタジオのサービスをご利用いただくものとします。</p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>2. 制作相談について</h2>
            <p>お問い合わせや制作のご相談は無料ですが、具体的なご提案やプロトタイプの作成については、別途契約の締結が必要となる場合があります。</p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>3. 禁止事項</h2>
            <p>お客様は、以下の行為を行ってはなりません。</p>
            <ul style={styles.list}>
              <li>法令または公序良俗に違反する行為</li>
              <li>当スタジオの知的財産権を侵害する行為</li>
              <li>当スタジオのサービス運営を妨害する行為</li>
              <li>その他、当スタジオが不適切と判断する行為</li>
            </ul>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>4. 免責事項</h2>
            <p>当スタジオは、提供するサービスに関して、その完全性、正確性、特定の目的への適合性について保証するものではありません。当スタジオのサービス利用に起因して生じた損害について、当スタジオに故意または重過失がある場合を除き、責任を負いません。</p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>5. 知的財産権</h2>
            <p>当スタジオが制作した成果物（デザイン、プログラム、コンテンツなど）の著作権等の知的財産権は、別段の定めがない限り、当スタジオに帰属します。</p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>6. 制作物の掲載について</h2>
            <p>当スタジオは、制作した成果物を、当スタジオのポートフォリオや実績としてウェブサイト等に掲載できるものとします。ただし、お客様から事前に掲載不可の申し入れがあった場合はこの限りではありません。</p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>7. 準拠法</h2>
            <p>本規約の解釈にあたっては、日本法を準拠法とします。</p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>8. お問い合わせ</h2>
            <p>本規約に関するお問い合わせは、以下の窓口までご連絡ください。</p>
            <div style={styles.contactInfo}>
              <p>{siteData.studioName}</p>
              <p>Email: {siteData.email}</p>
            </div>
          </section>

          <p style={styles.date}>制定日：2024年1月1日</p>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    backgroundColor: 'var(--color-bg)',
  },
  content: {
    fontSize: '1rem',
    lineHeight: 1.8,
  },
  intro: {
    marginBottom: '3rem',
  },
  section: {
    marginBottom: '2.5rem',
  },
  heading: {
    fontSize: '1.25rem',
    fontWeight: 700,
    marginBottom: '1rem',
    paddingBottom: '0.5rem',
    borderBottom: '1px solid var(--color-border)',
  },
  list: {
    listStyleType: 'disc',
    paddingLeft: '1.5rem',
    marginTop: '0.5rem',
  },
  contactInfo: {
    marginTop: '1rem',
    padding: '1rem',
    backgroundColor: '#fff',
    border: '1px solid var(--color-border)',
  },
  date: {
    marginTop: '4rem',
    textAlign: 'right',
    opacity: 0.7,
  }
};

export default TermsOfUse;
