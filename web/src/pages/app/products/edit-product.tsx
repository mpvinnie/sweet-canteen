import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { withHookFormMask } from 'use-mask-input'

import { z } from 'zod'

const updateProductForm = z.object({
  name: z.string(),
  description: z.string().optional(),
  price: z.string(),
  availabelQuantity: z.number(),
  categoryName: z.string(),
  available: z.boolean()
})

type UpdateProductForm = z.infer<typeof updateProductForm>

export function EditProduct() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<UpdateProductForm>()

  const [isAvailable, setIsAvailable] = useState(true)

  async function handleUpdateProduct(data: UpdateProductForm) {
    console.log('aqui')
    await new Promise(resolve => setTimeout(resolve, 1000))
    data.available = isAvailable

    console.log(data)

    toast.success('Dados do produto alterados com sucesso.')
  }

  return (
    <DialogContent>
      <DialogTitle>Editar produto</DialogTitle>
      <DialogDescription>
        Altere os dados do pedido aqui. Clique em salvar quando terminar.
      </DialogDescription>
      <form onSubmit={handleSubmit(handleUpdateProduct)} className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" {...register('name')} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Input id="description" {...register('description')} />
          </div>
          <div className="flex gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Preço</Label>
              <Input
                id="price"
                {...withHookFormMask(register('price'), 'currency', {
                  prefix: 'R$ ',
                  placeholder: '0.00'
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="availableQuantity">Quantidade disponível</Label>
              <Input
                id="availableQuantity"
                type="number"
                min={0}
                {...register('availabelQuantity')}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="categoryName">Categoria</Label>
            <Input id="categoryName" {...register('categoryName')} />
          </div>
          <div className="flex items-center justify-between rounded-md border-2 p-3">
            <Label htmlFor="available">Produto disponível para venda?</Label>
            <Switch
              id="available"
              checked={isAvailable}
              onCheckedChange={setIsAvailable}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" type="button">
              Cancelar
            </Button>
          </DialogClose>
          <Button>Salvar alterações</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
