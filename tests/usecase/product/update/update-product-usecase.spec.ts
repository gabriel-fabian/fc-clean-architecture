import { UpdateProductUseCase } from '@/usecase/product'
import { OutputUpdateProductDto } from '@/usecase/product/update/update-product-dto'
import { Product } from '@/domain/product'
import { mockProduct } from '@/tests/domain/mocks'
import { ProductRepositorySpy } from '@/tests/infra/mocks/mock-product-repository'

const makeInputDto = (product: Product = mockProduct()): OutputUpdateProductDto => {
  return {
    id: product.id,
    name: product.name,
    price: product.price
  }
}

type SutTypes = {
  sut: UpdateProductUseCase
  productRepositorySpy: ProductRepositorySpy
}

const makeSut = (): SutTypes => {
  const productRepositorySpy = new ProductRepositorySpy()
  const sut = new UpdateProductUseCase(productRepositorySpy)

  return {
    sut,
    productRepositorySpy
  }
}

describe('UpdateProductUseCase', () => {
  it('should call CustomerRepository', async () => {
    const { sut, productRepositorySpy } = makeSut()
    const inputDto = makeInputDto()

    await sut.run(inputDto)

    expect(productRepositorySpy.callsCount).toBe(1)
  })
})
