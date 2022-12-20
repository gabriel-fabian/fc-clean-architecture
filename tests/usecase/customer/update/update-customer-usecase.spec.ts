import { Customer } from '@/domain/customer'
import { UpdateCustomerUseCase } from '@/usecase/customer'
import { InputUpdateCustomerDto } from '@/usecase/customer/update/update-customer-dto'
import { CustomerRepositorySpy } from '@/tests/infra/mocks'
import { mockCustomer } from '@/tests/domain/mocks'

const makeInputDto = (customer: Customer = mockCustomer()): InputUpdateCustomerDto => {
  return {
    id: customer.id,
    name: customer.name,
    address: {
      street: customer.address.street,
      number: customer.address.number,
      city: customer.address.city,
      zipCode: customer.address.zipCode
    }
  }
}

type SutTypes = {
  sut: UpdateCustomerUseCase
  customerRepositorySpy: CustomerRepositorySpy
}

const makeSut = (): SutTypes => {
  const customerRepositorySpy = new CustomerRepositorySpy()
  const sut = new UpdateCustomerUseCase(customerRepositorySpy)

  return {
    sut,
    customerRepositorySpy
  }
}

describe('UpdateCustomerUseCase', () => {
  it('should call CustomerRepository', async () => {
    const { sut, customerRepositorySpy } = makeSut()
    const inputDto = makeInputDto()

    await sut.run(inputDto)

    expect(customerRepositorySpy.callsCount).toBe(2)
  })

  it('should return an OutputCustomerDto', async () => {
    const { sut, customerRepositorySpy } = makeSut()
    const customer = mockCustomer()
    const inputDto = makeInputDto(customer)

    jest.spyOn(customerRepositorySpy, 'find').mockResolvedValueOnce(customer)

    const result = await sut.run(inputDto)

    expect(result).toEqual(inputDto)
  })
})
