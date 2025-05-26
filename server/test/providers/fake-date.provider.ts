import { DateProvider } from '@/domain/app/application/providers/date.provider'

export class FakeDateProvider implements DateProvider {
  dateNow() {
    return new Date()
  }

  startOfDay(day: Date) {
    const result = new Date(day)
    result.setUTCHours(0, 0, 0, 0)
    return result
  }

  endOfDay(day: Date) {
    const result = new Date(day)
    result.setUTCHours(23, 59, 59, 999)
    return result
  }
}
