import { CustomerRepositorySpy } from '@/tests/infra/mocks'
import { ListCustomerUseCase } from '@/usecase/customer'

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
})
