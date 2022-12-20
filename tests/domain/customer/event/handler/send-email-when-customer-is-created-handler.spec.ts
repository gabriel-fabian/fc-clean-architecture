import { mockCustomer } from '@/tests/domain/mocks'
import { CustomerCreatedEvent, SendEmailWhenCustomerIsCreatedHandler } from '@/domain/customer'

describe('SendEmailWhenCustomerIsCreatedHandler', () => {
  it('should send email to customer', () => {
    const spyConsole = jest.spyOn(console, 'log')

    const customer = mockCustomer()
    const customerCreatedEvent = new CustomerCreatedEvent(customer)
    const customerCreatedEventHandler = new SendEmailWhenCustomerIsCreatedHandler()
    customerCreatedEventHandler.handle(customerCreatedEvent)

    expect(spyConsole).toHaveBeenCalledWith('Esse é o primeiro console.log do evento: CustomerCreated')
  })
})
