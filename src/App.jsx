import { useState } from 'react'
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  ClipboardList,
  Compass,
  CreditCard,
  Download,
  FileText,
  Filter,
  LayoutDashboard,
  LifeBuoy,
  LogIn,
  LogOut,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Search,
  Send,
  Settings2,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from 'lucide-react'

const navGroups = [
  {
    label: 'KHÔNG GIAN LÀM VIỆC',
    links: [
      { id: 'overview', label: 'Tổng quan', icon: LayoutDashboard },
      { id: 'tours', label: 'Hành trình', icon: Compass },
      { id: 'bookings', label: 'Đặt chỗ', icon: CalendarDays, badge: '8' },
      { id: 'customers', label: 'Khách hàng', icon: Users },
    ],
  },
  {
    label: 'HỖ TRỢ & QUẢN LÝ',
    links: [
      { id: 'forms', label: 'Biểu mẫu', icon: ClipboardList },
      { id: 'inquiries', label: 'Thắc mắc', icon: MessageCircle, badge: '3' },
      { id: 'projects', label: 'Dự án', icon: FileText },
    ],
  },
]

const initialTours = [
  {
    name: 'Vịnh Hạ Long · 3 ngày 2 đêm',
    place: 'Quảng Ninh, Việt Nam',
    image: 'photo-1528127269322-539801943592',
    bookings: 38,
    capacity: 48,
    price: '3.490.000đ',
    status: 'Đang mở',
    date: '18–20 tháng 10',
  },
  {
    name: 'Phố cổ Hội An · 2 ngày 1 đêm',
    place: 'Quảng Nam, Việt Nam',
    image: 'photo-1531058020387-3be344556be6',
    bookings: 24,
    capacity: 36,
    price: '2.150.000đ',
    status: 'Đang mở',
    date: '22–23 tháng 10',
  },
  {
    name: 'Tà Xùa săn mây · 2 ngày 1 đêm',
    place: 'Sơn La, Việt Nam',
    image: 'photo-1470770841072-f978cf4d019e',
    bookings: 12,
    capacity: 20,
    price: '1.890.000đ',
    status: 'Sắp khởi hành',
    date: '25–26 tháng 10',
  },
]

const bookingsData = [
  { initials: 'NA', name: 'Nguyễn Minh Anh', email: 'minhanh@gmail.com', tour: 'Vịnh Hạ Long · 3N2Đ', guests: '2 khách', date: '09 thg 10, 2026', amount: '6.980.000đ', state: 'Đã xác nhận', tone: 'green' },
  { initials: 'TL', name: 'Trần Gia Linh', email: 'gialinh.tran@gmail.com', tour: 'Phố cổ Hội An · 2N1Đ', guests: '3 khách', date: '09 thg 10, 2026', amount: '6.450.000đ', state: 'Chờ xác nhận', tone: 'orange' },
  { initials: 'PH', name: 'Phạm Đức Huy', email: 'duchuy.pham@gmail.com', tour: 'Tà Xùa săn mây · 2N1Đ', guests: '2 khách', date: '08 thg 10, 2026', amount: '3.780.000đ', state: 'Đã xác nhận', tone: 'green' },
  { initials: 'LH', name: 'Lê Thu Hà', email: 'thuha.le@gmail.com', tour: 'Vịnh Hạ Long · 3N2Đ', guests: '4 khách', date: '08 thg 10, 2026', amount: '13.960.000đ', state: 'Chờ thanh toán', tone: 'blue' },
  { initials: 'VK', name: 'Vũ Hoàng Khánh', email: 'hoangkhanh.vu@gmail.com', tour: 'Phố cổ Hội An · 2N1Đ', guests: '2 khách', date: '07 thg 10, 2026', amount: '4.300.000đ', state: 'Đã xác nhận', tone: 'green' },
]

const inquiriesData = [
  { initials: 'MA', name: 'Minh Anh Nguyễn', subject: 'Tôi muốn đổi ngày khởi hành', tour: 'Vịnh Hạ Long · 18 tháng 10', time: '12 phút trước', tone: 'coral', unread: true },
  { initials: 'GL', name: 'Gia Linh Trần', subject: 'Tour Hội An có bao gồm vé tham quan?', tour: 'Phố cổ Hội An · 22 tháng 10', time: '1 giờ trước', tone: 'blue', unread: true },
  { initials: 'TH', name: 'Thu Hà Lê', subject: 'Xác nhận giúp mình đã nhận thanh toán', tour: 'Vịnh Hạ Long · 18 tháng 10', time: '3 giờ trước', tone: 'green', unread: true },
  { initials: 'DK', name: 'Đức Khánh Phạm', subject: 'Có ưu đãi cho nhóm từ 10 người không?', tour: 'Tà Xùa săn mây · 25 tháng 10', time: 'Hôm qua', tone: 'yellow', unread: false },
]

const imageUrl = (id, width = 640) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`

function App() {
  const [active, setActive] = useState('overview')
  const [mobileNav, setMobileNav] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [authMode, setAuthMode] = useState(null)
  const [modal, setModal] = useState(null)
  const [toast, setToast] = useState('')
  const [query, setQuery] = useState('')
  const [tours, setTours] = useState(initialTours)
  const [formEntries, setFormEntries] = useState([
    { name: 'Đăng ký tư vấn tour', type: 'Liên hệ', replies: 18, updated: 'Hôm nay, 09:42', status: 'Đang hoạt động' },
    { name: 'Đặt chỗ hành trình', type: 'Đặt chỗ', replies: 32, updated: 'Hôm nay, 08:15', status: 'Đang hoạt động' },
    { name: 'Đánh giá sau chuyến đi', type: 'Phản hồi', replies: 9, updated: 'Hôm qua, 16:30', status: 'Bản nháp' },
  ])
  const [bookingStatus, setBookingStatus] = useState(bookingsData)

  const notify = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2800)
  }

  const selectPage = (id) => {
    setActive(id)
    setMobileNav(false)
    setQuery('')
  }

  const createTour = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    setTours((current) => [
      {
        name: data.get('name'),
        place: data.get('place'),
        image: 'photo-1470770841072-f978cf4d019e',
        bookings: 0,
        capacity: Number(data.get('capacity')) || 20,
        price: `${Number(data.get('price') || 0).toLocaleString('vi-VN')}đ`,
        status: 'Đang mở',
        date: data.get('date') || 'Chưa lên lịch',
      },
      ...current,
    ])
    setModal(null)
    selectPage('tours')
    notify('Đã tạo hành trình mới')
  }

  const createForm = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    setFormEntries((current) => [
      { name: data.get('name'), type: data.get('type'), replies: 0, updated: 'Vừa xong', status: 'Đang hoạt động' },
      ...current,
    ])
    setModal(null)
    notify('Biểu mẫu mới đã được tạo')
  }

  const completeAuth = (event) => {
    event.preventDefault()
    setAuthMode(null)
    notify(authMode === 'register' ? 'Tạo tài khoản thành công' : 'Đăng nhập thành công')
  }

  const pageTitles = {
    overview: ['Chào buổi sáng, Linh', 'Đây là những gì đang diễn ra với các hành trình của bạn.'],
    tours: ['Hành trình', 'Tạo nên những chuyến đi đáng nhớ, từ một nơi duy nhất.'],
    bookings: ['Đặt chỗ', 'Theo dõi danh sách khách và trạng thái thanh toán.'],
    customers: ['Khách hàng', 'Những người đã cùng bạn viết nên hành trình.'],
    forms: ['Biểu mẫu', 'Thu thập thông tin và phản hồi từ mọi điểm chạm.'],
    inquiries: ['Thắc mắc', 'Lắng nghe và hỗ trợ khách hàng đúng lúc.'],
    projects: ['Dự án', 'Theo dõi các kế hoạch và mục tiêu kinh doanh du lịch.'],
  }
  const [title, description] = pageTitles[active]

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileNav ? 'sidebar-open' : ''}`}>
        <div className="brand-lockup">
          <div className="brand-mark"><Compass size={19} strokeWidth={2.1} /></div>
          <div className="brand-name">hành trình<span>.</span><small>TRAVEL WORKSPACE</small></div>
          <button className="icon-button sidebar-close" aria-label="Đóng menu" onClick={() => setMobileNav(false)}><X size={18} /></button>
        </div>

        <button className="workspace-switch" onClick={() => notify('Bạn đang ở không gian của Hành Trình Travel')}>
          <div className="workspace-avatar">HT</div>
          <span><strong>Hành Trình Travel</strong><small>Không gian làm việc</small></span>
          <ChevronDown size={15} />
        </button>

        <nav className="side-nav" aria-label="Điều hướng chính">
          {navGroups.map((group) => (
            <div className="nav-group" key={group.label}>
              <p className="nav-heading">{group.label}</p>
              {group.links.map(({ id, label, icon: Icon, badge }) => (
                <button className={`nav-link ${active === id ? 'active' : ''}`} key={id} onClick={() => selectPage(id)}>
                  <Icon size={17} strokeWidth={1.8} />
                  <span>{label}</span>
                  {badge && <span className={`nav-badge ${active === id ? 'active-badge' : ''}`}>{badge}</span>}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="help-card">
            <div className="help-icon"><LifeBuoy size={17} /></div>
            <strong>Cần trợ giúp?</strong>
            <p>Đội ngũ luôn sẵn sàng hỗ trợ bạn.</p>
            <button onClick={() => selectPage('inquiries')}>Trung tâm hỗ trợ <ArrowRight size={14} /></button>
          </div>
          <button className="profile-row" onClick={() => setAccountOpen((open) => !open)}>
            <div className="profile-photo">L</div>
            <span><strong>Ngọc Linh</strong><small>Quản trị viên</small></span>
            <MoreHorizontal size={18} />
          </button>
        </div>
      </aside>

      {mobileNav && <button className="mobile-scrim" aria-label="Đóng menu" onClick={() => setMobileNav(false)} />}

      <main className="main-area">
        <header className="topbar">
          <button className="icon-button mobile-menu" aria-label="Mở menu" onClick={() => setMobileNav(true)}><Menu size={20} /></button>
          <div className="breadcrumbs"><span>Không gian làm việc</span><ChevronRight size={14} /><strong>{navGroups.flatMap((group) => group.links).find((link) => link.id === active)?.label || 'Tổng quan'}</strong></div>
          <div className="topbar-actions">
            <label className="global-search"><Search size={16} /><input aria-label="Tìm kiếm" placeholder="Tìm kiếm..." value={query} onChange={(event) => setQuery(event.target.value)} /><kbd>⌘ K</kbd></label>
            <button className="icon-button notification-button" aria-label="Thông báo" onClick={() => notify('Bạn đã xem các thông báo mới nhất')}><Bell size={18} /><i /></button>
            <button className="top-avatar" aria-label="Tài khoản" onClick={() => setAccountOpen((open) => !open)}>L</button>
            {accountOpen && <div className="account-menu"><strong>Ngọc Linh</strong><span>linh@hanhtrinh.vn</span><button onClick={() => { setAccountOpen(false); setAuthMode('login') }}><LogIn size={15} /> Đăng nhập</button><button onClick={() => { setAccountOpen(false); setAuthMode('register') }}><Users size={15} /> Tạo tài khoản</button><button onClick={() => { setAccountOpen(false); notify('Bạn đã đăng xuất khỏi phiên demo') }}><LogOut size={15} /> Đăng xuất</button></div>}
          </div>
        </header>

        <div className="content-wrap">
          <div className="page-heading">
            <div><p className="eyebrow">THỨ SÁU, 09 THÁNG 10, 2026 <span className="eyebrow-dot">·</span> HÀ NỘI, 28°C</p><h1>{title}<span className="heading-period">.</span></h1><p className="page-description">{description}</p></div>
            <div className="heading-actions">
              <button className="button button-secondary" onClick={() => notify('Báo cáo tháng 10 đã sẵn sàng để xuất')}><Download size={16} /> Xuất báo cáo</button>
              <button className="button button-primary" onClick={() => setModal(active === 'forms' ? 'form' : 'tour')}><Plus size={17} /> {active === 'forms' ? 'Tạo biểu mẫu' : 'Tạo hành trình'}</button>
            </div>
          </div>

          {active === 'overview' && <Overview tours={tours} onPage={selectPage} onCreate={() => setModal('tour')} />}
          {active === 'tours' && <Tours tours={tours} query={query} onCreate={() => setModal('tour')} onNotify={notify} />}
          {active === 'bookings' && <Bookings rows={bookingStatus} query={query} onUpdate={(index) => setBookingStatus((current) => current.map((row, i) => i === index ? { ...row, state: 'Đã xác nhận', tone: 'green' } : row))} />}
          {active === 'customers' && <Customers query={query} />}
          {active === 'forms' && <Forms entries={formEntries} query={query} onCreate={() => setModal('form')} onNotify={notify} />}
          {active === 'inquiries' && <Inquiries query={query} onReply={() => setModal('reply')} />}
          {active === 'projects' && <Projects onNotify={notify} />}
        </div>
      </main>

      {modal && <Modal type={modal} onClose={() => setModal(null)} onTourSubmit={createTour} onFormSubmit={createForm} onReply={() => { setModal(null); notify('Phản hồi đã được gửi đến khách hàng') }} />}
      {authMode && <AuthModal mode={authMode} setMode={setAuthMode} onSubmit={completeAuth} onClose={() => setAuthMode(null)} />}
      {toast && <div className="toast"><span><Check size={15} /></span>{toast}</div>}
    </div>
  )
}

function Overview({ tours, onPage, onCreate }) {
  return (
    <>
      <section className="metric-grid" aria-label="Chỉ số tổng quan">
        <Metric label="TỔNG ĐẶT CHỖ" value="248" change="12,8%" note="so với tháng trước" icon={CalendarDays} tone="mint" direction="up" />
        <Metric label="DOANH THU THÁNG" value="186,4 tr" change="8,2%" note="so với tháng trước" icon={CreditCard} tone="peach" direction="up" />
        <Metric label="KHÁCH HÀNG" value="1.284" change="4,6%" note="so với tháng trước" icon={Users} tone="blue" direction="up" />
        <Metric label="CHỜ XÁC NHẬN" value="08" change="Cần xử lý" note="đặt chỗ mới" icon={CircleHelp} tone="yellow" direction="down" />
      </section>

      <div className="dashboard-grid">
        <section className="panel revenue-panel">
          <div className="panel-heading"><div><p className="section-kicker">HIỆU SUẤT</p><h2>Doanh thu theo tháng</h2></div><button className="select-button" onClick={() => {}}><span>Năm 2026</span><ChevronDown size={15} /></button></div>
          <div className="revenue-summary"><strong>186.420.000đ</strong><span className="positive-label"><ArrowUpRight size={14} /> 8,2%</span><span className="summary-muted">so với tháng trước</span></div>
          <RevenueChart />
          <div className="chart-months"><span>Thg 4</span><span>Thg 5</span><span>Thg 6</span><span>Thg 7</span><span>Thg 8</span><span>Thg 9</span><span>Thg 10</span><span>Thg 11</span></div>
        </section>

        <section className="panel booking-panel">
          <div className="panel-heading"><div><p className="section-kicker">CẦN QUAN TÂM</p><h2>Đặt chỗ mới <span className="count-pill">3</span></h2></div><button className="text-link" onClick={() => onPage('bookings')}>Xem tất cả <ArrowRight size={14} /></button></div>
          <div className="compact-bookings">
            {bookingsData.slice(0, 3).map((booking) => <div className="compact-booking" key={booking.email}><Avatar initials={booking.initials} tone={booking.tone} /><div className="compact-booking-copy"><strong>{booking.name}</strong><span>{booking.tour}</span></div><span className={`status-dot-label ${booking.tone === 'orange' ? 'orange-text' : ''}`}>{booking.tone === 'orange' ? 'Chờ duyệt' : 'Mới'}</span></div>)}
          </div>
          <button className="panel-footer-link" onClick={() => onPage('bookings')}>Quản lý tất cả đặt chỗ <ArrowRight size={14} /></button>
        </section>

        <section className="panel tours-panel">
          <div className="panel-heading"><div><p className="section-kicker">ĐANG DIỄN RA</p><h2>Hành trình nổi bật</h2></div><button className="text-link" onClick={() => onPage('tours')}>Tất cả hành trình <ArrowRight size={14} /></button></div>
          <div className="featured-tour-grid">
            {tours.slice(0, 2).map((tour) => <article className="featured-tour" key={tour.name}><div className="tour-image-wrap"><img src={imageUrl(tour.image, 680)} alt={tour.name} /><span className="image-status"><i />{tour.status}</span><button className="image-more" aria-label={`Tùy chọn ${tour.name}`}><MoreHorizontal size={18} /></button></div><div className="featured-tour-info"><div className="tour-location"><Compass size={13} />{tour.place}</div><h3>{tour.name}</h3><div className="tour-bottom"><span><CalendarDays size={14} />{tour.date}</span><strong>{tour.price}</strong></div><div className="capacity-row"><div className="capacity-track"><span style={{ width: `${Math.min((tour.bookings / tour.capacity) * 100, 100)}%` }} /></div><small>{tour.bookings}/{tour.capacity} khách</small></div></div></article>)}
            <button className="add-tour-tile" onClick={onCreate}><span><Plus size={19} /></span><strong>Tạo hành trình mới</strong><small>Thêm chuyến đi vào lịch</small></button>
          </div>
        </section>

        <section className="panel activity-panel">
          <div className="panel-heading"><div><p className="section-kicker">CẬP NHẬT</p><h2>Hoạt động gần đây</h2></div><button className="icon-button subtle-icon" aria-label="Tùy chọn hoạt động"><MoreHorizontal size={19} /></button></div>
          <div className="activity-list">
            <Activity icon={Check} tone="green" title="Đặt chỗ đã xác nhận" detail="Nguyễn Minh Anh · Vịnh Hạ Long" time="10:42" />
            <Activity icon={CreditCard} tone="blue" title="Thanh toán thành công" detail="3.780.000đ · Phạm Đức Huy" time="09:18" />
            <Activity icon={MessageCircle} tone="coral" title="Thắc mắc mới" detail="Đổi ngày khởi hành · Minh Anh" time="08:56" />
            <Activity icon={Users} tone="yellow" title="Khách hàng mới" detail="Hoàng Khánh · Đăng ký tài khoản" time="Hôm qua" />
          </div>
        </section>
      </div>
    </>
  )
}

function Metric({ label, value, change, note, icon: Icon, tone, direction }) {
  return <article className="metric-card"><div className={`metric-icon ${tone}`}><Icon size={18} strokeWidth={1.8} /></div><span className="metric-label">{label}</span><strong className="metric-value">{value}</strong><div className="metric-change"><span className={direction === 'up' ? 'change-up' : 'change-down'}>{direction === 'up' ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}{change}</span><span>{note}</span></div><div className={`metric-spark ${tone}`}><svg viewBox="0 0 100 32" preserveAspectRatio="none"><path d={tone === 'peach' ? 'M0 25 C13 22 12 18 24 20 S36 28 45 17 S57 12 66 17 S77 7 85 12 S94 6 100 3' : 'M0 25 C10 21 14 26 22 17 S34 22 42 14 S54 18 63 10 S76 15 83 6 S94 12 100 3'} /></svg></div></article>
}

function RevenueChart() {
  return <div className="chart-area"><div className="chart-y-labels"><span>200 tr</span><span>150 tr</span><span>100 tr</span><span>50 tr</span><span>0</span></div><svg className="revenue-chart" viewBox="0 0 760 170" preserveAspectRatio="none" role="img" aria-label="Biểu đồ doanh thu tăng đều từ tháng 4 đến tháng 10"><defs><linearGradient id="revenue-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#acd8ba" stopOpacity=".48" /><stop offset="100%" stopColor="#acd8ba" stopOpacity="0" /></linearGradient></defs><path className="chart-gridline" d="M0 15H760M0 50H760M0 85H760M0 120H760M0 155H760" /><path className="chart-area-fill" d="M0 126 C38 120 56 129 92 112 S148 113 183 94 S240 100 275 88 S329 93 365 71 S416 84 454 61 S508 74 547 49 S605 63 638 42 S702 44 760 18V160H0Z" /><path className="chart-line" d="M0 126 C38 120 56 129 92 112 S148 113 183 94 S240 100 275 88 S329 93 365 71 S416 84 454 61 S508 74 547 49 S605 63 638 42 S702 44 760 18" /><circle className="chart-point" cx="760" cy="18" r="4" /></svg></div>
}

function Activity({ icon: Icon, tone, title, detail, time }) {
  return <div className="activity-item"><div className={`activity-icon ${tone}`}><Icon size={15} /></div><div className="activity-copy"><strong>{title}</strong><span>{detail}</span></div><time>{time}</time></div>
}

function Avatar({ initials, tone = 'green' }) {
  return <span className={`avatar avatar-${tone}`}>{initials}</span>
}

function Tours({ tours, query, onCreate, onNotify }) {
  const filtered = tours.filter((tour) => `${tour.name} ${tour.place}`.toLowerCase().includes(query.toLowerCase()))
  return <section className="panel table-panel"><div className="table-toolbar"><div className="table-summary"><strong>{tours.length} hành trình</strong><span>·</span><span>3 đang mở bán</span></div><button className="button button-secondary small-button" onClick={() => onNotify('Bộ lọc hành trình đã được áp dụng')}><Filter size={15} /> Bộ lọc</button></div><div className="tour-list">{filtered.map((tour, index) => <article className="tour-list-row" key={`${tour.name}-${index}`}><img src={imageUrl(tour.image, 240)} alt="" /><div className="tour-list-main"><span className="tour-location"><Compass size={13} />{tour.place}</span><strong>{tour.name}</strong><span className="tour-list-date"><CalendarDays size={13} />{tour.date}</span></div><div className="tour-list-capacity"><span>Số chỗ đã đặt</span><strong>{tour.bookings} <small>/ {tour.capacity}</small></strong><div className="capacity-track"><span style={{ width: `${Math.min((tour.bookings / tour.capacity) * 100, 100)}%` }} /></div></div><div className="tour-list-price"><span>Giá từ</span><strong>{tour.price}</strong></div><span className="table-state state-green"><i />{tour.status}</span><button className="icon-button subtle-icon" aria-label={`Tùy chọn ${tour.name}`} onClick={() => onNotify(`Đang mở tùy chọn: ${tour.name}`)}><MoreHorizontal size={19} /></button></article>)}{filtered.length === 0 && <EmptyState title="Không tìm thấy hành trình" detail="Thử đổi từ khóa tìm kiếm." />}</div><button className="inline-create" onClick={onCreate}><Plus size={15} /> Thêm hành trình mới</button></section>
}

function Bookings({ rows, query, onUpdate }) {
  const filtered = rows.filter((row) => `${row.name} ${row.tour} ${row.email}`.toLowerCase().includes(query.toLowerCase()))
  return <section className="panel table-panel"><div className="table-toolbar"><div className="booking-filters"><button className="filter-tab selected">Tất cả <span>248</span></button><button className="filter-tab">Chờ xác nhận <span>8</span></button><button className="filter-tab">Đã xác nhận</button><button className="filter-tab">Đã hủy</button></div><button className="button button-secondary small-button"><Filter size={15} /> Lọc ngày</button></div><div className="data-table-wrap"><table className="data-table"><thead><tr><th>KHÁCH HÀNG</th><th>HÀNH TRÌNH</th><th>NGÀY ĐẶT</th><th>TỔNG TIỀN</th><th>TRẠNG THÁI</th><th></th></tr></thead><tbody>{filtered.map((row, index) => <tr key={row.email}><td><div className="table-person"><Avatar initials={row.initials} tone={row.tone} /><span><strong>{row.name}</strong><small>{row.email}</small></span></div></td><td><strong className="table-tour">{row.tour}</strong><small className="table-subline">{row.guests}</small></td><td>{row.date}</td><td><strong>{row.amount}</strong></td><td><span className={`table-state state-${row.tone}`}><i />{row.state}</span></td><td><button className="icon-button subtle-icon" aria-label="Xác nhận đặt chỗ" onClick={() => onUpdate(index)}>{row.state === 'Chờ xác nhận' ? <Check size={17} /> : <MoreHorizontal size={19} />}</button></td></tr>)}</tbody></table>{filtered.length === 0 && <EmptyState title="Không tìm thấy đặt chỗ" detail="Thử tìm bằng tên khách hoặc hành trình." />}</div><div className="pagination"><span>Hiển thị <strong>{filtered.length}</strong> trên <strong>248</strong> đặt chỗ</span><div><button className="icon-button" aria-label="Trang trước"><ChevronLeft size={17} /></button><button className="page-number active-page">1</button><button className="page-number">2</button><button className="page-number">3</button><span>…</span><button className="page-number">25</button><button className="icon-button" aria-label="Trang sau"><ChevronRight size={17} /></button></div></div></section>
}

function Customers({ query }) {
  const customers = [
    ['NA', 'Nguyễn Minh Anh', 'minhanh@gmail.com', 'Hà Nội', '4 chuyến đi', '09 thg 10, 2026', 'green'],
    ['TL', 'Trần Gia Linh', 'gialinh.tran@gmail.com', 'Đà Nẵng', '3 chuyến đi', '09 thg 10, 2026', 'orange'],
    ['PH', 'Phạm Đức Huy', 'duchuy.pham@gmail.com', 'TP. Hồ Chí Minh', '2 chuyến đi', '08 thg 10, 2026', 'blue'],
    ['LH', 'Lê Thu Hà', 'thuha.le@gmail.com', 'Hải Phòng', '2 chuyến đi', '08 thg 10, 2026', 'coral'],
    ['VK', 'Vũ Hoàng Khánh', 'hoangkhanh.vu@gmail.com', 'Hà Nội', '1 chuyến đi', '07 thg 10, 2026', 'yellow'],
  ]
  const filtered = customers.filter((customer) => customer.join(' ').toLowerCase().includes(query.toLowerCase()))
  return <section className="panel table-panel"><div className="table-toolbar"><div className="table-summary"><strong>1.284 khách hàng</strong><span>·</span><span>36 khách hàng mới trong tháng này</span></div><button className="button button-secondary small-button"><Filter size={15} /> Bộ lọc</button></div><div className="data-table-wrap"><table className="data-table"><thead><tr><th>KHÁCH HÀNG</th><th>KHU VỰC</th><th>SỐ HÀNH TRÌNH</th><th>ĐẶT CHỖ GẦN NHẤT</th><th>HẠNG THÀNH VIÊN</th></tr></thead><tbody>{filtered.map((customer) => <tr key={customer[2]}><td><div className="table-person"><Avatar initials={customer[0]} tone={customer[6]} /><span><strong>{customer[1]}</strong><small>{customer[2]}</small></span></div></td><td>{customer[3]}</td><td><strong>{customer[4]}</strong></td><td>{customer[5]}</td><td><span className="member-tag"><Sparkles size={13} /> Thành viên</span></td></tr>)}</tbody></table></div></section>
}

function Forms({ entries, query, onCreate, onNotify }) {
  const filtered = entries.filter((entry) => `${entry.name} ${entry.type}`.toLowerCase().includes(query.toLowerCase()))
  return <div className="forms-layout"><section className="panel table-panel form-table"><div className="table-toolbar"><div className="table-summary"><strong>{entries.length} biểu mẫu</strong><span>·</span><span>Thu thập phản hồi tự động</span></div><button className="button button-secondary small-button"><Filter size={15} /> Bộ lọc</button></div><div className="data-table-wrap"><table className="data-table"><thead><tr><th>TÊN BIỂU MẪU</th><th>LOẠI</th><th>PHẢN HỒI</th><th>CẬP NHẬT</th><th>TRẠNG THÁI</th><th></th></tr></thead><tbody>{filtered.map((entry) => <tr key={entry.name}><td><div className="form-name"><span><ClipboardList size={17} /></span><strong>{entry.name}</strong></div></td><td>{entry.type}</td><td><strong>{entry.replies}</strong></td><td>{entry.updated}</td><td><span className={`table-state ${entry.status === 'Bản nháp' ? 'state-orange' : 'state-green'}`}><i />{entry.status}</span></td><td><button className="icon-button subtle-icon" aria-label={`Tùy chọn ${entry.name}`} onClick={() => onNotify(`Đã mở biểu mẫu: ${entry.name}`)}><MoreHorizontal size={19} /></button></td></tr>)}</tbody></table>{filtered.length === 0 && <EmptyState title="Chưa có biểu mẫu phù hợp" detail="Tạo biểu mẫu mới hoặc thử từ khóa khác." />}</div><button className="inline-create" onClick={onCreate}><Plus size={15} /> Tạo biểu mẫu mới</button></section><aside className="panel form-tip"><div className="tip-icon"><ClipboardList size={19} /></div><p className="section-kicker">BẮT ĐẦU NHANH</p><h2>Mọi phản hồi,<br />một nơi duy nhất.</h2><p>Tạo biểu mẫu để nhận thông tin đặt chỗ, yêu cầu tư vấn và cảm nhận của khách sau chuyến đi.</p><button className="button button-primary" onClick={onCreate}><Plus size={16} /> Tạo biểu mẫu</button><div className="tip-divider" /><div className="tip-stat"><span>Tổng lượt phản hồi</span><strong>59 <small>+12 tuần này</small></strong></div></aside></div>
}

function Inquiries({ query, onReply }) {
  const [selected, setSelected] = useState(0)
  const [replied, setReplied] = useState([])
  const filtered = inquiriesData.filter((item) => `${item.name} ${item.subject} ${item.tour}`.toLowerCase().includes(query.toLowerCase()))
  const current = filtered[Math.min(selected, Math.max(filtered.length - 1, 0))]
  const markReplied = () => { setReplied((items) => [...items, current.subject]); onReply() }
  return <div className="inquiry-layout"><section className="panel inquiry-list-panel"><div className="inquiry-list-head"><div className="booking-filters"><button className="filter-tab selected">Hộp thư đến <span>3</span></button><button className="filter-tab">Đã xử lý</button></div><button className="icon-button subtle-icon" aria-label="Lọc thắc mắc"><Filter size={16} /></button></div>{filtered.map((item, index) => <button className={`inquiry-row ${selected === index ? 'selected-inquiry' : ''}`} key={item.subject} onClick={() => setSelected(index)}><div className="inquiry-row-top"><Avatar initials={item.initials} tone={item.tone} /><span className="inquiry-row-person"><strong>{item.name}</strong><time>{item.time}</time></span></div><strong className="inquiry-subject">{item.subject}</strong><span className="inquiry-tour"><Compass size={13} />{item.tour}</span>{item.unread && !replied.includes(item.subject) && <i className="unread-indicator" />}</button>)}</section><section className="panel inquiry-detail">{current ? <><div className="inquiry-detail-top"><span className="section-kicker">CHI TIẾT THẮC MẮC</span><button className="icon-button subtle-icon" aria-label="Tùy chọn thắc mắc"><MoreHorizontal size={19} /></button></div><div className="inquiry-detail-title"><Avatar initials={current.initials} tone={current.tone} /><div><h2>{current.subject}</h2><span>{current.name} <span className="detail-email">· khách hàng</span></span></div></div><div className="message-meta"><span>Hành trình: <strong>{current.tour}</strong></span><span>{current.time}</span></div><div className="message-bubble"><p>Chào Hành Trình,</p><p>{current.subject === 'Tôi muốn đổi ngày khởi hành' ? 'Mình đã đặt tour nhưng có việc đột xuất vào ngày khởi hành. Không biết bên mình có thể hỗ trợ chuyển sang ngày khác được không ạ? Mình cảm ơn nhiều!' : current.subject === 'Tour Hội An có bao gồm vé tham quan?' ? 'Mình đang tìm hiểu lịch trình Hội An, cho mình hỏi giá tour đã bao gồm vé tham quan phố cổ và các điểm trong chương trình chưa ạ?' : 'Mình vừa thanh toán đặt chỗ, nhờ bên mình kiểm tra và xác nhận giúp mình với nhé. Mình cảm ơn!'}</p><p>Trân trọng,<br />{current.name}</p></div><div className="reply-composer"><textarea placeholder="Viết phản hồi cho khách hàng..." aria-label="Nội dung phản hồi" /><div className="reply-actions"><span>Phản hồi sẽ gửi qua email</span><button className="button button-primary" onClick={markReplied}><Send size={15} /> Gửi phản hồi</button></div></div></> : <EmptyState title="Không tìm thấy thắc mắc" detail="Thử tìm bằng tên khách hoặc nội dung." />}</section></div>
}

function Projects({ onNotify }) {
  const [filter, setFilter] = useState('Tất cả')
  const projects = [
    { name: 'Mùa thu miền Bắc 2026', tag: 'Chiến dịch', color: 'project-green', progress: 72, tasks: '18/25 công việc', due: '31 thg 10, 2026', lead: 'NL', state: 'Đang triển khai' },
    { name: 'Mở tuyến du lịch Tà Xùa', tag: 'Phát triển tour', color: 'project-peach', progress: 46, tasks: '11/24 công việc', due: '15 thg 11, 2026', lead: 'TH', state: 'Đang triển khai' },
    { name: 'Nâng cấp trải nghiệm đặt chỗ', tag: 'Sản phẩm', color: 'project-blue', progress: 88, tasks: '22/25 công việc', due: '20 thg 10, 2026', lead: 'MA', state: 'Sắp hoàn tất' },
    { name: 'Khảo sát khách hàng quý IV', tag: 'Nghiên cứu', color: 'project-yellow', progress: 19, tasks: '4/21 công việc', due: '30 thg 11, 2026', lead: 'GL', state: 'Đang triển khai' },
  ]
  const filtered = projects.filter((project) => filter === 'Tất cả' || project.tag === filter)
  return <><div className="project-toolbar"><div className="booking-filters">{['Tất cả', 'Chiến dịch', 'Phát triển tour', 'Sản phẩm', 'Nghiên cứu'].map((item) => <button className={`filter-tab ${filter === item ? 'selected' : ''}`} key={item} onClick={() => setFilter(item)}>{item}</button>)}</div><button className="button button-secondary small-button"><Settings2 size={15} /> Tùy chỉnh</button></div><div className="project-grid">{filtered.map((project) => <article className="panel project-card" key={project.name}><div className="project-card-top"><span className={`project-symbol ${project.color}`}><Compass size={18} /></span><button className="icon-button subtle-icon" aria-label={`Tùy chọn ${project.name}`} onClick={() => onNotify(`Đã mở dự án: ${project.name}`)}><MoreHorizontal size={19} /></button></div><span className="project-tag">{project.tag}</span><h2>{project.name}</h2><span className="table-state state-green"><i />{project.state}</span><div className="project-progress-copy"><span>Tiến độ</span><strong>{project.progress}%</strong></div><div className="project-progress"><span style={{ width: `${project.progress}%` }} /></div><div className="project-card-bottom"><span>{project.tasks}</span><span><CalendarDays size={13} />{project.due}</span></div><div className="project-lead"><span>Người phụ trách</span><Avatar initials={project.lead} tone="green" /></div></article>)}<button className="project-create" onClick={() => onNotify('Tạo dự án sẽ sớm được kết nối với hệ thống')}><span><Plus size={19} /></span><strong>Tạo dự án</strong></button></div></>
}

function EmptyState({ title, detail }) {
  return <div className="empty-state"><Search size={19} /><strong>{title}</strong><span>{detail}</span></div>
}

function Modal({ type, onClose, onTourSubmit, onFormSubmit, onReply }) {
  const isTour = type === 'tour'
  const isForm = type === 'form'
  const title = isTour ? 'Tạo hành trình mới' : isForm ? 'Tạo biểu mẫu' : 'Phản hồi khách hàng'
  return <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div className="modal-heading"><div><p className="section-kicker">HÀNH TRÌNH WORKSPACE</p><h2 id="modal-title">{title}</h2></div><button className="icon-button" aria-label="Đóng" onClick={onClose}><X size={19} /></button></div>{isTour ? <form className="modal-form" onSubmit={onTourSubmit}><label>Tên hành trình<input name="name" required placeholder="Ví dụ: Vịnh Hạ Long · 3 ngày 2 đêm" /></label><label>Địa điểm<input name="place" required placeholder="Thành phố, quốc gia" /></label><div className="form-two-columns"><label>Giá từ (VND)<input name="price" type="number" min="0" required placeholder="3490000" /></label><label>Số chỗ tối đa<input name="capacity" type="number" min="1" defaultValue="20" /></label></div><label>Ngày khởi hành<input name="date" placeholder="18–20 tháng 10" /></label><div className="modal-actions"><button type="button" className="button button-secondary" onClick={onClose}>Hủy</button><button className="button button-primary" type="submit"><Plus size={16} /> Tạo hành trình</button></div></form> : isForm ? <form className="modal-form" onSubmit={onFormSubmit}><label>Tên biểu mẫu<input name="name" required placeholder="Ví dụ: Đăng ký tư vấn tour" /></label><label>Loại biểu mẫu<select name="type" defaultValue="Liên hệ"><option>Liên hệ</option><option>Đặt chỗ</option><option>Phản hồi</option><option>Khác</option></select></label><label>Mô tả<textarea name="description" placeholder="Biểu mẫu này dùng để thu thập thông tin gì?" rows="3" /></label><div className="modal-actions"><button type="button" className="button button-secondary" onClick={onClose}>Hủy</button><button className="button button-primary" type="submit"><Plus size={16} /> Tạo biểu mẫu</button></div></form> : <div className="modal-form"><label>Nội dung phản hồi<textarea rows="5" placeholder="Viết phản hồi thân thiện, rõ ràng..." /></label><div className="modal-actions"><button className="button button-secondary" onClick={onClose}>Hủy</button><button className="button button-primary" onClick={onReply}><Send size={15} /> Gửi phản hồi</button></div></div>}</section></div>
}

function AuthModal({ mode, setMode, onSubmit, onClose }) {
  const registering = mode === 'register'
  return <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><section className="modal auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-title"><button className="icon-button auth-close" aria-label="Đóng" onClick={onClose}><X size={19} /></button><div className="auth-mark"><Compass size={22} /></div><p className="section-kicker">HÀNH TRÌNH WORKSPACE</p><h2 id="auth-title">{registering ? 'Tạo tài khoản mới' : 'Chào mừng trở lại'}</h2><p className="auth-subtitle">{registering ? 'Bắt đầu quản lý những chuyến đi thật đáng nhớ.' : 'Đăng nhập để tiếp tục công việc của bạn.'}</p><form className="modal-form" onSubmit={onSubmit}>{registering && <label>Họ và tên<input required placeholder="Nguyễn Ngọc Linh" autoComplete="name" /></label>}<label>Email<input type="email" required placeholder="ban@congty.vn" autoComplete="email" /></label><label>Mật khẩu<input type="password" minLength="6" required placeholder="Ít nhất 6 ký tự" autoComplete={registering ? 'new-password' : 'current-password'} /></label>{registering && <label className="terms-check"><input type="checkbox" required /> Tôi đồng ý với điều khoản sử dụng</label>}<button className="button button-primary auth-submit" type="submit">{registering ? 'Tạo tài khoản' : 'Đăng nhập'} <ArrowRight size={16} /></button></form><p className="auth-switch">{registering ? 'Đã có tài khoản?' : 'Chưa có tài khoản?'} <button onClick={() => setMode(registering ? 'login' : 'register')}>{registering ? 'Đăng nhập' : 'Đăng ký'}</button></p><div className="auth-security"><ShieldCheck size={14} /> Thông tin của bạn luôn được bảo mật</div></section></div>
}

export default App