import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearCart } from '../../store/slices/cartSlice'
import { useNavigate } from 'react-router-dom'
import { FiCreditCard, FiCheck, FiLock, FiArrowLeft, FiAlertCircle, FiMail, FiPhone, FiMapPin, FiPackage } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

const CheckoutPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { items, totalPrice } = useSelector(state => state.cart)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  })

  const [errors, setErrors] = useState({})
  const [orderCompleted, setOrderCompleted] = useState(false)
  const [showSuccessToast, setShowSuccessToast] = useState(false)
  const [orderNumber] = useState(() => 'GS-' + Date.now().toString().slice(-8))

  // Валидация полей
  const validateForm = () => {
    const newErrors = {}

    // Имя (минимум 2 слова)
    if (!formData.name.trim() || formData.name.trim().split(' ').length < 2) {
      newErrors.name = 'Введите имя и фамилию'
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Введите корректный email'
    }

    // Телефон (российский формат)
    const phoneRegex = /^\+?[78][-\s]?\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Введите корректный номер телефона'
    }

    // Адрес
    if (!formData.address.trim()) {
      newErrors.address = 'Введите адрес доставки'
    }

    // Город
    if (!formData.city.trim()) {
      newErrors.city = 'Введите город'
    }

    // Индекс (6 цифр)
    const zipRegex = /^\d{6}$/
    if (!zipRegex.test(formData.zipCode)) {
      newErrors.zipCode = 'Индекс должен содержать 6 цифр'
    }

    // Номер карты (16 цифр)
    const cardNumber = formData.cardNumber.replace(/\s/g, '')
    const cardRegex = /^\d{16}$/
    if (!cardRegex.test(cardNumber)) {
      newErrors.cardNumber = 'Номер карты должен содержать 16 цифр'
    }

    // Срок действия (MM/YY)
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/
    if (!expiryRegex.test(formData.cardExpiry)) {
      newErrors.cardExpiry = 'Формат: MM/YY'
    } else {
      // Проверка срока действия
      const [month, year] = formData.cardExpiry.split('/')
      const now = new Date()
      const currentYear = now.getFullYear() % 100
      const currentMonth = now.getMonth() + 1
      
      if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
        newErrors.cardExpiry = 'Карта просрочена'
      }
    }

    // CVC (3 цифры)
    const cvcRegex = /^\d{3}$/
    if (!cvcRegex.test(formData.cardCvc)) {
      newErrors.cardCvc = 'CVC должен содержать 3 цифры'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('=== SUBMIT FORM ===')
    console.log('Form data:', formData)
    
    const isValid = validateForm()
    console.log('Is valid:', isValid)
    
    if (isValid) {
      console.log('Валидация пройдена успешно!')
      
      // Показываем toast уведомление
      setShowSuccessToast(true)
      
      // Очищаем корзину
      dispatch(clearCart())
      
      // Через 2 секунды показываем страницу подтверждения
      setTimeout(() => {
        setOrderCompleted(true)
        setShowSuccessToast(false)
      }, 2000)
    } else {
      console.log('Ошибки валидации:', errors)
      // Прокрутка к первой ошибке
      const firstError = Object.keys(errors)[0]
      if (firstError) {
        document.querySelector(`[name="${firstError}"]`)?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        })
      }
    }
  }

  // Форматирование номера карты
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ''
    const parts = []
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    
    if (parts.length) {
      return parts.join(' ')
    } else {
      return value
    }
  }

  // Форматирование срока действия
  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  const handleInputChange = (field, value) => {
    let formattedValue = value
    
    if (field === 'cardNumber') {
      formattedValue = formatCardNumber(value)
    } else if (field === 'cardExpiry') {
      formattedValue = formatExpiry(value)
    } else if (field === 'phone') {
      formattedValue = value.replace(/\D/g, '')
      if (formattedValue.length > 0) {
        if (!formattedValue.startsWith('7') && !formattedValue.startsWith('8')) {
          formattedValue = '7' + formattedValue
        }
        formattedValue = '+7 ' + formattedValue.substring(1, 4) + ' ' + formattedValue.substring(4, 7) + ' ' + formattedValue.substring(7, 9) + ' ' + formattedValue.substring(9, 11)
        formattedValue = formattedValue.trim()
      }
    } else if (field === 'zipCode') {
      formattedValue = value.replace(/\D/g, '').substring(0, 6)
    } else if (field === 'cardCvc') {
      formattedValue = value.replace(/\D/g, '').substring(0, 3)
    }

    setFormData({
      ...formData,
      [field]: formattedValue
    })

    // Очищаем ошибку при вводе
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: ''
      })
    }
  }

  if (items.length === 0 && !orderCompleted) {
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
          
          <Link to="/catalog" style={{ textDecoration: 'none' }}>
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

  if (orderCompleted) {
    return (
      <div style={{ paddingTop: 'calc(var(--header-height) + 4rem)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              maxWidth: '800px',
              margin: '0 auto',
              background: 'var(--surface)',
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-xl)',
              overflow: 'hidden'
            }}
          >
            {/* Success Header */}
            <div style={{
              background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
              color: 'white',
              padding: '3rem 2rem',
              textAlign: 'center'
            }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                style={{
                  width: '80px',
                  height: '80px',
                  margin: '0 auto 1.5rem',
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.5rem'
                }}
              >
                ✓
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}
              >
                Спасибо за заказ!
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={{ fontSize: '1.125rem', opacity: 0.9 }}
              >
                Ваш заказ #{orderNumber} успешно оформлен
              </motion.p>
            </div>

            {/* Order Details */}
            <div style={{ padding: '2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FiMapPin />
                    Детали доставки
                  </h3>
                  <div style={{ lineHeight: 1.6, paddingLeft: '1.5rem' }}>
                    <div style={{ marginBottom: '0.5rem' }}><strong>{formData.name}</strong></div>
                    <div style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <FiMapPin size={14} />
                      {formData.address}
                    </div>
                    <div style={{ marginBottom: '0.5rem' }}>{formData.city}, {formData.zipCode}</div>
                    <div style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <FiMail size={14} />
                      {formData.email}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <FiPhone size={14} />
                      {formData.phone}
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FiPackage />
                    Информация о заказе
                  </h3>
                  <div style={{ lineHeight: 1.6, paddingLeft: '1.5rem' }}>
                    <div style={{ marginBottom: '0.5rem' }}><strong>Номер заказа:</strong> {orderNumber}</div>
                    <div style={{ marginBottom: '0.5rem' }}><strong>Дата:</strong> {new Date().toLocaleDateString('ru-RU')}</div>
                    <div style={{ marginBottom: '0.5rem' }}><strong>Статус:</strong> <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Обрабатывается</span></div>
                    <div><strong>Ожидаемая доставка:</strong> 2-3 рабочих дня</div>
                  </div>
                </motion.div>
              </div>

              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                style={{
                  background: 'var(--stone-50)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.5rem',
                  marginBottom: '2rem'
                }}
              >
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Состав заказа</h3>
                {items.map((item, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0.75rem 0',
                    borderBottom: index < items.length - 1 ? '1px solid var(--border)' : 'none'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        background: 'var(--emerald-100)',
                        borderRadius: 'var(--radius-sm)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        🌿
                      </div>
                      <div>
                        <div style={{ fontWeight: 500 }}>{item.name}</div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                          {item.quantity} × ${item.price}
                        </div>
                      </div>
                    </div>
                    <div style={{ fontWeight: 600 }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
                
                <div style={{ 
                  height: '1px', 
                  background: 'var(--border)', 
                  margin: '1.5rem 0' 
                }} />
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '1.125rem', fontWeight: 600 }}>Итого к оплате</div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--primary)' }}>
                    ${(totalPrice * 1.1).toFixed(2)}
                  </div>
                </div>
              </motion.div>

              {/* Actions */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/catalog')}
                  style={{
                    padding: '1rem 2rem',
                    background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                    color: 'white',
                    border: 'none',
                    borderRadius: 'var(--radius-lg)',
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Продолжить покупки
                </motion.button>
                
                <button
                  onClick={() => window.print()}
                  style={{
                    padding: '1rem 2rem',
                    background: 'transparent',
                    color: 'var(--text)',
                    border: '2px solid var(--border)',
                    borderRadius: 'var(--radius-lg)',
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  📄 Распечатать чек
                </button>
              </motion.div>

              {/* Email Confirmation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                style={{
                  marginTop: '2rem',
                  padding: '1rem',
                  background: 'var(--emerald-50)',
                  borderRadius: 'var(--radius-md)',
                  textAlign: 'center',
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <FiMail />
                Подтверждение заказа отправлено на {formData.email}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ paddingTop: 'calc(var(--header-height) + 2rem)' }}>
      {/* Success Toast */}
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            style={{
              position: 'fixed',
              top: '100px',
              right: '20px',
              zIndex: 1000,
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: 'white',
              padding: '1.5rem 2rem',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-xl)',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              minWidth: '300px'
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              style={{
                width: '40px',
                height: '40px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem'
              }}
            >
              ✓
            </motion.div>
            <div>
              <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Заказ принят!</div>
              <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>
                Перенаправляем на страницу подтверждения...
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <button
            onClick={() => navigate('/cart')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              fontSize: '0.875rem',
              cursor: 'pointer'
            }}
          >
            <FiArrowLeft />
            Вернуться в корзину
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiLock />
            <span style={{ fontSize: '0.875rem', color: 'var(--primary)' }}>
              Безопасное соединение
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '3rem' }}>
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              background: 'var(--surface)',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Детали заказа</h2>
            
            <form onSubmit={handleSubmit}>
              {/* Имя и фамилия */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                  Имя и фамилия *
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Иван Иванов"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: `1px solid ${errors.name ? '#ef4444' : 'var(--border)'}`,
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.875rem',
                    background: errors.name ? '#fef2f2' : 'var(--surface)',
                    transition: 'border-color 0.2s'
                  }}
                />
                {errors.name && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}
                  >
                    <FiAlertCircle size={12} />
                    {errors.name}
                  </motion.div>
                )}
              </div>

              {/* Email и телефон */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="ivan@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: `1px solid ${errors.email ? '#ef4444' : 'var(--border)'}`,
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.875rem',
                      background: errors.email ? '#fef2f2' : 'var(--surface)'
                    }}
                  />
                  {errors.email && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}
                    >
                      <FiAlertCircle size={12} />
                      {errors.email}
                    </motion.div>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+7 999 123 45 67"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: `1px solid ${errors.phone ? '#ef4444' : 'var(--border)'}`,
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.875rem',
                      background: errors.phone ? '#fef2f2' : 'var(--surface)'
                    }}
                  />
                  {errors.phone && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}
                    >
                      <FiAlertCircle size={12} />
                      {errors.phone}
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Адрес */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                  Адрес доставки *
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="ул. Примерная, д. 123, кв. 45"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: `1px solid ${errors.address ? '#ef4444' : 'var(--border)'}`,
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.875rem',
                    background: errors.address ? '#fef2f2' : 'var(--surface)'
                  }}
                />
                {errors.address && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}
                  >
                    <FiAlertCircle size={12} />
                    {errors.address}
                  </motion.div>
                )}
              </div>

              {/* Город и индекс */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                    Город *
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="Москва"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: `1px solid ${errors.city ? '#ef4444' : 'var(--border)'}`,
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.875rem',
                      background: errors.city ? '#fef2f2' : 'var(--surface)'
                    }}
                  />
                  {errors.city && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}
                    >
                      <FiAlertCircle size={12} />
                      {errors.city}
                    </motion.div>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                    Индекс *
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="123456"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: `1px solid ${errors.zipCode ? '#ef4444' : 'var(--border)'}`,
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.875rem',
                      background: errors.zipCode ? '#fef2f2' : 'var(--surface)'
                    }}
                  />
                  {errors.zipCode && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}
                    >
                      <FiAlertCircle size={12} />
                      {errors.zipCode}
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Карта */}
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <FiCreditCard />
                  <h3 style={{ fontSize: '1.125rem', margin: 0 }}>Данные карты</h3>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                    Номер карты *
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: `1px solid ${errors.cardNumber ? '#ef4444' : 'var(--border)'}`,
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.875rem',
                      background: errors.cardNumber ? '#fef2f2' : 'var(--surface)'
                    }}
                  />
                  {errors.cardNumber && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}
                    >
                      <FiAlertCircle size={12} />
                      {errors.cardNumber}
                    </motion.div>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                      Срок действия *
                    </label>
                    <input
                      type="text"
                      name="cardExpiry"
                      placeholder="MM/YY"
                      value={formData.cardExpiry}
                      onChange={(e) => handleInputChange('cardExpiry', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        border: `1px solid ${errors.cardExpiry ? '#ef4444' : 'var(--border)'}`,
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.875rem',
                        background: errors.cardExpiry ? '#fef2f2' : 'var(--surface)'
                      }}
                    />
                    {errors.cardExpiry && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}
                      >
                        <FiAlertCircle size={12} />
                        {errors.cardExpiry}
                      </motion.div>
                    )}
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                      CVC *
                    </label>
                    <input
                      type="text"
                      name="cardCvc"
                      placeholder="123"
                      value={formData.cardCvc}
                      onChange={(e) => handleInputChange('cardCvc', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        border: `1px solid ${errors.cardCvc ? '#ef4444' : 'var(--border)'}`,
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.875rem',
                        background: errors.cardCvc ? '#fef2f2' : 'var(--surface)'
                      }}
                    />
                    {errors.cardCvc && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}
                      >
                        <FiAlertCircle size={12} />
                        {errors.cardCvc}
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
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
                  gap: '0.75rem'
                }}
              >
                <FiCheck />
                Подтвердить заказ
              </motion.button>
            </form>
          </motion.div>

          {/* Order Summary */}
          <div style={{
            position: 'sticky',
            top: 'calc(var(--header-height) + 2rem)',
            alignSelf: 'start'
          }}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                background: 'var(--surface)',
                borderRadius: 'var(--radius-xl)',
                padding: '2rem',
                boxShadow: 'var(--shadow-lg)',
                marginBottom: '1.5rem'
              }}
            >
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Ваш заказ</h2>
              
              <div style={{ marginBottom: '1.5rem' }}>
                {items.map((item, index) => (
                  <div key={index} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    padding: '0.5rem 0',
                    borderBottom: index < items.length - 1 ? '1px solid var(--border)' : 'none'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 500 }}>{item.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        {item.quantity} × ${item.price}
                      </div>
                    </div>
                    <div style={{ fontWeight: 600 }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                height: '1px',
                background: 'var(--border)',
                margin: '1rem 0'
              }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1.125rem', fontWeight: 600 }}>Итого</span>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--primary)' }}>
                    ${(totalPrice * 1.1).toFixed(2)}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    включая налоги
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                background: 'linear-gradient(135deg, var(--emerald-50), var(--emerald-100))',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔒</div>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                Безопасная оплата
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                SSL шифрование
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage