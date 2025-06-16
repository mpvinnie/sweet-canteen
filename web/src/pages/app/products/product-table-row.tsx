import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { Search } from 'lucide-react'
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
    </TableRow>
  )
}
