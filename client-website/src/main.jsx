import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Scroll animation observer
const initScrollAnimations = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active')
      }
    })
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  })

  // Observe all elements with reveal class
  document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal')
    revealElements.forEach(el => observer.observe(el))
  })

  return observer
}

// Error boundary for the entire app
const ErrorFallback = ({ error }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '2rem',
      textAlign: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>😵</h1>
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Oops! Something went wrong</h2>
      <p style={{ marginBottom: '2rem', opacity: 0.8 }}>
        We're sorry for the inconvenience. Please try refreshing the page.
      </p>
      <button 
        onClick={() => window.location.reload()}
        style={{
          background: 'white',
          color: '#667eea',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '50px',
          fontSize: '1rem',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => {
          e.target.style.transform = 'translateY(-2px)'
          e.target.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)'
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'translateY(0)'
          e.target.style.boxShadow = 'none'
        }}
      >
        Refresh Page
      </button>
    </div>
  )
}

// Main app container with error handling
const AppContainer = () => {
  useEffect(() => {
    // Initialize scroll animations
    const observer = initScrollAnimations()

    // Add loading animation removal
    const removeLoadingAnimation = () => {
      const loadingElement = document.getElementById('loading-animation')
      if (loadingElement) {
        loadingElement.style.opacity = '0'
        setTimeout(() => {
          loadingElement.remove()
        }, 500)
      }
    }

    // Remove loading animation when app is ready
    setTimeout(removeLoadingAnimation, 1000)

    return () => {
      observer.disconnect()
    }
  }, [])

  return <App />
}

// Create root with error boundary
const root = createRoot(document.getElementById('root'))

try {
  root.render(
    <StrictMode>
      <AppContainer />
    </StrictMode>,
  )
} catch (error) {
  root.render(<ErrorFallback error={error} />)
}