import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Title, Text, Radio, Button, Stack, Group, Paper, Badge } from '@mantine/core';
import { QuizData, QuestionResponse, QuizQuestion } from '@/QuizModels';

export function BasicQuiz() {
  const location = useLocation();
  const quizData: QuizData = location.state?.quizData;
  const [answers, setAnswers] = useState<number[]>(Array(quizData.questionResponses[0].questions.length).fill(-1));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerChange = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    const totalQuestions = quizData.questionResponses[0].questions.length;
    const correctAnswers = answers.filter((answer, index) => 
      answer === quizData.questionResponses[0].questions[index].correctAnswerIndex
    ).length;
    const calculatedScore = (correctAnswers / totalQuestions) * 100;
    setScore(calculatedScore);
    setSubmitted(true);
  };

  const getLetterGrade = (score: number) => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  };

  if (!quizData) {
    return <Text>No quiz data available.</Text>;
  }

  return (
    <Container size="md">
      <Stack gap="xl">
        <Title order={1} ta="center">{quizData.title} Quiz</Title>
        {quizData.questionResponses[0].questions.map((question, questionIndex) => (
          <Paper key={questionIndex} shadow="xs" p="md">
            <Stack gap="md">
              <Text fw={700}>
                {questionIndex + 1}. {question.text}
              </Text>
              <Radio.Group
                value={answers[questionIndex].toString()}
                onChange={(value) => handleAnswerChange(questionIndex, parseInt(value))}
              >
                <Stack gap="xs">
                  {question.options.map((option, optionIndex) => (
                    <Radio
                      key={optionIndex}
                      value={optionIndex.toString()}
                      label={option}
                    />
                  ))}
                </Stack>
              </Radio.Group>
              {submitted && (
                <Text c={answers[questionIndex] === question.correctAnswerIndex ? 'green' : 'red'}>
                  Correct answer: {question.options[question.correctAnswerIndex]}
                </Text>
              )}
            </Stack>
          </Paper>
        ))}
        {!submitted ? (
          <Button onClick={handleSubmit} disabled={answers.includes(-1)}>
            Submit Quiz
          </Button>
        ) : (
          <Paper shadow="xs" p="md">
            <Stack gap="md">
              <Title order={2}>Quiz Results</Title>
              <Group>
                <Text>Score: {score.toFixed(2)}%</Text>
                <Badge color={score >= 60 ? 'green' : 'red'} size="lg">
                  Grade: {getLetterGrade(score)}
                </Badge>
              </Group>
            </Stack>
          </Paper>
        )}
      </Stack>
    </Container>
  );
}