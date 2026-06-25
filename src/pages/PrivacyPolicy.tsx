import { siteData } from '../config/siteData';

const PrivacyPolicy = () => {
  return (
    <div className="page-enter-active" style={styles.page}>
      <div className="container" style={{ paddingTop: '150px', paddingBottom: '100px', maxWidth: '800px' }}>
        <h1 className="text-jumbo fw-black" style={{ marginBottom: '4rem', textTransform: 'uppercase' }}>
          プライバシーポリシー
        </h1>
        
        <div style={styles.content}>
          <p style={styles.intro}>
            {siteData.studioName}（以下、「当スタジオ」といいます。）は、お客様の個人情報の保護を重要視し、以下の通りプライバシーポリシーを定めます。
          </p>

          <section style={styles.section}>
            <h2 style={styles.heading}>1. 個人情報の取得について</h2>
            <p>当スタジオは、お問い合わせフォーム、各種お申し込み、契約締結などの際に、適法かつ公正な手段によって個人情報を取得します。</p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>2. 利用目的</h2>
            <p>取得した個人情報は、以下の目的で利用します。</p>
            <ul style={styles.list}>
              <li>お問い合わせに対する回答・連絡のため</li>
              <li>プロジェクトの進行、サービス提供のため</li>
              <li>ご請求、お支払いに関する手続きのため</li>
              <li>当スタジオのサービスに関するご案内のため</li>
            </ul>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>3. 第三者提供について</h2>
            <p>当スタジオは、法令に基づく場合を除き、お客様の同意を得ることなく、個人情報を第三者に提供することはありません。</p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>4. 安全管理</h2>
            <p>当スタジオは、個人情報の漏洩、紛失、改ざんを防止するため、必要かつ適切な安全管理措置を講じます。</p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>5. Cookieの利用</h2>
            <p>当ウェブサイトでは、サイトの利用状況を把握するためにCookieを使用することがあります。Cookieにより個人を特定する情報は取得いたしません。</p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>6. お問い合わせ窓口</h2>
            <p>個人情報の取り扱いに関するお問い合わせは、以下の窓口までご連絡ください。</p>
            <div style={styles.contactInfo}>
              <p>{siteData.studioName}</p>
              <p>Email: {siteData.email}</p>
              <p>Address: {siteData.address}</p>
            </div>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>7. 改定について</h2>
            <p>当スタジオは、必要に応じて本プライバシーポリシーを改定することがあります。改定された場合は、当ウェブサイトにてお知らせします。</p>
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

export default PrivacyPolicy;
