import { EventInterface } from '@/domain/@shared/event'

export default class CustomerAddressChangedEvent implements EventInterface {
  constructor (
    readonly eventData: any,
    readonly dateTimeOccurred = new Date()
  ) {}
}
