import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Utensils } from 'lucide-react'

export function DayOrdersAmountCard() {
  return (
    <Card className="gap-2">
      <CardHeader>
        <div className="flex w-full items-center justify-between">
          <CardTitle className="text-base">Pedidos (dia)</CardTitle>
          <Utensils className="text-muted-foreground h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <span className="text-2xl font-bold tracking-tight">11</span>
        <p className="text-muted-foreground text-xs">
          <span className="text-red-500 dark:text-red-400">- 1%</span> em
          relação a ontem
        </p>
      </CardContent>
    </Card>
  )
}
