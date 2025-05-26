export interface DateProvider {
  dateNow(): Date
  startOfDay(day: Date): Date
  endOfDay(day: Date): Date
}
