import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextInput, Button, Container, Title, Text, Stack } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { generateQuiz } from '@/Api';
export function HomePage() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const quizData = await generateQuiz(topic);
      navigate('/quiz', { state: { quizData } });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        notifications.show({
          title: 'Error',
          message: err.message,
          color: 'red',
        });
      } else {
        setError('An unknown error occurred');
        notifications.show({
          title: 'Error',
          message: 'An unknown error occurred',
          color: 'red',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="sm">
      <Stack gap="xl">
        <Title order={1} ta="center">Quiz Generator</Title>
        <Text ta="center">Enter a topic to generate a quiz</Text>
        <form onSubmit={handleSubmit}>
          <Stack gap="md">
            <TextInput
              label="Quiz Topic"
              placeholder="Enter the quiz topic"
              value={topic}
              onChange={(event) => setTopic(event.currentTarget.value)}
              error={error}
              disabled={loading}
              required
            />
            <Button type="submit" loading={loading} disabled={loading || !topic.trim()}>
              Generate Quiz
            </Button>
          </Stack>
        </form>
      </Stack>
    </Container>
  );
}