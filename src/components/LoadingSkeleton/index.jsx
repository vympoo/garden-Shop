import { motion } from 'framer-motion'

const LoadingSkeleton = () => {
  return (
    <div className="container" style={{ paddingTop: 'calc(var(--header-height) + 4rem)' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <motion.div
            key={item}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: item * 0.1 }}
            style={{
              background: 'var(--surface)',
              borderRadius: 'var(--radius-xl)',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            <div style={{
              height: '220px',
              width: '100%',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--stone-100)',
              marginBottom: '1.25rem',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <motion.div
                animate={{
                  backgroundPosition: ['200% 0', '-200% 0']
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                  backgroundSize: '200% 100%'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <div style={{
                height: '24px',
                width: '60%',
                background: 'var(--stone-100)',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '0.75rem'
              }} />
              <div style={{
                height: '16px',
                width: '90%',
                background: 'var(--stone-100)',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '0.5rem'
              }} />
              <div style={{
                height: '16px',
                width: '70%',
                background: 'var(--stone-100)',
                borderRadius: 'var(--radius-sm)'
              }} />
            </div>
            
            <div style={{
              height: '48px',
              width: '100%',
              background: 'var(--stone-100)',
              borderRadius: 'var(--radius-lg)'
            }} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default LoadingSkeleton