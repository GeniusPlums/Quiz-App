'use client'

import { useState, useEffect } from 'react';
import styles from './QuizApp.module.css';


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
    question: "What is the capital of France?",
    options: [
      { text: "London", points: 0 },
      { text: "Berlin", points: 0 },
      { text: "Paris", points: 10 },
      { text: "Madrid", points: 0 }
    ],
    timeLimit: 15
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: [
      { text: "Venus", points: 0 },
      { text: "Mars", points: 10 },
      { text: "Jupiter", points: 0 },
      { text: "Saturn", points: 0 }
    ],
    timeLimit: 10
  },
  {
    question: "What is the largest mammal?",
    options: [
      { text: "African Elephant", points: 5 },
      { text: "Blue Whale", points: 10 },
      { text: "Giraffe", points: 0 },
      { text: "Hippopotamus", points: 0 }
    ],
    timeLimit: 20
  }
];

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
    if (score >= 60) return '#4CAF50'; // Green for high scores
    if (score >= 30) return '#FFC107'; // Yellow for medium scores
    return '#F44336'; // Red for low scores
  };

  const getScoreWidth = (score: number) => {
    return `${Math.min(score, 100)}%`;
  };

  return (
    <div className={styles.container}>
      <main>
        <h1 className={styles.title}>Quiz App</h1>

        {!quizEnded ? (
          <div className={styles.quiz}>
            <h2>{questions[currentQuestion].question}</h2>
            <p>Time left: {timeLeft} seconds</p>
            <div className={styles.options}>
              {questions[currentQuestion].options.map((option, index) => (
                <button key={index} onClick={() => handleAnswer(option.points)}>
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.result}>
            <h2>Quiz completed!</h2>
            <p>Your total score: {score} points</p>
            <div className={styles.scoreMeter}>
              <div 
                className={styles.scoreFill} 
                style={{ 
                  width: getScoreWidth(score), 
                  backgroundColor: getScoreColor(score) 
                }}
              ></div>
            </div>
            <div className={styles.scoreRanges}>
              <span style={{ color: '#F44336' }}>0-30</span>
              <span style={{ color: '#FFC107' }}>30-60</span>
              <span style={{ color: '#4CAF50' }}>60+</span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}