import { useDispatch } from 'react-redux'
import { addToCart } from '../../store/slices/cartSlice'
import { FiShoppingCart, FiHeart, FiEye } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useState } from 'react'

const ProductCard = ({ product, index, viewMode = 'grid' }) => {
  const dispatch = useDispatch()
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  const handleAddToCart = (e) => {
    e.stopPropagation()
    dispatch(addToCart({
      ...product,
      quantity: 1
    }))
  }

  const handleLike = (e) => {
    e.stopPropagation()
    setIsLiked(!isLiked)
  }

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        whileHover={{ y: -4 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          background: 'var(--surface)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.5rem',
          display: 'flex',
          gap: '1.5rem',
          boxShadow: isHovered ? 'var(--shadow-lg)' : 'var(--shadow-md)',
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
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{product.name}</h3>
              <p style={{ 
                color: 'var(--text-secondary)', 
                marginBottom: '1rem',
                fontSize: '0.875rem',
                lineHeight: 1.6
              }}>
                {product.description}
              </p>
            </div>
            
            <div style={{ textAlign: 'right' }}>
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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button
                onClick={handleLike}
                style={{
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'transparent',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  color: isLiked ? '#ef4444' : 'var(--text)'
                }}
              >
                <FiHeart size={16} fill={isLiked ? '#ef4444' : 'none'} />
              </button>
              
              <button
                style={{
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'transparent',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer'
                }}
              >
                <FiEye size={16} />
              </button>
            </div>

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

  // Grid mode (стандартный вид)
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: 'var(--surface)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.5rem',
        boxShadow: isHovered ? 'var(--shadow-xl)' : 'var(--shadow-md)',
        transition: 'all var(--transition-normal)',
        cursor: 'pointer',
        position: 'relative'
      }}
    >
      {/* Like button */}
      <button
        onClick={handleLike}
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          zIndex: 2,
          width: '36px',
          height: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '50%',
          cursor: 'pointer',
          color: isLiked ? '#ef4444' : 'var(--text)'
        }}
      >
        <FiHeart size={16} fill={isLiked ? '#ef4444' : 'none'} />
      </button>

      {/* Image */}
      <div style={{
        height: '200px',
        width: '100%',
        borderRadius: 'var(--radius-lg)',
        background: 'linear-gradient(135deg, var(--emerald-100), var(--emerald-50))',
        marginBottom: '1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '4rem',
        color: 'var(--emerald-400)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        🌿
        
        {isHovered && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              position: 'absolute',
              bottom: '1rem',
              right: '1rem',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              padding: '0.5rem 1rem',
              fontSize: '0.75rem',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer'
            }}
          >
            <FiEye size={14} />
            Быстрый просмотр
          </motion.button>
        )}
      </div>
      
      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{product.name}</h3>
      <p style={{ 
        color: 'var(--text-secondary)', 
        marginBottom: '1rem',
        fontSize: '0.875rem',
        lineHeight: 1.6
      }}>
        {product.description}
      </p>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>
          ${product.price}
        </div>
        
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
    </motion.div>
  )
}

export default ProductCard