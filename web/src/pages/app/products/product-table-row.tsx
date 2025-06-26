import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { Edit2, Search, Trash2 } from 'lucide-react'
import { EditProduct } from './edit-product'
import { ProductDetails } from './product-details'

export function ProductTableRow() {
  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do produto</span>
            </Button>
          </DialogTrigger>

          <ProductDetails />
        </Dialog>
      </TableCell>
      <TableCell className="font-medium">Pizza de mussarela</TableCell>
      <TableCell className="font-medium">R$ 50,00</TableCell>
      <TableCell>34</TableCell>
      <TableCell>Pizza</TableCell>
      <TableCell>Sim</TableCell>
      <TableCell className="text-muted-foreground">há 10 dias</TableCell>
      <TableCell className="text-muted-foreground opacity-50 hover:opacity-100">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="xs">
              <Edit2 className="h-1 w-1" />
              <span className="sr-only">Editar produto</span>
            </Button>
          </DialogTrigger>

          <EditProduct />
        </Dialog>
      </TableCell>
      <TableCell className="text-muted-foreground opacity-50 hover:opacity-100">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="xs">
              <Trash2 className="h-1 w-1" />
              <span className="sr-only">Excluir produto</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Você tem certeza disso?</AlertDialogTitle>
              <AlertDialogDescription>
                Essa ação não pode ser desfeita. Isso irá apagar permanentemente
                esse produto e remover os seus dados de nossos servidores.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex w-full justify-end gap-2">
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction>Continuar</AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </TableCell>
    </TableRow>
  )
}
