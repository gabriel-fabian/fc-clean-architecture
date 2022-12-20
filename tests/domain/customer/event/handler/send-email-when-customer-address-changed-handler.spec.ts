import { mockCustomer } from '@/tests/domain/mocks'
import { CustomerAddressChangedEvent, SendEmailWhenCustomerAddressChangedHandler } from '@/domain/customer'

describe('SendEmailWhenCustomerAddressChangedHandler', () => {
  it('should send email to customer', () => {
    const spyConsole = jest.spyOn(console, 'log')

    const customer = mockCustomer()
    const customerCreatedEvent = new CustomerAddressChangedEvent(customer)
    const customerCreatedEventHandler = new SendEmailWhenCustomerAddressChangedHandler()

    customerCreatedEventHandler.handle(customerCreatedEvent)

    const formatedAddress =
      `${customer.address.street}, ${customer.address.number} - ${customer.address.city}, ${customer.address.zipCode}`

    expect(spyConsole).toHaveBeenCalledWith(
      `Endereço do cliente: ${customer.id}, ${customer.name} alterado para: ${formatedAddress}`
    )
  })
})
