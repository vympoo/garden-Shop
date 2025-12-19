import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FiShoppingCart, FiSearch, FiUser, FiHeart, FiMenu, FiX } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  
  const cartItems = useSelector(state => state.cart.items)
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Закрываем меню при смене страницы
  useEffect(() => {
    setMobileMenuOpen(false)
    setSearchOpen(false)
  }, [location.pathname])

  const navItems = [
    { path: '/', label: 'Главная' },
    { path: '/catalog', label: 'Каталог' },
    { path: '/about', label: 'О нас' },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={scrolled ? 'glass' : ''}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: 'var(--header-height)',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          transition: 'all var(--transition-normal)',
          background: 'var(--surface)'
        }}
      >
        <div className="container" style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1rem'
        }}>
          
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', zIndex: 1001 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-lg)',
                background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.25rem',
                fontWeight: 'bold',
                boxShadow: 'var(--shadow-md)'
              }}>
                G
              </div>
              <div className="hidden-mobile">
                <h1 style={{
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  margin: 0,
                  background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  GARDEN
                </h1>
                <p style={{
                  fontSize: '0.75rem',
                  margin: 0,
                  color: 'var(--text-secondary)',
                  letterSpacing: '0.1em'
                }}>
                  digital greenhouse
                </p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden-mobile" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  textDecoration: 'none',
                  color: location.pathname === item.path ? 'var(--primary)' : 'var(--text)',
                  fontWeight: location.pathname === item.path ? 600 : 500,
                  fontSize: '0.9375rem',
                  padding: '0.5rem 0',
                  position: 'relative',
                  transition: 'color var(--transition-fast)'
                }}
              >
                {item.label}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeNav"
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'linear-gradient(90deg, var(--primary), var(--accent))',
                      borderRadius: '2px'
                    }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', zIndex: 1001 }}>
            {/* Search - только на десктопе */}
            <motion.div
              className="hidden-mobile"
              animate={{ width: searchOpen ? '200px' : '40px' }}
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden'
              }}
            >
              <input
                type="text"
                placeholder="Поиск растений..."
                style={{
                  width: '100%',
                  height: '40px',
                  padding: searchOpen ? '0 1rem 0 3rem' : '0',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--surface)',
                  fontSize: '0.875rem',
                  outline: 'none',
                  transition: 'all var(--transition-fast)',
                  opacity: searchOpen ? 1 : 0
                }}
                onFocus={() => setSearchOpen(true)}
                onBlur={() => setSearchOpen(false)}
              />
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  cursor: 'pointer',
                  color: 'var(--text)'
                }}
              >
                <FiSearch size={20} />
              </button>
            </motion.div>

            {/* Cart */}
            <Link to="/cart" style={{ position: 'relative', textDecoration: 'none' }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                  border: 'none',
                  borderRadius: 'var(--radius-lg)',
                  cursor: 'pointer',
                  color: 'white',
                  boxShadow: 'var(--shadow-md)'
                }}
              >
                <FiShoppingCart size={20} />
              </motion.button>
              
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-6px',
                    background: 'linear-gradient(135deg, var(--accent), #f59e0b)',
                    color: 'white',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    boxShadow: 'var(--shadow-md)'
                  }}
                >
                  {totalItems}
                </motion.span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="hidden-desktop"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                cursor: 'pointer',
                color: 'var(--text)'
              }}
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  position: 'fixed',
                  top: 'var(--header-height)',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(0, 0, 0, 0.5)',
                  zIndex: 999
                }}
              />
              
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: "spring", damping: 25 }}
                style={{
                  position: 'fixed',
                  top: 'var(--header-height)',
                  right: 0,
                  bottom: 0,
                  width: '300px',
                  background: 'var(--surface)',
                  zIndex: 1000,
                  boxShadow: 'var(--shadow-xl)',
                  padding: '2rem 1.5rem',
                  overflowY: 'auto'
                }}
              >
                {/* Mobile Search */}
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ position: 'relative' }}>
                    <FiSearch style={{
                      position: 'absolute',
                      left: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--text-secondary)'
                    }} />
                    <input
                      type="text"
                      placeholder="Поиск растений..."
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem 0.75rem 3rem',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-lg)',
                        background: 'var(--surface)',
                        fontSize: '0.875rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                {/* Mobile Navigation */}
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      style={{
                        textDecoration: 'none',
                        color: location.pathname === item.path ? 'var(--primary)' : 'var(--text)',
                        fontWeight: location.pathname === item.path ? 600 : 500,
                        fontSize: '1.125rem',
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        background: location.pathname === item.path ? 'var(--emerald-50)' : 'transparent',
                        transition: 'all var(--transition-fast)'
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                  
                  <div style={{ height: '1px', background: 'var(--border)', margin: '1rem 0' }} />
                  
                  <Link
                    to="/cart"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      textDecoration: 'none',
                      color: 'var(--text)',
                      fontSize: '1.125rem',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span>Корзина</span>
                    {totalItems > 0 && (
                      <span style={{
                        background: 'var(--primary)',
                        color: 'white',
                        borderRadius: '50%',
                        width: '24px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 'bold'
                      }}>
                        {totalItems}
                      </span>
                    )}
                  </Link>
                </nav>

                {/* Contact Info */}
                <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                    Контакты
                  </div>
                  <div style={{ fontSize: '0.875rem' }}>
                    <div style={{ marginBottom: '0.25rem' }}>+7 (999) 123-45-67</div>
                    <div>support@garden.shop</div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>
      
      {/* Spacer for fixed header */}
      <div style={{ height: 'var(--header-height)' }} />
    </>
  )
}

export default Header