import { useState } from 'react'
import TourExplorer from './components/TourExplorer.jsx'
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  Compass,
  Mail,
  MapPin,
  Menu,
  Phone,
  Search,
  Send,
  ShieldCheck,
  X,
} from 'lucide-react'

const questions = [
  {
    question: 'Làm thế nào để đăng ký tài khoản?',
    answer: 'Chọn “Tạo tài khoản” ở góc trên, nhập tên, email và mật khẩu. Sau khi xác nhận biểu mẫu, bạn có thể dùng thông tin đó để đăng nhập.',
  },
  {
    question: 'Tôi có thể gửi yêu cầu tư vấn chuyến đi ở đâu?',
    answer: 'Gửi thông tin qua biểu mẫu liên hệ bên dưới. Chọn “Tư vấn chuyến đi” để đội ngũ biết cách hỗ trợ phù hợp nhất.',
  },
  {
    question: 'Bao lâu tôi sẽ nhận được phản hồi?',
    answer: 'Đội ngũ Hành Trình thường phản hồi trong một ngày làm việc. Với yêu cầu gấp, bạn có thể gọi trực tiếp vào số điện thoại của chúng tôi.',
  },
  {
    question: 'Tôi có thể gửi thắc mắc về dịch vụ không?',
    answer: 'Có. Chọn “Thắc mắc khác” trong biểu mẫu, mô tả điều bạn cần biết và để lại email hoặc số điện thoại để chúng tôi liên hệ.',
  },
]

const heroImage = 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=2400&q=90'

function HomePage() {
  const [authMode, setAuthMode] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openQuestion, setOpenQuestion] = useState(0)
  const [notice, setNotice] = useState('')
  const [keyword, setKeyword] = useState('')

  const showNotice = (message) => {
    setNotice(message)
    window.setTimeout(() => setNotice(''), 4000)
  }

  const submitContact = (event) => {
    event.preventDefault()
    event.currentTarget.reset()
    showNotice('Đã nhận được lời nhắn. Hành Trình sẽ sớm liên hệ với bạn.')
  }

  const submitAuth = (event) => {
    event.preventDefault()
    setAuthMode(null)
    showNotice(authMode === 'register' ? 'Tạo tài khoản thành công.' : 'Đăng nhập thành công.')
  }

  const closeMenu = () => setMenuOpen(false)

  // Ô tìm nhanh ở hero: giữ từ khóa và cuộn xuống phần kết quả
  const submitHeroSearch = (event) => {
    event.preventDefault()
    document.getElementById('tours')?.scrollIntoView({ behavior: 'smooth' })
  }

  // Trang chi tiết tour (Story 3) do thành viên khác phụ trách -> tạm hiện thông báo
  const viewTour = (tour) => showNotice(`Trang chi tiết "${tour.name}" đang được phát triển.`)

  return (
    <main className="home-page">
      <header className="home-header">
        <a className="home-brand" href="#home" aria-label="Hành Trình, trang chủ" onClick={closeMenu}>
          <span className="home-brand-mark"><Compass size={20} strokeWidth={1.8} /></span>
          <span>hành trình<span className="brand-dot">.</span></span>
        </a>
        <button className="home-menu-toggle" aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'} onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className={`home-nav ${menuOpen ? 'home-nav-open' : ''}`} aria-label="Điều hướng">
          <a href="#home" onClick={closeMenu}>Trang chủ</a>
          <a href="#tours" onClick={closeMenu}>Hành trình</a>
          <a href="#contact" onClick={closeMenu}>Liên hệ</a>
          <a href="#questions" onClick={closeMenu}>Thắc mắc</a>
          <div className="home-nav-auth">
            <button className="home-login" onClick={() => { setAuthMode('login'); closeMenu() }}>Đăng nhập</button>
            <button className="home-signup" onClick={() => { setAuthMode('register'); closeMenu() }}>Tạo tài khoản <ArrowRight size={15} /></button>
          </div>
        </nav>
      </header>

      <section className="home-hero" id="home" style={{ '--hero-image': `url("${heroImage}")` }}>
        <div className="hero-copy">
          <p className="hero-eyebrow"><span /> MỞ RA MỘT HÀNH TRÌNH MỚI</p>
          <h1>Hành Trình<span className="hero-period">.</span></h1>
          <p className="hero-lead">Đi để thấy thế giới rộng hơn.<br />Về để nhớ những điều giản dị.</p>
          <p className="hero-description">Từ chuyến đi đầu tiên đến những cuộc hẹn còn bỏ ngỏ, chúng tôi ở đây để giúp bạn bắt đầu.</p>
          <form className="hero-search" onSubmit={submitHeroSearch} role="search">
            <Search size={17} />
            <input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Bạn muốn đi đâu? Hạ Long, Hội An, Đà Lạt..." aria-label="Tìm tour theo tên hoặc địa điểm" />
            <button type="submit">Tìm tour</button>
          </form>
          <div className="hero-actions">
            <button className="hero-cta" onClick={() => setAuthMode('register')}>Bắt đầu hành trình <ArrowRight size={17} /></button>
            <a className="hero-secondary" href="#contact">Liên hệ với chúng tôi</a>
          </div>
        </div>
        <div className="hero-caption"><MapPin size={14} /><span>Hà Giang, Việt Nam</span><i /><span>23°18' Bắc</span></div>
        <a className="hero-scroll" href="#contact" aria-label="Cuộn đến phần liên hệ"><span>KHÁM PHÁ THÊM</span><ArrowDown size={16} /></a>
        <span className="hero-index">01 <i /> 03</span>
      </section>

      <TourExplorer keyword={keyword} onKeywordChange={setKeyword} onViewTour={viewTour} />

      <section className="contact-section" id="contact">
        <div className="contact-intro">
          <p className="section-eyebrow">CHÚNG TÔI LUÔN Ở ĐÂY</p>
          <h2>Một lời nhắn,<br />một khởi đầu mới<span>.</span></h2>
          <p className="contact-description">Bạn đang lên kế hoạch, cần tư vấn hay chỉ có một câu hỏi nhỏ? Đội ngũ Hành Trình sẵn lòng lắng nghe.</p>
          <div className="contact-details">
            <a href="mailto:xinchao@hanhtrinh.vn"><span><Mail size={17} /></span><div><small>EMAIL</small><strong>xinchao@hanhtrinh.vn</strong></div></a>
            <a href="tel:+842436880280"><span><Phone size={17} /></span><div><small>ĐIỆN THOẠI</small><strong>+84 24 3688 0280</strong></div></a>
            <div><span><Clock3 size={17} /></span><div><small>GIỜ LÀM VIỆC</small><strong>Thứ 2 – Thứ 6, 8:30 – 17:30</strong></div></div>
          </div>
        </div>

        <form className="contact-form" onSubmit={submitContact}>
          <div className="contact-form-heading"><span>GỬI LỜI NHẮN</span><span>01 / 02</span></div>
          <div className="contact-fields-two">
            <label>Họ và tên<input name="name" autoComplete="name" required placeholder="Tên của bạn" /></label>
            <label>Email<input name="email" type="email" autoComplete="email" required placeholder="email@vidu.vn" /></label>
          </div>
          <label>Bạn cần hỗ trợ về<select name="subject" defaultValue=""><option value="" disabled>Chọn một chủ đề</option><option>Tư vấn chuyến đi</option><option>Tài khoản</option><option>Thắc mắc khác</option></select><ChevronDown className="select-chevron" size={15} /></label>
          <label>Lời nhắn<textarea name="message" required rows="4" placeholder="Chia sẻ đôi điều với chúng tôi..." /></label>
          <div className="contact-submit-row"><span><ShieldCheck size={15} /> Thông tin của bạn được bảo mật</span><button className="contact-submit" type="submit">Gửi lời nhắn <Send size={15} /></button></div>
        </form>
      </section>

      <section className="questions-section" id="questions">
        <div className="questions-heading"><div><p className="section-eyebrow">GIẢI ĐÁP CÙNG HÀNH TRÌNH</p><h2>Bạn đang thắc mắc<span>?</span></h2></div><p>Một vài câu trả lời có thể giúp bạn bắt đầu nhanh hơn.</p></div>
        <div className="questions-list">
          {questions.map((item, index) => (
            <article className={`question-item ${openQuestion === index ? 'question-open' : ''}`} key={item.question}>
              <button aria-expanded={openQuestion === index} onClick={() => setOpenQuestion(openQuestion === index ? -1 : index)}>
                <span className="question-number">0{index + 1}</span><span className="question-title">{item.question}</span><ChevronDown size={18} />
              </button>
              {openQuestion === index && <p className="question-answer">{item.answer}</p>}
            </article>
          ))}
        </div>
        <p className="more-questions">Chưa tìm thấy câu trả lời? <a href="#contact">Gửi thắc mắc cho chúng tôi <ArrowRight size={14} /></a></p>
      </section>

      <footer className="home-footer"><a className="home-brand footer-brand" href="#home"><span className="home-brand-mark"><Compass size={18} /></span><span>hành trình<span className="brand-dot">.</span></span></a><span>Những chuyến đi đẹp bắt đầu từ một lời chào.</span><span>© 2026 Hành Trình</span></footer>

      {notice && <div className="home-notice" role="status"><span><Check size={15} /></span>{notice}<button aria-label="Đóng thông báo" onClick={() => setNotice('')}><X size={15} /></button></div>}
      {authMode && <AuthDialog mode={authMode} setMode={setAuthMode} onSubmit={submitAuth} onClose={() => setAuthMode(null)} />}
    </main>
  )
}

function AuthDialog({ mode, setMode, onSubmit, onClose }) {
  const registering = mode === 'register'
  return (
    <div className="auth-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className="auth-dialog" role="dialog" aria-modal="true" aria-labelledby="auth-title">
        <button className="auth-close" aria-label="Đóng" onClick={onClose}><X size={19} /></button>
        <span className="auth-dialog-mark"><Compass size={21} /></span>
        <p className="section-eyebrow">HÀNH TRÌNH CỦA BẠN</p>
        <h2 id="auth-title">{registering ? 'Bắt đầu từ đây.' : 'Rất vui được gặp lại.'}</h2>
        <p className="auth-description">{registering ? 'Tạo tài khoản để những chuyến đi luôn trong tầm tay.' : 'Đăng nhập để tiếp tục hành trình của bạn.'}</p>
        <form className="auth-form" onSubmit={onSubmit}>
          {registering && <label>Họ và tên<input autoComplete="name" required placeholder="Tên của bạn" /></label>}
          <label>Email<input type="email" autoComplete="email" required placeholder="email@vidu.vn" /></label>
          <label>Mật khẩu<input type="password" autoComplete={registering ? 'new-password' : 'current-password'} minLength="6" required placeholder="Ít nhất 6 ký tự" /></label>
          {registering && <label className="auth-terms"><input type="checkbox" required /> Tôi đồng ý với điều khoản sử dụng</label>}
          <button type="submit">{registering ? 'Tạo tài khoản' : 'Đăng nhập'} <ArrowRight size={16} /></button>
        </form>
        <p className="auth-switch">{registering ? 'Đã có tài khoản?' : 'Chưa có tài khoản?'} <button onClick={() => setMode(registering ? 'login' : 'register')}>{registering ? 'Đăng nhập' : 'Đăng ký ngay'}</button></p>
        <p className="auth-footnote"><ShieldCheck size={14} /> Thông tin của bạn luôn được bảo mật</p>
      </section>
    </div>
  )
}

export default HomePage