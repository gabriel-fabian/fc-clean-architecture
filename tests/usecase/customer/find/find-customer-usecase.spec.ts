import { faker } from '@faker-js/faker'

import { CustomerRepositorySpy } from '@/tests/infra/mocks'
import { mockCustomer } from '@/tests/domain/mocks'
import { FindCustomerUseCase } from '@/usecase/customer'

type SutTypes = {
  sut: FindCustomerUseCase
  customerRepositorySpy: CustomerRepositorySpy
}

const makeSut = (): SutTypes => {
  const customerRepositorySpy = new CustomerRepositorySpy()
  const sut = new FindCustomerUseCase(customerRepositorySpy)

  return {
    sut,
    customerRepositorySpy
  }
}

describe('FindCustomerUseCase', () => {
  it('should call CustomerRepository', () => {
    const { sut, customerRepositorySpy } = makeSut()

    const input = {
      id: faker.datatype.uuid()
    }

    sut.run(input)

    expect(customerRepositorySpy.callsCount).toBe(1)
  })

  it('should find a customer and return in FindCustomerDTO', async () => {
    const { sut, customerRepositorySpy } = makeSut()
    const customer = mockCustomer()
    jest.spyOn(customerRepositorySpy, 'find').mockResolvedValueOnce(customer)

    const input = {
      id: customer.id
    }

    const outputDto = {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        city: customer.address.city,
        number: customer.address.number,
        zipCode: customer.address.zipCode
      }
    }

    const result = await sut.run(input)

    expect(result).toEqual(outputDto)
  })

  it('should throw if CustomerRepository throws', async () => {
    const { sut, customerRepositorySpy } = makeSut()
    jest.spyOn(customerRepositorySpy, 'find').mockRejectedValueOnce(new Error('Customer not found'))

    const input = {
      id: faker.datatype.uuid()
    }

    expect(async () => {
      return await sut.run(input)
    }).rejects.toThrow('Customer not found')
  })
})
