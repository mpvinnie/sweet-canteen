import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign } from 'lucide-react'

export function MonthRevenueCard() {
  return (
    <Card className="gap-2">
      <CardHeader>
        <div className="flex w-full items-center justify-between">
          <CardTitle className="text-base">Receita total (mês)</CardTitle>
          <DollarSign className="text-muted-foreground h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <span className="text-2xl font-bold tracking-tight">R$ 1450,45</span>
        <p className="text-muted-foreground text-xs">
          <span className="text-emerald-500 dark:text-emerald-400">+ 2%</span>{' '}
          em relação ao mês passado
        </p>
      </CardContent>
    </Card>
  )
}
