import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Utensils } from 'lucide-react'

export function MonthOrdersAmountCard() {
  return (
    <Card className="gap-2">
      <CardHeader>
        <div className="flex w-full items-center justify-between">
          <CardTitle className="text-base">Pedidos (mês)</CardTitle>
          <Utensils className="text-muted-foreground h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <span className="text-2xl font-bold tracking-tight">303</span>
        <p className="text-muted-foreground text-xs">
          <span className="text-emerald-500 dark:text-emerald-400">+ 6%</span>{' '}
          em relação ao mês passado
        </p>
      </CardContent>
    </Card>
  )
}
