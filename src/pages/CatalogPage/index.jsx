import { useState, useMemo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import ProductCard from '../../components/ProductCard'
import { FiFilter, FiX, FiChevronDown, FiChevronUp, FiGrid, FiList } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

const CatalogPage = () => {
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: [0, 100],
    inStock: false,
    sortBy: 'featured'
  })
  
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState('grid')
  const [expandedFilters, setExpandedFilters] = useState({})
  const [isMobile, setIsMobile] = useState(false)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const productsPerPage = 8

  // Определяем мобильное устройство
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const { products } = useSelector(state => state.products)

  const categories = [
    { id: 'all', name: 'Все растения', emoji: '🌿' },
    { id: 'tropical', name: 'Тропические', emoji: '🌴' },
    { id: 'succulents', name: 'Суккуленты', emoji: '🌵' },
    { id: 'trees', name: 'Деревья', emoji: '🪴' },
    { id: 'flowering', name: 'Цветущие', emoji: '🌸' },
    { id: 'air', name: 'Воздушные', emoji: '💨' }
  ]

  const sortOptions = [
    { id: 'featured', name: 'Рекомендуемые' },
    { id: 'price-asc', name: 'Цена: по возрастанию' },
    { id: 'price-desc', name: 'Цена: по убыванию' },
    { id: 'name', name: 'По названию' },
    { id: 'newest', name: 'Новинки' }
  ]

  // Фильтрация продуктов
  const filteredProducts = useMemo(() => {
    let filtered = [...products]
    
    // Фильтр по категории (на основе цены для демо)
    if (filters.category !== 'all') {
      filtered = filtered.filter(product => {
        if (filters.category === 'tropical') return product.price > 20
        if (filters.category === 'succulents') return product.price < 20
        if (filters.category === 'trees') return product.price > 25
        if (filters.category === 'flowering') return product.price > 30
        if (filters.category === 'air') return product.price > 15 && product.price < 25
        return true
      })
    }
    
    // Фильтр по цене
    filtered = filtered.filter(product => 
      product.price >= filters.priceRange[0] && 
      product.price <= filters.priceRange[1]
    )
    
    // Фильтр по наличию
    if (filters.inStock) {
      filtered = filtered.filter(product => product.inStock !== false)
    }
    
    // Сортировка
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc': return a.price - b.price
        case 'price-desc': return b.price - a.price
        case 'name': return a.name.localeCompare(b.name)
        case 'newest': return b.id - a.id
        default: return 0 // featured - без сортировки
      }
    })
    
    return filtered
  }, [products, filters])

  // Пагинация
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const endIndex = startIndex + productsPerPage
  const currentProducts = filteredProducts.slice(startIndex, endIndex)

  const toggleFilter = (filterName) => {
    setExpandedFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }))
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value)
    setFilters(prev => ({ ...prev, priceRange: [0, value] }))
    setCurrentPage(1) // Сброс на первую страницу при изменении фильтра
  }

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }))
    setCurrentPage(1) // Сброс на первую страницу при изменении фильтра
  }

  // Компонент фильтров
  const FiltersSidebar = () => (
    <motion.div
      initial={{ opacity: 0, x: isMobile ? 0 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      style={{
        position: isMobile ? 'relative' : 'sticky',
        top: isMobile ? 'auto' : 'calc(var(--header-height) + 2rem)',
        alignSelf: 'start',
        marginBottom: isMobile ? '1rem' : 0
      }}
    >
      <div style={{ 
        background: 'var(--surface)', 
        borderRadius: 'var(--radius-xl)',
        padding: '1.5rem',
        boxShadow: 'var(--shadow-md)',
        marginBottom: isMobile ? 0 : '1.5rem'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiFilter />
            <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Фильтры</h3>
          </div>
          <button
            onClick={() => {
              setFilters({
                category: 'all',
                priceRange: [0, 100],
                inStock: false,
                sortBy: 'featured'
              })
              setCurrentPage(1)
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--primary)',
              fontSize: '0.875rem',
              cursor: 'pointer'
            }}
          >
            Сбросить
          </button>
        </div>

        {/* Categories */}
        <div style={{ marginBottom: '1.5rem' }}>
          <button
            onClick={() => toggleFilter('category')}
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'transparent',
              border: 'none',
              padding: '0.5rem 0',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <span>Категории</span>
            {expandedFilters.category ? <FiChevronUp /> : <FiChevronDown />}
          </button>
          
          <AnimatePresence>
            {expandedFilters.category && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{ padding: '1rem 0' }}>
                  {categories.map(category => (
                    <label
                      key={category.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '0.75rem',
                        padding: '0.5rem 0',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <input
                          type="radio"
                          name="category"
                          checked={filters.category === category.id}
                          onChange={() => handleFilterChange('category', category.id)}
                          style={{ accentColor: 'var(--primary)' }}
                        />
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontSize: '1.25rem' }}>{category.emoji}</span>
                          <span>{category.name}</span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Price Range */}
        <div style={{ marginBottom: '1.5rem' }}>
          <button
            onClick={() => toggleFilter('price')}
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'transparent',
              border: 'none',
              padding: '0.5rem 0',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <span>Цена, $</span>
            {expandedFilters.price ? <FiChevronUp /> : <FiChevronDown />}
          </button>
          
          <AnimatePresence>
            {expandedFilters.price && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{ padding: '1rem 0' }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={filters.priceRange[1]}
                      onChange={handlePriceChange}
                      style={{ 
                        width: '100%',
                        height: '6px',
                        borderRadius: '3px',
                        background: 'linear-gradient(to right, var(--primary) 0%, var(--primary) ' + (filters.priceRange[1]) + '%, var(--border) ' + (filters.priceRange[1]) + '%, var(--border) 100%)'
                      }}
                    />
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    fontSize: '0.875rem'
                  }}>
                    <span>$0</span>
                    <span style={{ 
                      fontWeight: 600, 
                      color: 'var(--primary)',
                      background: 'var(--emerald-50)',
                      padding: '0.25rem 0.75rem',
                      borderRadius: 'var(--radius-sm)'
                    }}>
                      до ${filters.priceRange[1]}
                    </span>
                    <span>$100</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Availability */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            gap: '0.75rem',
            cursor: 'pointer'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <input
                type="checkbox"
                checked={filters.inStock}
                onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                style={{ accentColor: 'var(--primary)' }}
              />
              <span>Только в наличии</span>
            </div>
            <span style={{ 
              fontSize: '0.75rem', 
              color: 'var(--primary)',
              fontWeight: 600
            }}>
              {products.filter(p => p.inStock !== false).length} шт.
            </span>
          </label>
        </div>

        {/* Sort */}
        <div>
          <div style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Сортировка
          </div>
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              background: 'var(--surface)',
              color: 'var(--text)',
              fontSize: '0.875rem',
              cursor: 'pointer'
            }}
          >
            {sortOptions.map(option => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Banner (только на десктопе) */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            marginTop: '1.5rem',
            padding: '1.5rem',
            background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
            borderRadius: 'var(--radius-lg)',
            color: 'white',
            textAlign: 'center'
          }}
        >
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🌱</div>
          <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Бесплатная доставка</div>
          <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>
            При заказе от $50
          </div>
        </motion.div>
      )}
    </motion.div>
  )

  return (
    <div style={{ paddingTop: 'calc(var(--header-height) + 2rem)' }}>
      <div className="container">
        {/* Hero */}
        <div style={{ marginBottom: '3rem' }}>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontSize: isMobile ? '1.75rem' : '2.5rem', marginBottom: '0.5rem' }}
          >
            Каталог растений
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            style={{ color: 'var(--text-secondary)', fontSize: isMobile ? '1rem' : '1.125rem' }}
          >
            {filteredProducts.length} растений для вашего дома
          </motion.p>
        </div>

        {/* Мобильная кнопка фильтров */}
        {isMobile && (
          <div style={{ marginBottom: '1rem' }}>
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              style={{
                width: '100%',
                padding: '1rem',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              {showMobileFilters ? <FiX /> : <FiFilter />}
              {showMobileFilters ? 'Скрыть фильтры' : 'Показать фильтры'}
            </button>
          </div>
        )}

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : '280px 1fr', 
          gap: isMobile ? '1rem' : '3rem' 
        }}>
          {/* Filters Sidebar */}
          {!isMobile ? (
            <FiltersSidebar />
          ) : (
            <AnimatePresence>
              {showMobileFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  style={{ overflow: 'hidden' }}
                >
                  <FiltersSidebar />
                </motion.div>
              )}
            </AnimatePresence>
          )}

          {/* Products Grid */}
          <div>
            {/* Toolbar */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem',
              padding: '1rem',
              background: 'var(--surface)',
              borderRadius: 'var(--radius-lg)',
              flexDirection: isMobile ? 'column' : 'row',
              gap: isMobile ? '1rem' : 0
            }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Показано <strong>{startIndex + 1}-{Math.min(endIndex, filteredProducts.length)}</strong> из <strong>{filteredProducts.length}</strong> растений
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ 
                  display: 'flex', 
                  background: 'var(--stone-100)', 
                  borderRadius: 'var(--radius-md)', 
                  padding: '0.25rem',
                  border: '1px solid var(--border)'
                }}>
                  <button
                    onClick={() => setViewMode('grid')}
                    style={{
                      padding: isMobile ? '0.75rem 1rem' : '0.5rem 1rem',
                      background: viewMode === 'grid' ? 'var(--surface)' : 'transparent',
                      border: 'none',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      color: viewMode === 'grid' ? 'var(--primary)' : 'var(--text)'
                    }}
                  >
                    <FiGrid />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    style={{
                      padding: isMobile ? '0.75rem 1rem' : '0.5rem 1rem',
                      background: viewMode === 'list' ? 'var(--surface)' : 'transparent',
                      border: 'none',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      color: viewMode === 'list' ? 'var(--primary)' : 'var(--text)'
                    }}
                  >
                    <FiList />
                  </button>
                </div>
              </div>
            </div>

            {/* Products */}
            {currentProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ 
                  textAlign: 'center', 
                  padding: isMobile ? '2rem 1rem' : '4rem',
                  background: 'var(--surface)',
                  borderRadius: 'var(--radius-xl)'
                }}
              >
                <div style={{ fontSize: isMobile ? '2rem' : '3rem', marginBottom: '1rem' }}>🌵</div>
                <h3 style={{ marginBottom: '0.5rem', fontSize: isMobile ? '1.25rem' : '1.5rem' }}>Растения не найдены</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: isMobile ? '0.875rem' : '1rem' }}>
                  Попробуйте изменить параметры фильтрации
                </p>
                <button
                  onClick={() => {
                    setFilters({
                      category: 'all',
                      priceRange: [0, 100],
                      inStock: false,
                      sortBy: 'featured'
                    })
                    setCurrentPage(1)
                    if (isMobile) setShowMobileFilters(false)
                  }}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                    color: 'white',
                    border: 'none',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    fontSize: isMobile ? '0.875rem' : '1rem'
                  }}
                >
                  Сбросить фильтры
                </button>
              </motion.div>
            ) : (
              <div style={{
                display: viewMode === 'grid' ? 'grid' : 'flex',
                gridTemplateColumns: viewMode === 'grid' ? (isMobile ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))') : '1fr',
                flexDirection: viewMode === 'list' ? 'column' : 'row',
                gap: viewMode === 'grid' ? (isMobile ? '1rem' : '2rem') : '1rem'
              }}>
                {currentProducts.map((product, index) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    index={index}
                    viewMode={viewMode}
                    isMobile={isMobile}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.5rem',
                marginTop: '3rem',
                flexWrap: 'wrap'
              }}>
                {/* Кнопка "Назад" */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  style={{
                    padding: isMobile ? '0.75rem' : '0.5rem 1rem',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    opacity: currentPage === 1 ? 0.5 : 1,
                    fontSize: isMobile ? '0.875rem' : '0.875rem'
                  }}
                >
                  ← Назад
                </button>
                
                {/* Первая страница */}
                {currentPage > 2 && (
                  <button
                    onClick={() => handlePageChange(1)}
                    style={{
                      padding: isMobile ? '0.75rem' : '0.5rem 1rem',
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      fontSize: isMobile ? '0.875rem' : '0.875rem'
                    }}
                  >
                    1
                  </button>
                )}
                
                {/* Многоточие если нужно */}
                {currentPage > 3 && (
                  <span style={{ padding: '0.5rem' }}>...</span>
                )}
                
                {/* Страницы вокруг текущей */}
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(page => 
                    page === 1 || 
                    page === totalPages || 
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  )
                  .map((page, index, array) => {
                    // Добавляем многоточие между разрывами
                    const showEllipsis = index > 0 && page > array[index - 1] + 1
                    
                    return (
                      <div key={page} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {showEllipsis && (
                          <span style={{ padding: '0.5rem' }}>...</span>
                        )}
                        <button
                          onClick={() => handlePageChange(page)}
                          style={{
                            padding: isMobile ? '0.75rem' : '0.5rem 1rem',
                            background: page === currentPage ? 'var(--primary)' : 'var(--surface)',
                            border: '1px solid var(--border)',
                            borderRadius: 'var(--radius-md)',
                            color: page === currentPage ? 'white' : 'var(--text)',
                            cursor: 'pointer',
                            fontWeight: page === currentPage ? 600 : 400,
                            fontSize: isMobile ? '0.875rem' : '0.875rem'
                          }}
                        >
                          {page}
                        </button>
                      </div>
                    )
                  })}
                
                {/* Многоточие если нужно */}
                {currentPage < totalPages - 2 && (
                  <span style={{ padding: '0.5rem' }}>...</span>
                )}
                
                {/* Последняя страница */}
                {currentPage < totalPages - 1 && (
                  <button
                    onClick={() => handlePageChange(totalPages)}
                    style={{
                      padding: isMobile ? '0.75rem' : '0.5rem 1rem',
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      fontSize: isMobile ? '0.875rem' : '0.875rem'
                    }}
                  >
                    {totalPages}
                  </button>
                )}
                
                {/* Кнопка "Вперед" */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  style={{
                    padding: isMobile ? '0.75rem' : '0.5rem 1rem',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    opacity: currentPage === totalPages ? 0.5 : 1,
                    fontSize: isMobile ? '0.875rem' : '0.875rem'
                  }}
                >
                  Вперед →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CatalogPage