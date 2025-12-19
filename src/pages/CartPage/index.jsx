import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, updateQuantity } from '../../store/slices/cartSlice'
import { Link } from 'react-router-dom'
import { FiTrash2, FiPlus, FiMinus, FiArrowLeft, FiShoppingBag } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

const CartPage = () => {
  const dispatch = useDispatch()
  const { items, totalPrice } = useSelector(state => state.cart)

  const handleRemove = (id) => {
    dispatch(removeFromCart(id))
  }

  const handleQuantityChange = (id, change) => {
    const item = items.find(item => item.id === id)
    if (item) {
      const newQuantity = item.quantity + change
      if (newQuantity > 0) {
        dispatch(updateQuantity({ id, quantity: newQuantity }))
      }
    }
  }

  if (items.length === 0) {
    return (
      <div style={{ paddingTop: 'calc(var(--header-height) + 4rem)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            style={{
              width: '120px',
              height: '120px',
              margin: '0 auto 2rem',
              background: 'linear-gradient(135deg, var(--emerald-100), var(--emerald-50))',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem'
            }}
          >
            🛒
          </motion.div>
          
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Корзина пуста</h1>
          <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '3rem' }}>
            Добавьте растения из нашего каталога
          </p>
          
          <Link to="/catalog">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '1rem 2rem',
                background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-lg)',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <FiArrowLeft />
              Перейти в каталог
            </motion.button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ paddingTop: 'calc(var(--header-height) + 2rem)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>
          {/* Items */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <h1 style={{ fontSize: '2.5rem' }}>Корзина</h1>
              <span style={{ color: 'var(--text-secondary)' }}>
                {items.length} {items.length === 1 ? 'товар' : items.length < 5 ? 'товара' : 'товаров'}
              </span>
            </div>

            <AnimatePresence>
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  layout
                  style={{
                    background: 'var(--surface)',
                    borderRadius: 'var(--radius-xl)',
                    padding: '1.5rem',
                    marginBottom: '1rem',
                    display: 'flex',
                    gap: '1.5rem',
                    boxShadow: 'var(--shadow-md)',
                    position: 'relative'
                  }}
                >
                  <div style={{
                    width: '100px',
                    height: '100px',
                    flexShrink: 0,
                    borderRadius: 'var(--radius-lg)',
                    background: 'linear-gradient(135deg, var(--emerald-100), var(--emerald-50))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem'
                  }}>
                    🌿
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{item.name}</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                          {item.description}
                        </p>
                      </div>
                      
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                          ${item.price} × {item.quantity}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleQuantityChange(item.id, -1)}
                          style={{
                            width: '36px',
                            height: '36px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'var(--stone-100)',
                            border: '1px solid var(--border)',
                            borderRadius: 'var(--radius-md)',
                            cursor: 'pointer'
                          }}
                        >
                          <FiMinus />
                        </motion.button>
                        
                        <span style={{
                          minWidth: '40px',
                          textAlign: 'center',
                          fontSize: '1.125rem',
                          fontWeight: 600
                        }}>
                          {item.quantity}
                        </span>
                        
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleQuantityChange(item.id, 1)}
                          style={{
                            width: '36px',
                            height: '36px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'var(--stone-100)',
                            border: '1px solid var(--border)',
                            borderRadius: 'var(--radius-md)',
                            cursor: 'pointer'
                          }}
                        >
                          <FiPlus />
                        </motion.button>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleRemove(item.id)}
                        style={{
                          padding: '0.5rem 1rem',
                          background: 'transparent',
                          color: '#ef4444',
                          border: '1px solid #fecaca',
                          borderRadius: 'var(--radius-md)',
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}
                      >
                        <FiTrash2 />
                        Удалить
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <Link to="/catalog">
              <motion.button
                whileHover={{ scale: 1.02 }}
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: 'transparent',
                  color: 'var(--text)',
                  border: '2px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  marginTop: '2rem'
                }}
              >
                <FiArrowLeft />
                Продолжить покупки
              </motion.button>
            </Link>
          </div>

          {/* Order Summary */}
          <div>
            <div style={{
              position: 'sticky',
              top: 'calc(var(--header-height) + 2rem)',
              background: 'var(--surface)',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem',
              boxShadow: 'var(--shadow-lg)'
            }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Детали заказа</h2>
              
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Товары ({items.length})</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Доставка</span>
                  <span style={{ color: 'var(--primary)' }}>Бесплатно</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Налог</span>
                  <span>${(totalPrice * 0.1).toFixed(2)}</span>
                </div>
                
                <div style={{
                  height: '1px',
                  background: 'var(--border)',
                  margin: '1.5rem 0'
                }} />
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.125rem', fontWeight: 600 }}>Итого</span>
                  <div>
                    <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)' }}>
                      ${(totalPrice * 1.1).toFixed(2)}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', textAlign: 'right' }}>
                      включая налоги
                    </div>
                  </div>
                </div>
              </div>

              <Link to="/checkout">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                    color: 'white',
                    border: 'none',
                    borderRadius: 'var(--radius-lg)',
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    boxShadow: 'var(--shadow-lg)'
                  }}
                >
                  <FiShoppingBag />
                  Оформить заказ
                </motion.button>
              </Link>

              <p style={{
                fontSize: '0.75rem',
                color: 'var(--text-secondary)',
                textAlign: 'center',
                marginTop: '1.5rem'
              }}>
                🔒 Ваши данные защищены
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage