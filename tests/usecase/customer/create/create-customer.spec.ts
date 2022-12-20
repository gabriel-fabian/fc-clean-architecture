import { CustomerRepositorySpy } from '@/tests/infra/mocks'
import { CreateCustomerUseCase } from '@/usecase/customer'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: CreateCustomerUseCase
  customerRepositorySpy: CustomerRepositorySpy
}

const makeSut = (): SutTypes => {
  const customerRepositorySpy = new CustomerRepositorySpy()
  const sut = new CreateCustomerUseCase(customerRepositorySpy)

  return {
    sut,
    customerRepositorySpy
  }
}

describe('CreateCustomerUseCase', () => {
  it('should call CustomerRepository', async () => {
    const { sut, customerRepositorySpy } = makeSut()

    const input = {
      name: faker.name.firstName(),
      address: {
        street: faker.address.street(),
        number: faker.datatype.number(),
        city: faker.address.city(),
        zipCode: faker.address.zipCode()
      }
    }

    await sut.run(input)

    expect(customerRepositorySpy.callsCount).toBe(1)
  })
})
