import { faker } from '@faker-js/faker'

import { CreateProductUseCase } from '@/usecase/product'
import { ProductRepositorySpy } from '@/tests/infra/mocks/mock-product-repository'

type SutTypes = {
  sut: CreateProductUseCase
  productRepositorySpy: ProductRepositorySpy
}

const makeSut = (): SutTypes => {
  const productRepositorySpy = new ProductRepositorySpy()
  const sut = new CreateProductUseCase(productRepositorySpy)

  return {
    sut,
    productRepositorySpy
  }
}

describe('CreateProductUseCase', () => {
  it('should call ProductRepository', () => {
    const { sut, productRepositorySpy } = makeSut()

    const input = {
      name: faker.commerce.productName(),
      price: faker.datatype.number()
    }

    sut.run(input)

    expect(productRepositorySpy.callsCount).toBe(1)
  })
})
