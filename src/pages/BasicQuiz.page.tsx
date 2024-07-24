import React from 'react';
import { useLocation } from 'react-router-dom';
import { Text } from '@mantine/core';
import { QuizData } from '@/QuizModels';
import { BasicQuiz } from '@/components/BasicQuiz/BasicQuiz';

export function BasicQuizPage() {
  const location = useLocation();
  const quizData: QuizData = location.state?.quizData;

  if (!quizData) {
    return <Text>No quiz data available.</Text>;
  }

  return <BasicQuiz quizData={quizData} />;
}