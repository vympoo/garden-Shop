import { FiInstagram, FiTwitter, FiFacebook, FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import { motion } from 'framer-motion'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer style={{
      background: 'linear-gradient(135deg, var(--stone-900), var(--stone-800))',
      color: 'var(--stone-100)',
      marginTop: '6rem',
      padding: '4rem 0 2rem'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          {/* Company Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                fontWeight: 'bold'
              }}>
                G
              </div>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>GARDEN</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>digital greenhouse</div>
              </div>
            </div>
            
            <p style={{ fontSize: '0.875rem', lineHeight: 1.7, opacity: 0.8, marginBottom: '1.5rem' }}>
              Мы создаем цифровую оранжерею, где природа встречает технологию. 
              Каждое растение — это история, которую мы доставляем прямо к вам.
            </p>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              {[FiInstagram, FiTwitter, FiFacebook].map((Icon, index) => (
                <motion.a
                  key={index}
                  whileHover={{ y: -4 }}
                  href="#"
                  style={{
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--stone-100)',
                    textDecoration: 'none'
                  }}
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '1.5rem', fontWeight: 600 }}>Магазин</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {['Все растения', 'Комнатные', 'Суккуленты', 'Цветущие', 'Большие растения'].map((item, index) => (
                <li key={index} style={{ marginBottom: '0.75rem' }}>
                  <a href="#" style={{
                    color: 'var(--stone-300)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    transition: 'color var(--transition-fast)'
                  }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '1.5rem', fontWeight: 600 }}>Поддержка</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {['Контакты', 'Доставка', 'Возврат', 'Уход за растениями', 'FAQ'].map((item, index) => (
                <li key={index} style={{ marginBottom: '0.75rem' }}>
                  <a href="#" style={{
                    color: 'var(--stone-300)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    transition: 'color var(--transition-fast)'
                  }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '1.5rem', fontWeight: 600 }}>Контакты</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <FiMapPin style={{ opacity: 0.7 }} />
                <span style={{ fontSize: '0.875rem', opacity: 0.8 }}>Москва, ул. Цветочная, 42</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <FiPhone style={{ opacity: 0.7 }} />
                <span style={{ fontSize: '0.875rem', opacity: 0.8 }}>+7 (999) 123-45-67</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <FiMail style={{ opacity: 0.7 }} />
                <span style={{ fontSize: '0.875rem', opacity: 0.8 }}>hello@garden.shop</span>
              </div>
            </div>
            
            {/* Newsletter */}
            <div style={{ marginTop: '2rem' }}>
              <p style={{ fontSize: '0.875rem', marginBottom: '0.75rem', opacity: 0.8 }}>Подпишитесь на рассылку</p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="email"
                  placeholder="Ваш email"
                  style={{
                    flex: 1,
                    padding: '0.75rem 1rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: 'var(--radius-md)',
                    color: 'white',
                    fontSize: '0.875rem',
                    outline: 'none'
                  }}
                />
                <button style={{
                  padding: '0.75rem 1.5rem',
                  background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  cursor: 'pointer'
                }}>
                  →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.875rem',
          opacity: 0.7
        }}>
          <div>
            © {currentYear} Garden Shop. Все права защищены.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Политика конфиденциальности</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Условия использования</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer