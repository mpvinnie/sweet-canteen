import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { Search } from 'lucide-react'

export function Products() {
  useDocumentTitle('Produtos | sweet.canteen')

  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Produtos</h1>
      </div>
      <div className="space-y-2.5">
        <form className="flex items-center gap-2">
          <span className="text-sm font-semibold">Filtros:</span>
          <Input placeholder="Nome do produto" className="h-8 w-[320px]" />
        </form>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[64px]"></TableHead>
                <TableHead>Nome</TableHead>
                <TableHead className="w-[140px]">Preço</TableHead>
                <TableHead className="w-[120px]">Quantidade</TableHead>
                <TableHead className="w-[140px]">Categoria</TableHead>
                <TableHead className="w-[120px]">Disponível</TableHead>
                <TableHead className="w-[180px]">Criado há</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 10 }).map((_, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell>
                      <Button variant="outline" size="xs">
                        <Search className="h-3 w-3" />
                        <span className="sr-only">Detalhes do pedido</span>
                      </Button>
                    </TableCell>
                    <TableCell className="font-medium">
                      Pizza de mussarela
                    </TableCell>
                    <TableCell className="font-medium">R$ 50,00</TableCell>
                    <TableCell>34</TableCell>
                    <TableCell>Pizza</TableCell>
                    <TableCell>Sim</TableCell>
                    <TableCell className="text-muted-foreground">
                      há 10 dias
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}
