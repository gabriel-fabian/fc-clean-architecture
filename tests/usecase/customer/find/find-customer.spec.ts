import { faker } from '@faker-js/faker'

import { CustomerRepositorySpy } from '@/tests/infra/mocks'
import { mockCustomer } from '@/tests/domain/mocks'
import { FindCustomerUseCase } from '@/usecase/customer'

describe('FindCustomerUseCase', () => {
  it('should call CustomerRepository', () => {
    const customerRepositorySpy = new CustomerRepositorySpy()
    const usecase = new FindCustomerUseCase(customerRepositorySpy)

    const input = {
      id: faker.datatype.uuid()
    }

    usecase.run(input)

    expect(customerRepositorySpy.callsCount).toBe(1)
  })

  it('should find a customer', async () => {
    const customerRepositorySpy = new CustomerRepositorySpy()
    const customer = mockCustomer()
    jest.spyOn(customerRepositorySpy, 'find').mockResolvedValueOnce(customer)
    const usecase = new FindCustomerUseCase(customerRepositorySpy)

    const input = {
      id: customer.id
    }

    const output = {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        city: customer.address.city,
        number: customer.address.number,
        zipCode: customer.address.zipCode
      }
    }

    const result = await usecase.run(input)

    expect(result).toEqual(output)
  })
})
