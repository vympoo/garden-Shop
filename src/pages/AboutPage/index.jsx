import { motion } from 'framer-motion'
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaLeaf, FaHandsHelping, FaRocket, FaUsers } from 'react-icons/fa'

const AboutPage = ({ isMobile = false }) => {
  const teamMembers = [
    { id: 1, name: 'Джамбулат Лигидов', role: 'Основатель & Full-stack разработчик', bio: 'Студент, увлечённый созданием современных веб-приложений' },
    { id: 2, name: 'Алина Петрова', role: 'UI/UX дизайнер', bio: 'Создаёт удобные и красивые интерфейсы' },
    { id: 3, name: 'Марк Волков', role: 'Frontend разработчик', bio: 'Специализируется на React и анимациях' },
    { id: 4, name: 'Карина Иванова', role: 'Контент-менеджер', bio: 'Заботится о качестве контента и описаний' }
  ]

  const values = [
    { icon: <FaLeaf />, title: 'Экологичность', desc: 'Продвигаем устойчивое потребление и экологичные продукты' },
    { icon: <FaHandsHelping />, title: 'Поддержка', desc: 'Всегда на связи с нашими клиентами' },
    { icon: <FaRocket />, title: 'Инновации', desc: 'Постоянно улучшаем наш сервис и ассортимент' },
    { icon: <FaUsers />, title: 'Сообщество', desc: 'Строим сообщество единомышленников' }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: isMobile ? '1rem' : '2rem'
      }}
    >
      {/* Hero Section */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          textAlign: 'center',
          marginBottom: isMobile ? '2rem' : '3rem'
        }}
      >
        <h1 style={{
          fontSize: isMobile ? '1.75rem' : '2.5rem',
          fontWeight: 700,
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, var(--primary), var(--emerald-500))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          О нашем магазине
        </h1>
        <p style={{
          fontSize: isMobile ? '1rem' : '1.125rem',
          color: 'var(--text-secondary)',
          maxWidth: '800px',
          margin: '0 auto',
          lineHeight: 1.6
        }}>
          Мы — команда энтузиастов, создавшая этот магазин с любовью к качественным товарам и отличному сервису. 
          Наша цель — сделать покупки удобными, приятными и доступными для каждого.
        </p>
      </motion.div>

      {/* История */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{
          background: 'var(--surface)',
          borderRadius: 'var(--radius-xl)',
          padding: isMobile ? '1.5rem' : '2rem',
          marginBottom: isMobile ? '2rem' : '3rem',
          boxShadow: 'var(--shadow-md)'
        }}
      >
        <h2 style={{
          fontSize: isMobile ? '1.25rem' : '1.5rem',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <span style={{ color: 'var(--primary)' }}>Наша история</span>
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '1.5rem' : '2rem',
          alignItems: 'center'
        }}>
          <div>
            <p style={{ marginBottom: '1rem', lineHeight: 1.6 }}>
              Всё началось с небольшого студенческого проекта, который быстро вырос в полноценный онлайн-магазин. 
              Мы поняли, что можем предложить не просто товары, а целый опыт покупок — от удобного сайта до 
              внимательной поддержки.
            </p>
            <p style={{ lineHeight: 1.6 }}>
              Сегодня мы продолжаем развиваться, добавляя новые категории товаров и улучшая сервис. 
              Каждый день мы работаем над тем, чтобы ваш шопинг был в удовольствие!
            </p>
          </div>
          <div style={{
            height: isMobile ? '200px' : '250px',
            borderRadius: 'var(--radius-lg)',
            background: 'linear-gradient(135deg, var(--emerald-100), var(--emerald-50))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '4rem',
            color: 'var(--emerald-400)'
          }}>
            🛍️
          </div>
        </div>
      </motion.div>

      {/* Ценности */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ marginBottom: isMobile ? '2rem' : '3rem' }}
      >
        <h2 style={{
          fontSize: isMobile ? '1.25rem' : '1.5rem',
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          Наши ценности
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '1rem'
        }}>
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              style={{
                background: 'var(--surface)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                boxShadow: 'var(--shadow-sm)',
                textAlign: 'center'
              }}
            >
              <div style={{
                fontSize: '2rem',
                color: 'var(--primary)',
                marginBottom: '1rem'
              }}>
                {value.icon}
              </div>
              <h3 style={{
                fontSize: '1.125rem',
                marginBottom: '0.5rem'
              }}>
                {value.title}
              </h3>
              <p style={{
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.5
              }}>
                {value.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Команда */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{
          background: 'var(--surface)',
          borderRadius: 'var(--radius-xl)',
          padding: isMobile ? '1.5rem' : '2rem',
          marginBottom: isMobile ? '2rem' : '3rem',
          boxShadow: 'var(--shadow-md)'
        }}
      >
        <h2 style={{
          fontSize: isMobile ? '1.25rem' : '1.5rem',
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          Наша команда
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '1rem'
        }}>
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              style={{
                padding: '1.5rem',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--background)',
                textAlign: 'center'
              }}
            >
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--primary-light), var(--primary))',
                margin: '0 auto 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                color: 'white'
              }}>
                {member.name.charAt(0)}
              </div>
              <h3 style={{
                fontSize: '1.125rem',
                marginBottom: '0.25rem'
              }}>
                {member.name}
              </h3>
              <p style={{
                fontSize: '0.875rem',
                color: 'var(--primary)',
                marginBottom: '0.5rem',
                fontWeight: 500
              }}>
                {member.role}
              </p>
              <p style={{
                fontSize: '0.8125rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.5
              }}>
                {member.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Контакты */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{
          background: 'linear-gradient(135deg, var(--primary-light), var(--primary))',
          borderRadius: 'var(--radius-xl)',
          padding: isMobile ? '1.5rem' : '2rem',
          color: 'white'
        }}
      >
        <h2 style={{
          fontSize: isMobile ? '1.25rem' : '1.5rem',
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          Контакты
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: '1.5rem',
          textAlign: 'center'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <FaMapMarkerAlt size={isMobile ? 24 : 32} style={{ marginBottom: '0.75rem' }} />
            <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>Адрес</h3>
            <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>
              г. Нальчик, ул. Орджоникидзе, 172
            </p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <FaPhone size={isMobile ? 24 : 32} style={{ marginBottom: '0.75rem' }} />
            <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>Телефон</h3>
            <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>
              +7 (XXX) XXX-XX-XX
            </p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <FaEnvelope size={isMobile ? 24 : 32} style={{ marginBottom: '0.75rem' }} />
            <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>Email</h3>
            <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>
              info@ecoshop.ru
            </p>
          </div>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        style={{
          textAlign: 'center',
          marginTop: '3rem',
          padding: '2rem',
          borderRadius: 'var(--radius-xl)',
          background: 'var(--emerald-50)'
        }}
      >
        <h2 style={{
          fontSize: isMobile ? '1.25rem' : '1.5rem',
          marginBottom: '1rem'
        }}>
          Готовы начать покупки?
        </h2>
        <p style={{
          marginBottom: '1.5rem',
          color: 'var(--text-secondary)'
        }}>
          Присоединяйтесь к тысячам довольных клиентов!
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: '1rem 2rem',
            background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Перейти в каталог
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

export default AboutPage