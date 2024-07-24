import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { BasicQuiz } from './pages/BasicQuiz.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/quiz',
    element: <BasicQuiz />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}