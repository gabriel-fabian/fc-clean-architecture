import { ListProductUseCase } from '@/usecase/product'
import { ProductRepositorySpy } from '@/tests/infra/mocks/mock-product-repository'

type SutTypes = {
  sut: ListProductUseCase
  productRepositorySpy: ProductRepositorySpy
}

const makeSut = (): SutTypes => {
  const productRepositorySpy = new ProductRepositorySpy()
  const sut = new ListProductUseCase(productRepositorySpy)

  return {
    sut,
    productRepositorySpy
  }
}

describe('ListProductUseCase', () => {
  it('should call CustomerRepository', async () => {
    const { sut, productRepositorySpy } = makeSut()

    await sut.run()

    expect(productRepositorySpy.callsCount).toBe(1)
  })
})
