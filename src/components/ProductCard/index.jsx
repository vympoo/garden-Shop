import { useDispatch } from 'react-redux'
import { addToCart } from '../../store/slices/cartSlice'
import { FiShoppingCart } from 'react-icons/fi'
import { motion } from 'framer-motion'

const ProductCard = ({ product, index, viewMode = 'grid', isMobile = false }) => {
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    dispatch(addToCart({
      ...product,
      quantity: 1
    }))
  }

  // Grid mode (стандартный вид)
  if (viewMode === 'grid') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: isMobile ? 0 : -8 }}
        style={{
          background: 'var(--surface)',
          borderRadius: 'var(--radius-xl)',
          padding: isMobile ? '1rem' : '1.5rem',
          boxShadow: 'var(--shadow-md)',
          transition: 'all var(--transition-normal)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div style={{
          height: isMobile ? '150px' : '200px',
          width: '100%',
          borderRadius: 'var(--radius-lg)',
          background: 'linear-gradient(135deg, var(--emerald-100), var(--emerald-50))',
          marginBottom: isMobile ? '1rem' : '1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: isMobile ? '3rem' : '4rem',
          color: 'var(--emerald-400)',
          flexShrink: 0
        }}>
          🌿
        </div>
        
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ 
            fontSize: isMobile ? '1.125rem' : '1.25rem', 
            marginBottom: '0.5rem',
            lineHeight: 1.3
          }}>
            {product.name}
          </h3>
          <p style={{ 
            color: 'var(--text-secondary)', 
            marginBottom: '1rem', 
            fontSize: isMobile ? '0.8125rem' : '0.875rem',
            lineHeight: 1.5,
            flex: 1
          }}>
            {product.description}
          </p>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginTop: 'auto'
          }}>
            <div style={{ 
              fontSize: isMobile ? '1.25rem' : '1.5rem', 
              fontWeight: 700, 
              color: 'var(--primary)'
            }}>
              ${product.price}
            </div>
            
            <motion.button
              whileHover={{ scale: isMobile ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              style={{
                padding: isMobile ? '0.5rem 1rem' : '0.75rem 1.5rem',
                background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                fontSize: isMobile ? '0.75rem' : '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                whiteSpace: 'nowrap'
              }}
            >
              <FiShoppingCart size={isMobile ? 14 : 16} />
              {isMobile ? 'В корзину' : 'В корзину'}
            </motion.button>
          </div>
        </div>
      </motion.div>
    )
  }

  // List mode (для десктопа)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      style={{
        background: 'var(--surface)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.5rem',
        display: 'flex',
        gap: '1.5rem',
        boxShadow: 'var(--shadow-md)',
        transition: 'all var(--transition-normal)',
        cursor: 'pointer'
      }}
    >
      {/* Image */}
      <div style={{
        width: '150px',
        height: '150px',
        flexShrink: 0,
        borderRadius: 'var(--radius-lg)',
        background: 'linear-gradient(135deg, var(--emerald-100), var(--emerald-50))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '3rem',
        color: 'var(--emerald-400)'
      }}>
        🌿
      </div>

      {/* Info */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{product.name}</h3>
            <p style={{ 
              color: 'var(--text-secondary)', 
              fontSize: '0.875rem',
              lineHeight: 1.6
            }}>
              {product.description}
            </p>
          </div>
          
          <div style={{ textAlign: 'right', marginLeft: '1rem' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.5rem' }}>
              ${product.price}
            </div>
            <div style={{ 
              display: 'inline-block',
              padding: '0.25rem 0.75rem',
              background: 'var(--emerald-50)',
              color: 'var(--emerald-700)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.75rem',
              fontWeight: 500
            }}>
              В наличии
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: 'auto' }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <FiShoppingCart size={16} />
            В корзину
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard