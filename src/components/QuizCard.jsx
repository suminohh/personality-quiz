import { useState, useEffect } from 'react'

export default function QuizCard({ question, questionNumber, totalQuestions, onAnswer, onBack }) {
  const [selected, setSelected] = useState(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    requestAnimationFrame(() => {
      setVisible(true)
    })
  }, [question.id])

  function handleSelect(score) {
    if (selected !== null) return
    setSelected(score)
    setTimeout(() => {
      setVisible(false)
    }, 150)
    setTimeout(() => {
      setSelected(null)
      onAnswer(score)
    }, 400)
  }

  const progress = ((questionNumber - 1) / totalQuestions) * 100

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '80vh',
    }}>
      {/* Progress bar */}
      <div style={{
        width: '100%',
        height: 4,
        backgroundColor: 'rgba(13, 19, 45, 0.1)',
        borderRadius: 2,
        marginBottom: 12,
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${progress}%`,
          backgroundColor: '#0D132D',
          borderRadius: 2,
          transition: 'width 0.4s ease',
        }} />
      </div>

      {/* Back button + question counter */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 32,
      }}>
        {onBack && (
          <button
            onClick={onBack}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              color: '#0D132D',
              opacity: 0.4,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
            onMouseEnter={(e) => e.target.style.opacity = '0.7'}
            onMouseLeave={(e) => e.target.style.opacity = '0.4'}
          >
            &larr;
          </button>
        )}
        <p style={{
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#0D132D',
          opacity: 0.4,
          margin: 0,
        }}>
          {questionNumber} of {totalQuestions}
        </p>
      </div>


      <div style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.25s ease',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}>
      {/* Question */}
      <h2 style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: 'clamp(22px, 4.5vw, 30px)',
        fontWeight: 600,
        lineHeight: 1.3,
        color: '#0D132D',
        marginBottom: 32,
      }}>
        {question.question}
      </h2>

      {/* Answer options */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        marginBottom: 32,
      }}>
        {question.answers.map((answer, i) => {
          const isSelected = selected === answer.score
          return (
            <button
              key={i}
              onClick={() => handleSelect(answer.score)}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                lineHeight: 1.5,
                padding: '16px 20px',
                backgroundColor: isSelected ? '#0D132D' : 'rgba(13, 19, 45, 0.04)',
                color: isSelected ? '#F3F0D6' : '#0D132D',
                border: '1px solid rgba(13, 19, 45, 0.12)',
                borderRadius: 4,
                cursor: selected !== null ? 'default' : 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
                opacity: selected !== null && !isSelected ? 0.5 : 1,
              }}
              onMouseEnter={(e) => {
                if (selected === null) {
                  e.target.style.backgroundColor = 'rgba(13, 19, 45, 0.08)'
                  e.target.style.borderColor = 'rgba(13, 19, 45, 0.25)'
                }
              }}
              onMouseLeave={(e) => {
                if (selected === null) {
                  e.target.style.backgroundColor = 'rgba(13, 19, 45, 0.04)'
                  e.target.style.borderColor = 'rgba(13, 19, 45, 0.12)'
                }
              }}
            >
              {answer.text}
            </button>
          )
        })}
      </div>

      {/* Fun fact */}
      <div style={{
        marginTop: 'auto',
        padding: '16px 20px',
        backgroundColor: 'rgba(13, 19, 45, 0.04)',
        borderLeft: '3px solid rgba(13, 19, 45, 0.15)',
        borderRadius: '0 4px 4px 0',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {question.factImage && (
          <img
            key={question.id}
            src={question.factImage.src}
            alt=""
            style={{
              position: 'absolute',
              right: question.factImage.right,
              top: question.factImage.top,
              transform: `translateY(-50%)${question.factImage.rotate ? ` rotate(${question.factImage.rotate}deg)` : ''}`,
              width: question.factImage.width,
              height: 'auto',
              opacity: 0.07,
              pointerEvents: 'none',
            }}
          />
        )}
        <p style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#0D132D',
          opacity: 0.4,
          marginBottom: 6,
        }}>
          Presidential Fact
        </p>
        <p style={{
          fontSize: 14,
          lineHeight: 1.6,
          color: '#0D132D',
          opacity: 0.7,
        }}>
          {question.fact}
        </p>
        <p style={{
          fontSize: 11,
          color: '#0D132D',
          opacity: 0.35,
          marginTop: 6,
        }}>
          {Array.isArray(question.factSources)
            ? question.factSources.map((source, i) => (
                <span key={i}>
                  {i > 0 && ' | '}
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'inherit',
                      textDecoration: 'underline',
                    }}
                  >
                    {source.name}
                  </a>
                </span>
              ))
            : question.factSources
          }
        </p>
      </div>
      </div>
    </div>
  )
}
