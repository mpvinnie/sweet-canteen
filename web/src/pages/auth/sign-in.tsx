import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export function SignIn() {
  useDocumentTitle('Sign In | sweet.canteen')

  return (
    <div className="p-8">
      <div className="flex w-[350px] flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Acessar painel
          </h1>
          <p className="text-muted-foreground text-sm">
            Acompanhe e gerencie os pedidos pelo painel!
          </p>
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Seu usuário</Label>
            <Input id="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Sua senha</Label>
            <Input id="password" type="password" />
          </div>

          <Button className="w-full">Acessar painel</Button>
        </form>
      </div>
    </div>
  )
}
