import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GenerateQuiz } from '@/components/GenerateQuiz/GenerateQuiz';
import { generateQuiz } from '@/Api';

export function HomePage() {
  const navigate = useNavigate();

  const handleQuizSubmit = async (topic: string) => {
    const quizData = await generateQuiz(topic);
    navigate('/quiz', { state: { quizData } });
  };

  return (
    <GenerateQuiz
      onSubmit={handleQuizSubmit}
    />
  );
}