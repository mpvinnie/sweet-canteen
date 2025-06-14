import { Toaster } from '@/components/ui/sonner'
import { RouterProvider } from 'react-router'
import { ThemeProvider } from './components/theme/theme-provider'
import './global.css'
import { router } from './pages/routes'

export function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="sweetcanteen-theme">
      <RouterProvider router={router} />
      <Toaster richColors />
    </ThemeProvider>
  )
}
