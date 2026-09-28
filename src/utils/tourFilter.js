// ===== Tiện ích tìm kiếm & lọc tour =====

// Bỏ dấu tiếng Việt + về chữ thường để tìm "ha long" vẫn ra "Hạ Long"
export const normalizeText = (value = '') =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .trim()

export const formatVND = (value) => `${Number(value).toLocaleString('vi-VN')}đ`

// '2026-10-18' -> '18/10/2026'
export const formatDate = (iso) => {
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}

// Trả về lỗi (chuỗi) nếu bộ lọc không hợp lệ, ngược lại trả về ''
export const validateFilters = ({ minPrice, maxPrice, fromDate, toDate }) => {
  if (minPrice !== '' && maxPrice !== '' && Number(minPrice) > Number(maxPrice)) {
    return 'Giá tối thiểu không được lớn hơn giá tối đa.'
  }
  if (fromDate && toDate && fromDate > toDate) {
    return 'Ngày bắt đầu không được sau ngày kết thúc.'
  }
  return ''
}

// Các ngày khởi hành của tour nằm trong khoảng [fromDate, toDate] (ISO nên so sánh chuỗi được)
export const getMatchingDepartures = (tour, { fromDate, toDate }) =>
  tour.departures.filter((d) => (!fromDate || d >= fromDate) && (!toDate || d <= toDate))

/**
 * Tìm kiếm theo từ khóa (tên, địa điểm) + lọc theo khoảng giá + ngày khởi hành.
 * - Từ khóa: mọi từ đều phải xuất hiện trong tên/địa điểm/tỉnh (không phân biệt dấu, hoa thường)
 * - Giá: minPrice <= price <= maxPrice (bỏ trống = không giới hạn)
 * - Ngày: tour có ít nhất 1 ngày khởi hành trong khoảng đã chọn
 */
export const filterTours = (tours, filters) => {
  const tokens = normalizeText(filters.keyword).split(/\s+/).filter(Boolean)
  const min = filters.minPrice === '' ? null : Number(filters.minPrice)
  const max = filters.maxPrice === '' ? null : Number(filters.maxPrice)

  return tours.filter((tour) => {
    const haystack = normalizeText(`${tour.name} ${tour.place} ${tour.region}`)
    if (!tokens.every((token) => haystack.includes(token))) return false
    if (min !== null && tour.price < min) return false
    if (max !== null && tour.price > max) return false
    if ((filters.fromDate || filters.toDate) && getMatchingDepartures(tour, filters).length === 0) return false
    return true
  })
}

export const sortTours = (tours, sortBy, filters) => {
  const list = [...tours]
  const earliest = (t) => (getMatchingDepartures(t, filters)[0] || t.departures[0])
  if (sortBy === 'price-asc') return list.sort((a, b) => a.price - b.price)
  if (sortBy === 'price-desc') return list.sort((a, b) => b.price - a.price)
  if (sortBy === 'date-asc') return list.sort((a, b) => earliest(a).localeCompare(earliest(b)))
  return list
}
