import { EventInterface } from '@/domain/@shared/event'

export default class CustomerCreatedEvent implements EventInterface {
  constructor (
    readonly eventData: any,
    readonly dateTimeOccurred = new Date()
  ) {}
}
