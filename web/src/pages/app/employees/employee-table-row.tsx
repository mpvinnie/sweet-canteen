import { TableCell, TableRow } from '@/components/ui/table'

export function EmployeeTableRow() {
  return (
    <TableRow>
      <TableCell className="font-medium">Vinicius Atendente</TableCell>
      <TableCell className="text-muted-foreground">
        vinicius.attendant
      </TableCell>
      <TableCell className="font-medium">Atendente</TableCell>
      <TableCell className="font-medium">há 10 dias</TableCell>
    </TableRow>
  )
}
