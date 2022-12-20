import { EventHandlerInterface } from '@/domain/@shared/event'
import { CustomerCreatedEvent } from '@/domain/customer'

export default class SendEmailWhenCustomerIsCreatedHandler
implements EventHandlerInterface<CustomerCreatedEvent> {
  handle (_event: CustomerCreatedEvent): void {
    // eslint-disable-next-line no-console
    console.log('Esse é o primeiro console.log do evento: CustomerCreated')
  }
}
