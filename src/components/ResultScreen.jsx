export default function ResultScreen({
  president,
  userVector,
  dimensions,
  dimensionLabels,
  imageUrl,
  onBackToIntro,
}) {
  function handleShare() {
    const text = `I got ${president.name}! Which president are you?`
    const url = window.location.origin

    if (navigator.share) {
      navigator.share({ title: 'Which President Are You?', text, url }).catch(() => {})
    } else {
      navigator.clipboard.writeText(`${text}\n${url}`).then(() => {
        alert('Copied to clipboard!')
      })
    }
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
        opacity: 0.4,
        marginBottom: 8,
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
      }}>
        {president.name}
      </h1>

      <p style={{
        fontSize: 15,
        color: '#0D132D',
        opacity: 0.5,
        marginBottom: 32,
      }}>
        {president.years}
      </p>

      {/* Portrait */}
      <div style={{
        width: 200,
        height: 200,
        borderRadius: '50%',
        overflow: 'hidden',
        border: '3px solid rgba(13, 19, 45, 0.15)',
        marginBottom: 32,
        backgroundColor: 'rgba(13, 19, 45, 0.04)',
      }}>
        <img
          src={imageUrl}
          alt={president.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 15%',
          }}
        />
      </div>

      {/* Tags */}
      <div style={{
        display: 'flex',
        gap: 8,
        marginBottom: 24,
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

      {/* Quote */}
      <blockquote style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: 18,
        fontStyle: 'italic',
        lineHeight: 1.5,
        color: '#0D132D',
        opacity: 0.7,
        textAlign: 'center',
        maxWidth: 480,
        marginBottom: 32,
        padding: '0 20px',
      }}>
        "{president.quote}"
      </blockquote>

      {/* Description */}
      <p style={{
        fontSize: 16,
        lineHeight: 1.7,
        color: '#0D132D',
        textAlign: 'center',
        maxWidth: 520,
        marginBottom: 40,
      }}>
        {president.description}
      </p>

      {/* Your Style */}
      <div style={{
        width: '100%',
        padding: '24px',
        backgroundColor: 'rgba(13, 19, 45, 0.04)',
        borderRadius: 8,
        marginBottom: 40,
      }}>
        <p style={{
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#0D132D',
          opacity: 0.4,
          marginBottom: 16,
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
                marginBottom: 6,
              }}>
                <span style={{ fontSize: 12, opacity: 0.6 }}>{labels[0]}</span>
                <span style={{
                  fontSize: 12,
                  fontWeight: 600,
                  opacity: 0.8,
                }}>
                  {dim}
                </span>
                <span style={{ fontSize: 12, opacity: 0.6 }}>{labels[1]}</span>
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

      {/* Actions */}
      <div style={{
        display: 'flex',
        gap: 12,
        marginBottom: 40,
      }}>
        <button
          onClick={handleShare}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 15,
            fontWeight: 600,
            padding: '14px 32px',
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
          Share Results
        </button>
        <button
          onClick={onBackToIntro}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 15,
            fontWeight: 500,
            padding: '14px 32px',
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
          Home
        </button>
      </div>
    </div>
  )
}
