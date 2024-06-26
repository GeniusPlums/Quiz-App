'use client'

import { useState, useEffect } from 'react';
import styles from './QuizApp.module.css';
import styled, { createGlobalStyle, keyframes } from 'styled-components';


interface Option {
  text: string;
  points: number;
}

interface Question {
  question: string;
  options: Option[];
  timeLimit: number;
}

const questions: Question[] = [
  {
    question: "When you feel stressed or anxious, what is your typical response?",
    options: [
      { text: "Seek social support or talk to someone", points: 0 },
      { text: "Engage in a hobby or activity you enjoy", points: 0 },
      { text: "Use substances (alcohol, drugs) to relax or cope", points: 5 },
    ],
    timeLimit: 35
  },
  {
    question: "What happens when you try to cut down or stop using substances?",
    options: [
      { text: "You can easily cut down or stop without experiencing discomfort", points: 0 },
      { text: "You experience some difficulty but can manage to cut down or stop", points: 5 },
      { text: "You find it extremely difficult and experience strong cravings or withdrawal symptoms", points: 10 },
    ],
    timeLimit: 35
  },
  {
    question: "How does substance use affect your relationships or responsibilities?",
    options: [
      { text: "It has little to no impact on my relationships or responsibilities", points: 0 },
      { text: "It sometimes causes conflicts or affects my responsibilities mildly", points: 5 },
      { text: "It frequently causes conflicts, strains relationships, or affects my responsibilities significantly", points: 10 },
    ],
    timeLimit: 35
  },
  {
    question: "How do you feel about your substance use habits?",
    options: [
      { text: "I feel in control and make conscious choices", points: 5 },
      { text: "I sometimes feel concerned but believe I can manage", points: 5 },
      { text: "I feel worried or believe I may have a problem", points: 10 },
    ],
    timeLimit: 35
  },
  {
    question: "How much time do you spend obtaining, using, or recovering from the effects of substances?",
    options: [
      { text: "It takes up very little of my time", points: 5 },
      { text: "It takes up some time, but it's manageable", points: 10 },
      { text: "It takes up a significant amount of my time", points: 15 },
    ],
    timeLimit: 35
  },
  {
    question: "How do you react when someone expresses concern about your substance use?",
    options: [
      { text: "I am open to discussing it and considering their perspective", points: 0 },
      { text: "I may feel defensive but can understand their point of view", points: 5 },
      { text: "I become upset, dismissive, or avoid discussing", points: 15 },
    ],
    timeLimit: 35
  },
  {
    question: "Have you experienced negative consequences related to your substance use (e.g., legal issues, health problems, financial difficulties)?",
    options: [
      { text: "No, I have not experienced any negative consequences", points: 0 },
      { text: "I have experienced occasional negative consequences", points: 5 },
      { text: "I have experienced multiple or severe negative consequences", points: 15 },
    ],
    timeLimit: 35
  },
  {
    question: "How do you feel physically and emotionally when you haven't used substances for a period of time?",
    options: [
      { text: "I feel physically and emotionally stable", points: 0 },
      { text: "I may feel some discomfort or irritability, but it's manageable", points: 5 },
      { text: "I experience strong physical or emotional cravings, discomfort, or withdrawal symptoms", points: 15 },
    ],
    timeLimit: 35
  },
  {
    question: "What motivates you to use substances?",
    options: [
      { text: "Socializing or enhancing experiences", points: 10 },
      { text: "Coping with stress, anxiety, or negative emotions", points: 10 },
      { text: "Escaping from reality or avoiding problems", points: 10 },
    ],
    timeLimit: 35
  }
];

// Define color palette
const colors = {
  primary: '#6200EE',
  secondary: '#03DAC6',
  background: '#121212',
  surface: '#1E1E1E',
  error: '#CF6679',
  onPrimary: '#FFFFFF',
  onSecondary: '#000000',
  onBackground: '#FFFFFF',
  onSurface: '#FFFFFF',
  onError: '#000000',
};

// Define animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

// Define global styles
const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
    background-color: ${colors.background};
    color: ${colors.onBackground};
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

// Styled components
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  animation: ${fadeIn} 0.5s ease-out;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: ${colors.primary};
  margin-bottom: 2rem;
  text-align: center;
`;

const QuizContainer = styled.div`
  background-color: ${colors.surface};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  animation: ${slideIn} 0.5s ease-out;
`;

const Question = styled.h2`
  font-size: 1.5rem;
  color: ${colors.onSurface};
  margin-bottom: 1rem;
`;

const Timer = styled.p`
  font-size: 1rem;
  color: ${colors.secondary};
  margin-bottom: 1rem;
`;

const OptionButton = styled.button`
  background-color: ${colors.primary};
  color: ${colors.onPrimary};
  border: none;
  padding: 1rem;
  margin: 0.5rem 0;
  width: 100%;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.1s;

  &:hover {
    background-color: ${colors.secondary};
    color: ${colors.onSecondary};
  }

  &:active {
    transform: scale(0.98);
  }
`;

const ResultContainer = styled.div`
  text-align: center;
`;

const ScoreMeter = styled.div`
  width: 100%;
  height: 20px;
  background-color: ${colors.surface};
  border-radius: 10px;
  overflow: hidden;
  margin: 20px 0;
`;

const ScoreFill = styled.div<{ width: string; color: string }>`
  width: ${props => props.width};
  height: 100%;
  background-color: ${props => props.color};
  transition: width 0.5s ease-out, background-color 0.5s ease-out;
`;

const ScoreRanges = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 5px;
`;

const ScoreRange = styled.span`
  font-weight: bold;
`;

// Main component
export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(questions[0].timeLimit);
  const [quizEnded, setQuizEnded] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !quizEnded) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !quizEnded) {
      handleNextQuestion();
    }
  }, [timeLeft, quizEnded]);

  const handleAnswer = (points: number) => {
    setScore(score + points);
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(questions[currentQuestion + 1].timeLimit);
    } else {
      setQuizEnded(true);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 60) return colors.secondary;
    if (score >= 30) return '#FFC107';
    return colors.error;
  };

  const getScoreWidth = (score: number) => {
    return `${Math.min(score, 100)}%`;
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Title>Ultimate Quiz Challenge</Title>
        <QuizContainer>
          {!quizEnded ? (
            <>
              <Question>{questions[currentQuestion].question}</Question>
              <Timer>Time left: {timeLeft} seconds</Timer>
              {questions[currentQuestion].options.map((option, index) => (
                <OptionButton key={index} onClick={() => handleAnswer(option.points)}>
                  {option.text}
                </OptionButton>
              ))}
            </>
          ) : (
            <ResultContainer>
              <h2>Quiz completed!</h2>
              <p>Your total score: {score} points</p>
              <ScoreMeter>
                <ScoreFill width={getScoreWidth(score)} color={getScoreColor(score)} />
              </ScoreMeter>
              <ScoreRanges>
                <ScoreRange style={{ color: colors.error }}>0-30</ScoreRange>
                <ScoreRange style={{ color: '#FFC107' }}>30-60</ScoreRange>
                <ScoreRange style={{ color: colors.secondary }}>60+</ScoreRange>
              </ScoreRanges>
            </ResultContainer>
          )}
        </QuizContainer>
      </Container>
    </>
  );
}