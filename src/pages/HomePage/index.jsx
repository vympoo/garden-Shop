import { useSelector } from 'react-redux'
import ProductCard from '../../components/ProductCard'
import { FiArrowRight, FiChevronRight, FiStar, FiTruck, FiShield, FiHeadphones } from 'react-icons/fi'
import { motion } from 'framer-motion'

const HomePage = () => {
  const { products } = useSelector(state => state.products)

  const features = [
    { icon: <FiTruck />, title: 'Бесплатная доставка', desc: 'При заказе от $50' },
    { icon: <FiShield />, title: 'Гарантия качества', desc: '30 дней на возврат' },
    { icon: <FiHeadphones />, title: 'Поддержка 24/7', desc: 'Консультации по уходу' },
    { icon: <FiStar />, title: 'Премиум растения', desc: 'Отборные экземпляры' },
  ]

  return (
    <div style={{ paddingTop: 'calc(var(--header-height) + 2rem)' }}>
      {/* Hero Section */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span style={{
                display: 'inline-block',
                padding: '0.5rem 1rem',
                background: 'var(--emerald-100)',
                color: 'var(--emerald-700)',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.875rem',
                fontWeight: 600,
                marginBottom: '1.5rem'
              }}>
                🌱 Цифровая оранжерея
              </span>
              
              <h1 style={{ 
                fontSize: '3.5rem',
                lineHeight: 1.1,
                marginBottom: '1.5rem',
                background: 'linear-gradient(135deg, var(--text), var(--primary-dark))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Где природа встречает технологию
              </h1>
              
              <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '500px' }}>
                Откройте для себя коллекцию премиум растений, выращенных с заботой и доставленных прямо к вашей двери.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
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
                  В каталог
                  <FiArrowRight />
                </motion.button>
                
                <button style={{
                  padding: '1rem 2rem',
                  background: 'transparent',
                  color: 'var(--text)',
                  border: '2px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}>
                  О нас
                </button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                position: 'relative',
                height: '500px'
              }}
            >
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: 'var(--radius-2xl)',
                background: 'linear-gradient(135deg, var(--emerald-100), var(--emerald-50))',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  style={{
                    position: 'absolute',
                    top: '20%',
                    left: '20%',
                    fontSize: '4rem',
                    color: 'var(--emerald-300)'
                  }}
                >
                  🌿
                </motion.div>
                
                <motion.div
                  animate={{ y: [0, 20, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  style={{
                    position: 'absolute',
                    bottom: '30%',
                    right: '20%',
                    fontSize: '3rem',
                    color: 'var(--emerald-400)'
                  }}
                >
                  🌵
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '4rem 0', background: 'var(--stone-50)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{
                  padding: '2rem',
                  background: 'var(--surface)',
                  borderRadius: 'var(--radius-xl)',
                  textAlign: 'center',
                  boxShadow: 'var(--shadow-md)',
                  transition: 'all var(--transition-normal)'
                }}
                whileHover={{ y: -8, boxShadow: 'var(--shadow-xl)' }}
              >
                <div style={{
                  width: '60px',
                  height: '60px',
                  margin: '0 auto 1.5rem',
                  background: 'linear-gradient(135deg, var(--emerald-100), var(--emerald-50))',
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  color: 'var(--primary)'
                }}>
                  {feature.icon}
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{feature.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
            <div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Популярные растения</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Отборная коллекция для вашего дома</p>
            </div>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              background: 'transparent',
              color: 'var(--primary)',
              border: '2px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}>
              Смотреть все
              <FiChevronRight />
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {products && products.length > 0 ? (
              products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))
            ) : (
              <p>Товары временно отсутствуют</p>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage