import { useState, useEffect } from 'react'

export default function ResultScreen({
  president,
  userVector,
  dimensions,
  dimensionLabels,
  imageUrl,
  onBackToIntro,
}) {
  const [visible, setVisible] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
  }, [])

  const stagger = (index) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(16px)',
    transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s ease ${index * 0.12}s`,
  })

  const shareText = `I got ${president.name}! Which president are you?`
  const shareUrl = window.location.origin

  function handleCopyLink() {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  function handleFacebook() {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
      '_blank'
    )
  }

  function handleTwitter() {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      '_blank'
    )
  }
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: 20,
    }}>
      {/* Header */}
      <p style={{
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: '#0D132D',
        marginBottom: 8,
        ...stagger(0),
        opacity: visible ? 0.4 : 0,
      }}>
        Your Result
      </p>

      <h1 style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: 'clamp(32px, 6vw, 48px)',
        fontWeight: 700,
        lineHeight: 1.1,
        color: '#0D132D',
        textAlign: 'center',
        marginBottom: 4,
        ...stagger(1),
      }}>
        {president.name}
      </h1>

      <p style={{
        fontSize: 15,
        color: '#0D132D',
        marginBottom: 32,
        ...stagger(2),
        opacity: visible ? 0.5 : 0,
      }}>
        {president.years}
      </p>

      {/* Portrait */}
      <div style={{
        width: 'clamp(180px, 35vw, 240px)',
        height: 'clamp(180px, 35vw, 240px)',
        borderRadius: '50%',
        overflow: 'hidden',
        border: '3px solid rgba(13, 19, 45, 0.15)',
        marginBottom: 32,
        backgroundColor: 'rgba(13, 19, 45, 0.04)',
        ...stagger(3),
      }}>
        <img
          src={imageUrl}
          alt={president.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'sepia(40%) brightness(0.95)',
          }}
        />
      </div>

      {/* Quote */}
      <blockquote style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: 18,
        fontStyle: 'italic',
        lineHeight: 1.5,
        color: '#0D132D',
        textAlign: 'center',
        maxWidth: 480,
        marginBottom: 40,
        padding: '0 20px',
        ...stagger(4),
        opacity: visible ? 0.7 : 0,
      }}>
        "{president.quote}"
      </blockquote>

      {/* Divider */}
      <div style={{
        width: 48,
        height: 1,
        backgroundColor: 'rgba(13, 19, 45, 0.2)',
        marginBottom: 40,
        ...stagger(5),
      }} />

      {/* Deep dive card */}
      <div style={{
        width: '100%',
        padding: '28px 24px 32px',
        backgroundColor: 'rgba(13, 19, 45, 0.04)',
        borderRadius: 8,
        marginBottom: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        ...stagger(6),
      }}>
        {/* Tags */}
        <div style={{
          display: 'flex',
          gap: 8,
          marginBottom: 20,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          {president.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                padding: '6px 14px',
                backgroundColor: 'rgba(13, 19, 45, 0.08)',
                borderRadius: 20,
                color: '#0D132D',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <p style={{
          fontSize: 16,
          lineHeight: 1.7,
          color: '#0D132D',
          textAlign: 'center',
          maxWidth: 520,
          marginBottom: 28,
        }}>
          {president.description}
        </p>

        {/* Divider within card */}
        <div style={{
          width: '100%',
          height: 1,
          backgroundColor: 'rgba(13, 19, 45, 0.1)',
          marginBottom: 24,
        }} />

        {/* Personality Profile */}
        <div style={{ width: '100%' }}>
          <p style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#0D132D',
            opacity: 0.4,
            marginBottom: 20,
            textAlign: 'center',
          }}>
            Your Personality Profile
          </p>

          {dimensions.map((dim, i) => {
            const labels = dimensionLabels[dim]
            const value = userVector[i]
            const percentage = ((value - 1) / 3) * 100

            return (
              <div key={dim} style={{ marginBottom: i < dimensions.length - 1 ? 28 : 0 }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                }}>
                  <span style={{ fontSize: 12, opacity: 0.6, flex: 1, textAlign: 'left' }}>{labels[0]}</span>
                  <span style={{
                    fontSize: 12,
                    fontWeight: 600,
                    opacity: 0.8,
                    textAlign: 'center',
                  }}>
                    {dim}
                  </span>
                  <span style={{ fontSize: 12, opacity: 0.6, flex: 1, textAlign: 'right' }}>{labels[1]}</span>
                </div>
                <div style={{
                  width: '100%',
                  height: 6,
                  backgroundColor: 'rgba(13, 19, 45, 0.1)',
                  borderRadius: 3,
                  position: 'relative',
                }}>
                  <div style={{
                    position: 'absolute',
                    left: `${percentage}%`,
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 14,
                    height: 14,
                    backgroundColor: '#0D132D',
                    borderRadius: '50%',
                    border: '2px solid #F3F0D6',
                  }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Divider */}
      <div style={{
        width: 48,
        height: 1,
        backgroundColor: 'rgba(13, 19, 45, 0.2)',
        marginBottom: 40,
        ...stagger(7),
      }} />

      {/* Share actions */}
      <div style={{
        display: 'flex',
        gap: 12,
        marginBottom: 16,
        ...stagger(8),
      }}>
        <button
          onClick={handleCopyLink}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 14,
            fontWeight: 600,
            padding: '12px 20px',
            backgroundColor: '#0D132D',
            color: '#F3F0D6',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => e.target.style.opacity = '0.85'}
          onMouseLeave={(e) => e.target.style.opacity = '1'}
        >
          {copied ? 'Copied!' : 'Copy Link'}
        </button>
        <button
          onClick={handleTwitter}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 14,
            fontWeight: 600,
            padding: '12px 20px',
            backgroundColor: 'transparent',
            color: '#0D132D',
            border: '1px solid rgba(13, 19, 45, 0.2)',
            borderRadius: 4,
            cursor: 'pointer',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => e.target.style.opacity = '0.7'}
          onMouseLeave={(e) => e.target.style.opacity = '1'}
        >
          Twitter
        </button>
        <button
          onClick={handleFacebook}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 14,
            fontWeight: 600,
            padding: '12px 20px',
            backgroundColor: 'transparent',
            color: '#0D132D',
            border: '1px solid rgba(13, 19, 45, 0.2)',
            borderRadius: 4,
            cursor: 'pointer',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => e.target.style.opacity = '0.7'}
          onMouseLeave={(e) => e.target.style.opacity = '1'}
        >
          Facebook
        </button>
      </div>

      <button
        onClick={onBackToIntro}
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 13,
          fontWeight: 500,
          color: '#0D132D',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          marginBottom: 40,
          ...stagger(9),
          opacity: visible ? 0.4 : 0,
        }}
        onMouseEnter={(e) => e.target.style.opacity = '0.7'}
        onMouseLeave={(e) => e.target.style.opacity = '0.4'}
      >
        Home
      </button>
    </div>
  )
}
