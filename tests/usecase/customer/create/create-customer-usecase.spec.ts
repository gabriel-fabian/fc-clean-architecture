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

  it('should return OutputCreateCustomerDto', async () => {
    const { sut } = makeSut()

    const input = {
      name: faker.name.firstName(),
      address: {
        street: faker.address.street(),
        number: faker.datatype.number(),
        city: faker.address.city(),
        zipCode: faker.address.zipCode()
      }
    }

    const output = await sut.run(input)

    expect(output).toEqual({
      id: expect.any(String),
      ...input
    })
  })

  it('should throw an error when param is missing', async () => {
    const { sut } = makeSut()

    const input = {
      name: '',
      address: {
        street: faker.address.street(),
        number: faker.datatype.number(),
        city: faker.address.city(),
        zipCode: faker.address.zipCode()
      }
    }

    await expect(sut.run(input)).rejects.toThrow(
      'Name is required'
    )
  })
})
