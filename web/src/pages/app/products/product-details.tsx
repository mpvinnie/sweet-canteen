import {
  DialogContent,
  DialogDescription,
  DialogTitle
} from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

export function ProductDetails() {
  return (
    <DialogContent>
      <DialogTitle>Pizza de mussarela</DialogTitle>
      <DialogDescription>Detalhes do produto</DialogDescription>

      <div className="space-y-6">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground">Nome</TableCell>
              <TableCell className="flex justify-end">
                Pizza de mussarela
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Descrição</TableCell>
              <TableCell className="text-right break-words whitespace-pre-wrap">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
                eos vel necessitatibus ad, ea minima iure dicta fugit!
                Voluptate, nihil aut rem autem aperiam asperiores ut neque earum
                fugit. Id.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Preço</TableCell>
              <TableCell className="flex justify-end">R$ 50,00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">
                Quantidade disponível
              </TableCell>
              <TableCell className="flex justify-end">34</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Categoria</TableCell>
              <TableCell className="flex justify-end">Pizza</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">
                Disponível
              </TableCell>
              <TableCell className="flex justify-end">Sim</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Criado há</TableCell>
              <TableCell className="flex justify-end">há 10 dias</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </DialogContent>
  )
}
