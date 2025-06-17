import { Pagination } from '@/components/pagination'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { EmployeeTableFilters } from './employee-table-filters'
import { EmployeeTableRow } from './employee-table-row'

export function Employees() {
  useDocumentTitle('Funcionários | sweet.canteen')

  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Funcionários</h1>
        <div className="space-y-2.5">
          <EmployeeTableFilters />

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead className="w-[180px]">Usuário</TableHead>
                  <TableHead className="w-[140px]">Cargo</TableHead>
                  <TableHead>Registrado há</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 10 }).map((_, i) => {
                  return <EmployeeTableRow key={i} />
                })}
              </TableBody>
            </Table>
          </div>

          <Pagination pageIndex={0} totalCount={10} perPage={20} />
        </div>
      </div>
    </>
  )
}
