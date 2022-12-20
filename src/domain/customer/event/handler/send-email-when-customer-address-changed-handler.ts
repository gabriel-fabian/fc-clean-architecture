import { EventHandlerInterface } from '@/domain/@shared/event'
import { CustomerAddressChangedEvent } from '@/domain/customer'

export default class SendEmailWhenCustomerAddressChangedHandler
implements EventHandlerInterface<CustomerAddressChangedEvent> {
  handle (event: CustomerAddressChangedEvent): void {
    const { id, name, address } = event.eventData
    const formatedAddress = `${address.street}, ${address.number} - ${address.city}, ${address.zipCode}`
    // eslint-disable-next-line no-console
    console.log(`Endereço do cliente: ${id}, ${name} alterado para: ${formatedAddress}`)
  }
}
