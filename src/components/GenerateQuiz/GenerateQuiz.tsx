import React, { useState } from 'react';
import { TextInput, Button, Container, Title, Text, Stack } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import classes from './GenerateQuiz.module.css';

interface GenerateQuizProps {
    onSubmit: (topic: string) => Promise<void>;
  }

export function GenerateQuiz({ onSubmit }: GenerateQuizProps) 
  {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const quizData = await onSubmit(topic);
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
      <Title className={classes.title} ta="center" mt={100}>
        Welcome to the{' '}
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          Quiz App
        </Text>
      </Title>
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