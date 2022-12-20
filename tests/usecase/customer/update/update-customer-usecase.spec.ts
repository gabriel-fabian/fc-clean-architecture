import { mockCustomer } from '@/tests/domain/mocks'
import { CustomerRepositorySpy } from '@/tests/infra/mocks'
import { UpdateCustomerUseCase } from '@/usecase/customer'
import { InputUpdateCustomerDto } from './update-customer-dto'

type SutTypes = {
  sut: UpdateCustomerUseCase
  customerRepositorySpy: CustomerRepositorySpy
  inputDto: InputUpdateCustomerDto
}

const makeSut = (): SutTypes => {
  const customerRepositorySpy = new CustomerRepositorySpy()
  const sut = new UpdateCustomerUseCase(customerRepositorySpy)
  const customer = mockCustomer()
  const inputDto = {
    id: customer.id,
    name: customer.name,
    address: {
      street: customer.address.street,
      number: customer.address.number,
      city: customer.address.city,
      zipCode: customer.address.zipCode
    }
  }

  return {
    sut,
    customerRepositorySpy,
    inputDto
  }
}

describe('UpdateCustomerUseCase', () => {
  it('should call CustomerRepository', async () => {
    const { sut, customerRepositorySpy, inputDto } = makeSut()

    await sut.run(inputDto)

    expect(customerRepositorySpy.callsCount).toBe(1)
  })
})
