import { Group, Title, ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
export function Header() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Group justify="space-between" h="100%" px="md">
      <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <Title order={3}>Quiz App</Title>
      </a>
      
      <ActionIcon
        onClick={() => toggleColorScheme()}
        variant="default"
        size="lg"
        aria-label="Toggle color scheme"
      >
        {colorScheme === 'dark' ? <IconSun /> : <IconMoon />}
      </ActionIcon>
    </Group>
  );
}