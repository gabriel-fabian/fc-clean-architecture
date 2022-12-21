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

    await sut.run(makeInputDto())

    expect(productRepositorySpy.callsCount).toBe(2)
  })

  it('should return an OutputUpdateProductDto', async () => {
    const { sut, productRepositorySpy } = makeSut()
    const product = mockProduct()
    const inputDto = makeInputDto(product)

    jest.spyOn(productRepositorySpy, 'find').mockResolvedValueOnce(product)

    const result = await sut.run(inputDto)

    expect(result).toEqual(inputDto)
  })

  it('should throw if ProductRepository throws', async () => {
    const { sut, productRepositorySpy } = makeSut()
    jest.spyOn(productRepositorySpy, 'find').mockRejectedValueOnce(new Error('Product not found'))

    expect(async () => {
      return await sut.run(makeInputDto())
    }).rejects.toThrow('Product not found')
  })
})
