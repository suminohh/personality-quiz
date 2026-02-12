import { useState, useEffect } from 'react'

export default function IntroScreen({ onStart }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
  }, [])

  const stagger = (index) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(16px)',
    transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s ease ${index * 0.12}s`,
  })

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80vh',
      paddingBottom: '15vh',
      textAlign: 'center',
    }}>

      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 14,
        fontWeight: 600,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: '#0D132D',
        opacity: visible ? 0.5 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.6s ease 0s, transform 0.6s ease 0s`,
        marginBottom: 16,
      }}>
        Personality Quiz
      </p>

      <h1 style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: 'clamp(36px, 7vw, 56px)',
        fontWeight: 700,
        lineHeight: 1.1,
        color: '#0D132D',
        marginBottom: 24,
        ...stagger(1),
      }}>
        Which President<br />Are You?
      </h1>

      <p style={{
        fontSize: 17,
        lineHeight: 1.6,
        color: '#0D132D',
        maxWidth: 440,
        marginBottom: 40,
        ...stagger(2),
      }}>
        Answer 15 quick questions about how you lead, decide, and communicate.
        We'll match you with one of 10 U.S. presidents who shares your style.
      </p>

      <button
        onClick={onStart}
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 16,
          fontWeight: 600,
          padding: '16px 48px',
          backgroundColor: '#0D132D',
          color: '#F3F0D6',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer',
          letterSpacing: '0.02em',
          transition: `opacity 0.6s ease ${3 * 0.12}s, transform 0.6s ease ${3 * 0.12}s`,
          ...stagger(3),
        }}
        onMouseEnter={(e) => e.target.style.opacity = '0.85'}
        onMouseLeave={(e) => e.target.style.opacity = '1'}
      >
        Start Quiz
      </button>

      <p style={{
        fontSize: 13,
        color: '#0D132D',
        marginTop: 20,
        ...stagger(4),
      }}>
        Takes about 3 minutes
      </p>

      <img
        src="/images/rushmore.png"
        alt=""
        style={{
          position: 'fixed',
          bottom: 'clamp(-140px, -10vw, -40px)',
          left: 0,
          width: '100vw',
          minWidth: 600,
          opacity: visible ? 0.08 : 0,
          transition: 'opacity 1s ease 0.4s',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
