import { DateProvider } from '@/domain/app/application/providers/date.provider'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

export class DayjsDateProvider implements DateProvider {
  dateNow(): Date {
    return dayjs().utc().toDate()
  }

  startOfDay(day: Date): Date {
    return dayjs(day).utc().startOf('day').toDate()
  }

  endOfDay(day: Date): Date {
    return dayjs(day).utc().endOf('day').toDate()
  }
}
