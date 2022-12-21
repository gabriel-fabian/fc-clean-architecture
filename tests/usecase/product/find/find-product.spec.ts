import { faker } from '@faker-js/faker'

import { FindProductUseCase } from '@/usecase/product'
import { ProductRepositorySpy } from '@/tests/infra/mocks/mock-product-repository'

type SutTypes = {
  sut: FindProductUseCase
  productRepositorySpy: ProductRepositorySpy
}

const makeSut = (): SutTypes => {
  const productRepositorySpy = new ProductRepositorySpy()
  const sut = new FindProductUseCase(productRepositorySpy)

  return {
    sut,
    productRepositorySpy
  }
}

describe('FindProductUseCase', () => {
  it('should call ProductRepository', () => {
    const { sut, productRepositorySpy } = makeSut()

    const input = {
      id: faker.datatype.uuid()
    }

    sut.run(input)

    expect(productRepositorySpy.callsCount).toBe(1)
  })
})
