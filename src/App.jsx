import { useState, useEffect } from 'react'
import questionsData from '../content/questions.json'
import presidentsData from '../content/presidents.json'
import IntroScreen from './components/IntroScreen'
import QuizCard from './components/QuizCard'
import ResultScreen from './components/ResultScreen'

const IMAGE_MAP = {
  washington: '/images/presidents/washington.webp',
  jefferson: '/images/presidents/jefferson.webp',
  lincoln: '/images/presidents/lincoln.webp',
  't-roosevelt': '/images/presidents/ted_roosevelt.webp',
  fdr: '/images/presidents/frank_roosevelt.webp',
  reagan: '/images/presidents/reagan.webp',
  clinton: '/images/presidents/clinton.webp',
  bush: '/images/presidents/bush.webp',
  obama: '/images/presidents/obama.webp',
  trump: '/images/presidents/trump.webp',
}

function calculateResult(answers) {
  const dimensions = questionsData.dimensions
  const dimensionScores = {}

  dimensions.forEach((dim) => {
    dimensionScores[dim] = []
  })

  questionsData.questions.forEach((q, i) => {
    if (answers[i] !== undefined) {
      dimensionScores[q.dimension].push(answers[i])
    }
  })

  const userVector = dimensions.map((dim) => {
    const scores = dimensionScores[dim]
    return scores.reduce((a, b) => a + b, 0) / scores.length
  })

  let bestMatch = null
  let bestDistance = Infinity

  presidentsData.presidents.forEach((president) => {
    const distance = Math.sqrt(
      president.scores.reduce((sum, score, i) => {
        return sum + Math.pow(score - userVector[i], 2)
      }, 0)
    )
    if (distance < bestDistance) {
      bestDistance = distance
      bestMatch = president
    }
  })

  return { president: bestMatch, userVector }
}

export default function App() {
  const [screen, setScreen] = useState('intro')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [result, setResult] = useState(null)

  useEffect(() => {
    Object.values(IMAGE_MAP).forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [])

  useEffect(() => {
    const preloadAhead = 2
    const start = currentQuestion
    const end = Math.min(start + preloadAhead + 1, questionsData.questions.length)
    for (let i = start; i < end; i++) {
      const q = questionsData.questions[i]
      if (q.factImage) {
        const img = new Image()
        img.src = q.factImage.src
      }
    }
  }, [currentQuestion])

  function handleStart() {
    setScreen('quiz')
    setCurrentQuestion(0)
    setAnswers([])
    setResult(null)
  }

  function handleBack() {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setAnswers(answers.slice(0, -1))
    }
  }

  function handleAnswer(score) {
    const newAnswers = [...answers, score]
    setAnswers(newAnswers)

    if (currentQuestion < questionsData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      const result = calculateResult(newAnswers)
      setResult(result)
      setScreen('result')
    }
  }

  function handleBackToIntro() {
    setScreen('intro')
    setCurrentQuestion(0)
    setAnswers([])
    setResult(null)
  }

  return (
    <div style={{
      width: '100%',
      maxWidth: 680,
      padding: '40px 20px',
      margin: '0 auto',
      minHeight: '100vh',
    }}>
      {screen === 'intro' && <IntroScreen onStart={handleStart} />}
      {screen === 'quiz' && (
        <QuizCard
          question={questionsData.questions[currentQuestion]}
          questionNumber={currentQuestion + 1}
          totalQuestions={questionsData.questions.length}
          onAnswer={handleAnswer}
          onBack={currentQuestion > 0 ? handleBack : null}
        />
      )}
      {screen === 'result' && result && (
        <ResultScreen
          president={result.president}
          userVector={result.userVector}
          dimensions={questionsData.dimensions}
          dimensionLabels={questionsData.dimensionLabels}
          imageUrl={IMAGE_MAP[result.president.id]}
          onBackToIntro={handleBackToIntro}
        />
      )}
    </div>
  )
}
