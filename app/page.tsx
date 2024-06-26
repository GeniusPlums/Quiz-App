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
              <span style={{ color: '#F44336' }}>No addictions</span>
              <span style={{ color: '#FFC107' }}></span>
              <span style={{ color: '#4CAF50' }}>More likely to have addiction</span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}