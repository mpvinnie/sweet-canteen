import { createBrowserRouter } from 'react-router'
import { AppLayout } from './_layouts/app'
import { AuthLayout } from './_layouts/auth'
import { Dashboard } from './app/dashboard'
import { Orders } from './app/orders/orders'
import { Products } from './app/products/products'
import { SignIn } from './auth/sign-in'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Dashboard />
      },
      {
        path: '/products',
        element: <Products />
      },
      {
        path: '/orders',
        element: <Orders />
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
