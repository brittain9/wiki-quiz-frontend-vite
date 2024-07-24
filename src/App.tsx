// App.tsx
import '@mantine/core/styles.css';
import { MantineProvider, AppShell } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import { Header } from './components/Header/Header';
import { Notifications } from '@mantine/notifications';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Notifications />

      <AppShell
        header={{ height: 60 }}
        padding="md"
      >
        <AppShell.Header>
          <Header />
        </AppShell.Header>
        <AppShell.Main>
          <Router />
        </AppShell.Main>
      </AppShell>

    </MantineProvider>
  );
}