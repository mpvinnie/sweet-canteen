import { createBrowserRouter } from 'react-router'
import { AppLayout } from './_layouts/app'
import { AuthLayout } from './_layouts/auth'
import { AttendantView } from './app/orders-board/attendant-view'
import { SignIn } from './auth/sign-in'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <AttendantView />
      }
    ]
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-in',
        element: <SignIn />
      }
    ]
  }
])
