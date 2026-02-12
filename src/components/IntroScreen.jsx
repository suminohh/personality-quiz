export default function IntroScreen({ onStart }) {
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
        opacity: 0.5,
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
      }}>
        Which President<br />Are You?
      </h1>

      <p style={{
        fontSize: 17,
        lineHeight: 1.6,
        color: '#0D132D',
        opacity: 0.7,
        maxWidth: 440,
        marginBottom: 40,
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
          transition: 'opacity 0.2s',
        }}
        onMouseEnter={(e) => e.target.style.opacity = '0.85'}
        onMouseLeave={(e) => e.target.style.opacity = '1'}
      >
        Start Quiz
      </button>

      <p style={{
        fontSize: 13,
        color: '#0D132D',
        opacity: 0.4,
        marginTop: 20,
      }}>
        Takes about 3 minutes
      </p>

      <img
        src="/images/rushmore.png"
        alt=""
        style={{
          position: 'fixed',
          bottom: -80,
          left: 0,
          width: '100vw',
          minWidth: 600,
          opacity: 0.08,
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
