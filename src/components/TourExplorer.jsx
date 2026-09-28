import { useMemo, useState } from 'react'
import { CalendarDays, Compass, MapPin, Search, SlidersHorizontal, X } from 'lucide-react'
import { tours as allTours } from '../data/tours.js'
import {
  filterTours,
  formatDate,
  formatVND,
  getMatchingDepartures,
  sortTours,
  validateFilters,
} from '../utils/tourFilter.js'

const imageUrl = (id, width = 640) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`

const PRICE_PRESETS = [
  { label: 'Dưới 2 triệu', min: '', max: '2000000' },
  { label: '2 – 4 triệu', min: '2000000', max: '4000000' },
  { label: '4 – 6 triệu', min: '4000000', max: '6000000' },
  { label: 'Trên 6 triệu', min: '6000000', max: '' },
]

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Mặc định' },
  { value: 'price-asc', label: 'Giá thấp → cao' },
  { value: 'price-desc', label: 'Giá cao → thấp' },
  { value: 'date-asc', label: 'Khởi hành sớm nhất' },
]

function TourCard({ tour, filters, onView }) {
  const [imageFailed, setImageFailed] = useState(false)
  const hasDateFilter = Boolean(filters.fromDate || filters.toDate)
  const matching = getMatchingDepartures(tour, filters)
  const shown = (hasDateFilter ? matching : tour.departures).slice(0, 3)
  const rest = (hasDateFilter ? matching : tour.departures).length - shown.length

  return (
    <article className="tx-card">
      <div className="tx-card-image">
        {imageFailed ? (
          <div className="tx-card-fallback"><Compass size={28} /></div>
        ) : (
          <img src={imageUrl(tour.image)} alt={tour.name} loading="lazy" onError={() => setImageFailed(true)} />
        )}
        <span className="tx-card-duration">{tour.duration}</span>
      </div>
      <div className="tx-card-body">
        <span className="tx-card-place"><MapPin size={13} />{tour.place}, {tour.region}</span>
        <h3>{tour.name}</h3>
        <div className="tx-card-dates">
          <CalendarDays size={14} />
          <span>
            {hasDateFilter ? 'Khởi hành phù hợp: ' : 'Khởi hành: '}
            {shown.map((d) => formatDate(d)).join(' · ')}
            {rest > 0 && ` (+${rest})`}
          </span>
        </div>
        <div className="tx-card-footer">
          <div><small>Giá từ</small><strong>{formatVND(tour.price)}</strong></div>
          <button type="button" onClick={() => onView(tour)}>Xem chi tiết</button>
        </div>
      </div>
    </article>
  )
}

/**
 * Khu vực tìm kiếm + lọc tour trên trang chủ.
 * Props:
 *  - keyword / onKeywordChange: từ khóa tìm kiếm (được điều khiển từ ngoài để ô tìm kiếm ở hero dùng chung)
 *  - onViewTour(tour): callback khi bấm "Xem chi tiết" (trang chi tiết tour do bạn khác đảm nhận)
 */
export default function TourExplorer({ keyword, onKeywordChange, onViewTour }) {
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [sortBy, setSortBy] = useState('relevance')

  const filters = { keyword, minPrice, maxPrice, fromDate, toDate }
  const error = validateFilters(filters)

  const results = useMemo(() => {
    if (error) return []
    return sortTours(filterTours(allTours, filters), sortBy, filters)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, minPrice, maxPrice, fromDate, toDate, sortBy, error])

  const isFiltering = Boolean(keyword || minPrice || maxPrice || fromDate || toDate)

  const resetAll = () => {
    onKeywordChange('')
    setMinPrice('')
    setMaxPrice('')
    setFromDate('')
    setToDate('')
    setSortBy('relevance')
  }

  const applyPreset = (preset) => {
    const active = minPrice === preset.min && maxPrice === preset.max
    setMinPrice(active ? '' : preset.min)
    setMaxPrice(active ? '' : preset.max)
  }

  return (
    <section className="tx-section" id="tours">
      <div className="tx-heading">
        <div>
          <p className="section-eyebrow">KHÁM PHÁ HÀNH TRÌNH</p>
          <h2>Tìm chuyến đi<br />dành cho bạn<span>.</span></h2>
        </div>
        <p>Tìm theo tên hoặc địa điểm, rồi lọc theo ngân sách và ngày khởi hành mong muốn.</p>
      </div>

      <div className="tx-panel">
        <label className="tx-search">
          <Search size={18} />
          <input
            type="search"
            value={keyword}
            onChange={(e) => onKeywordChange(e.target.value)}
            placeholder="Nhập tên tour hoặc địa điểm, ví dụ: Hạ Long, Đà Lạt..."
            aria-label="Tìm tour theo tên hoặc địa điểm"
          />
          {keyword && (
            <button type="button" aria-label="Xóa từ khóa" onClick={() => onKeywordChange('')}><X size={16} /></button>
          )}
        </label>

        <div className="tx-filters">
          <fieldset className="tx-group">
            <legend><SlidersHorizontal size={13} /> Khoảng giá (VND)</legend>
            <div className="tx-chips">
              {PRICE_PRESETS.map((preset) => (
                <button
                  type="button"
                  key={preset.label}
                  className={`tx-chip ${minPrice === preset.min && maxPrice === preset.max ? 'tx-chip-active' : ''}`}
                  aria-pressed={minPrice === preset.min && maxPrice === preset.max}
                  onClick={() => applyPreset(preset)}
                >
                  {preset.label}
                </button>
              ))}
            </div>
            <div className="tx-range">
              <input type="number" min="0" step="100000" inputMode="numeric" placeholder="Từ" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} aria-label="Giá tối thiểu" />
              <span>–</span>
              <input type="number" min="0" step="100000" inputMode="numeric" placeholder="Đến" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} aria-label="Giá tối đa" />
            </div>
          </fieldset>

          <fieldset className="tx-group">
            <legend><CalendarDays size={13} /> Ngày khởi hành</legend>
            <div className="tx-range tx-range-dates">
              <label>Từ ngày<input type="date" value={fromDate} max={toDate || undefined} onChange={(e) => setFromDate(e.target.value)} /></label>
              <span>–</span>
              <label>Đến ngày<input type="date" value={toDate} min={fromDate || undefined} onChange={(e) => setToDate(e.target.value)} /></label>
            </div>
          </fieldset>
        </div>

        {error && <p className="tx-error" role="alert">{error}</p>}
      </div>

      <div className="tx-result-bar">
        <p role="status" aria-live="polite">
          {error ? 'Vui lòng chỉnh lại bộ lọc' : <>Tìm thấy <strong>{results.length}</strong> hành trình{isFiltering ? ' phù hợp' : ''}</>}
        </p>
        <div className="tx-result-actions">
          {isFiltering && <button type="button" className="tx-reset" onClick={resetAll}>Xóa bộ lọc</button>}
          <label className="tx-sort">Sắp xếp
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </label>
        </div>
      </div>

      {results.length > 0 ? (
        <div className="tx-grid">
          {results.map((tour) => <TourCard key={tour.id} tour={tour} filters={filters} onView={onViewTour} />)}
        </div>
      ) : (
        !error && (
          <div className="tx-empty">
            <Search size={22} />
            <strong>Không tìm thấy hành trình phù hợp</strong>
            <span>Hãy thử đổi từ khóa, nới rộng khoảng giá hoặc chọn khoảng ngày khác.</span>
            <button type="button" onClick={resetAll}>Xóa bộ lọc</button>
          </div>
        )
      )}
    </section>
  )
}
