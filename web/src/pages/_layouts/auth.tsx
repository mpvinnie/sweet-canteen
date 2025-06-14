import { Pizza } from 'lucide-react'
import { Outlet } from 'react-router'

export function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-2 antialiased">
      <div className="border-foreground/5 bg-muted text-muted-foreground flex h-full flex-col justify-between border-r p-10">
        <div className="text-foreground flex items-center gap-3 text-lg">
          <Pizza className="h-5 w-5" />
          <span className="font-semibold">sweet.canteen</span>
        </div>
        <footer className="text-sm">
          Painel de gerenciamento &copy; sweet.canteen -{' '}
          {new Date().getFullYear()}
        </footer>
      </div>

      <div className="flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  )
}
