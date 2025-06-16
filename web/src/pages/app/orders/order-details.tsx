import {
  DialogContent,
  DialogDescription,
  DialogTitle
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

export function OrderDetails() {
  return (
    <DialogContent>
      <DialogTitle>Pedido: #1234</DialogTitle>
      <DialogDescription>Detalhes do pedido</DialogDescription>

      <div className="space-y-6">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground">Status</TableCell>
              <TableCell className="flex justify-end">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-slate-400" />
                  <span className="text-muted-foreground font-medium">
                    Pendente
                  </span>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Cliente</TableCell>
              <TableCell className="flex justify-end">John Doe</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Descrição</TableCell>
              <TableCell className="text-right break-words whitespace-pre-wrap">
                Lorem ipsum dolor sit amet consectetur adipisicing.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">
                Realizado há
              </TableCell>
              <TableCell className="flex justify-end">há 10 dias</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead className="text-right">Qtd.</TableHead>
              <TableHead className="text-right">Preço</TableHead>
              <TableHead className="text-right">Subtotal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Suco de Cupuaçu</TableCell>
              <TableCell className="text-right">1</TableCell>
              <TableCell className="text-right">R$ 4,00</TableCell>
              <TableCell className="text-right">R$ 4,00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Hambúrguer de Siri</TableCell>
              <TableCell className="text-right">3</TableCell>
              <TableCell className="text-right">R$ 5,00</TableCell>
              <TableCell className="text-right">R$ 15,00</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total do pedido</TableCell>
              <TableCell className="text-right font-medium">R$ 19,00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </DialogContent>
  )
}
