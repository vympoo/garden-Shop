import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '100px 20px', 
          textAlign: 'center',
          background: 'var(--surface)',
          borderRadius: 'var(--radius-xl)',
          margin: '20px',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>😟</div>
          <h2 style={{ marginBottom: '1rem' }}>Что-то пошло не так</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            {this.state.error?.message || 'Произошла ошибка'}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'var(--primary)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer'
            }}
          >
            Обновить страницу
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary