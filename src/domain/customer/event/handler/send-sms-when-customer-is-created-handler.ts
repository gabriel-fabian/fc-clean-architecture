import { EventHandlerInterface } from '@/domain/@shared/event'
import { CustomerAddressChangedEvent } from '@/domain/customer'

export default class SendSmsWhenCustomerIsCreatedHandler
implements EventHandlerInterface<CustomerAddressChangedEvent> {
  handle (_event: CustomerAddressChangedEvent): void {
    // eslint-disable-next-line no-console
    console.log('Esse é o segundo console.log do evento: CustomerCreated')
  }
}
