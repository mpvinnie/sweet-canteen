import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const signInForm = z.object({
  username: z.string(),
  password: z.string()
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  useDocumentTitle('Sign In | sweet.canteen')

  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<SignInForm>()

  async function handleSignIn(data: SignInForm) {
    await new Promise(resolve => setTimeout(resolve, 1000))

    toast.success('Login efetuado com sucesso.')
  }

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

        <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Seu usuário</Label>
            <Input id="username" {...register('username')} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Sua senha</Label>
            <Input id="password" type="password" {...register('password')} />
          </div>

          <Button disabled={isSubmitting} className="w-full">
            Acessar painel
          </Button>
        </form>
      </div>
    </div>
  )
}
