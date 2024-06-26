'use client'

import { useState, useEffect } from 'react';

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

  return (
    <div className="container">
      <main>
        <h1 className="title">Quiz App</h1>

        {!quizEnded ? (
          <div className="quiz">
            <h2>{questions[currentQuestion].question}</h2>
            <p>Time left: {timeLeft} seconds</p>
            <div className="options">
              {questions[currentQuestion].options.map((option, index) => (
                <button key={index} onClick={() => handleAnswer(option.points)}>
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="result">
            <h2>Quiz completed!</h2>
            <p>Your total score: {score} points</p>
          </div>
        )}
      </main>
    </div>
  );
}