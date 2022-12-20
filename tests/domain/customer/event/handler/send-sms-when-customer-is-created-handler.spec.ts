import { mockCustomer } from '@/tests/domain/mocks'
import { CustomerCreatedEvent, SendSmsWhenCustomerIsCreatedHandler } from '@/domain/customer'

describe('SendSmsWhenCustomerIsCreatedHandler', () => {
  it('should send sms to customer', () => {
    const spyConsole = jest.spyOn(console, 'log')

    const customer = mockCustomer()
    const customerCreatedEvent = new CustomerCreatedEvent(customer)
    const customerCreatedEventHandler = new SendSmsWhenCustomerIsCreatedHandler()
    customerCreatedEventHandler.handle(customerCreatedEvent)

    expect(spyConsole).toHaveBeenCalledWith('Esse é o segundo console.log do evento: CustomerCreated')
  })
})
