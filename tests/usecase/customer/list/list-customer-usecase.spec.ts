import { ListCustomerUseCase } from '@/usecase/customer'
import { mockCustomer } from '@/tests/domain/mocks'
import { CustomerRepositorySpy } from '@/tests/infra/mocks'

type SutTypes = {
  sut: ListCustomerUseCase
  customerRepositorySpy: CustomerRepositorySpy
}

const makeSut = (): SutTypes => {
  const customerRepositorySpy = new CustomerRepositorySpy()
  const sut = new ListCustomerUseCase(customerRepositorySpy)

  return {
    sut,
    customerRepositorySpy
  }
}

describe('ListCustomerUseCase', () => {
  it('should call CustomerRepository', async () => {
    const { sut, customerRepositorySpy } = makeSut()

    await sut.run()

    expect(customerRepositorySpy.callsCount).toBe(1)
  })

  it('should return an OutputListCustomerDto', async () => {
    const { sut, customerRepositorySpy } = makeSut()

    const customer1 = mockCustomer()
    const customer2 = mockCustomer()

    jest.spyOn(customerRepositorySpy, 'findAll').mockResolvedValueOnce([customer1, customer2])

    const output = await sut.run()

    expect(output).toEqual({
      customers: [
        {
          id: customer1.id,
          name: customer1.name,
          address: {
            street: customer1.address.street,
            number: customer1.address.number,
            city: customer1.address.city,
            zipCode: customer1.address.zipCode
          }
        },
        {
          id: customer2.id,
          name: customer2.name,
          address: {
            street: customer2.address.street,
            number: customer2.address.number,
            city: customer2.address.city,
            zipCode: customer2.address.zipCode
          }
        }
      ]
    })
  })
})
