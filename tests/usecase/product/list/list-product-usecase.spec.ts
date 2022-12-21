import { ListProductUseCase } from '@/usecase/product'
import { ProductRepositorySpy } from '@/tests/infra/mocks/mock-product-repository'
import { mockProduct } from '@/../tests/domain/mocks'

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

  it('should return an OutputListProductDto', async () => {
    const { sut, productRepositorySpy } = makeSut()

    const product1 = mockProduct()
    const product2 = mockProduct()

    jest.spyOn(productRepositorySpy, 'findAll').mockResolvedValueOnce([product1, product2])

    const output = await sut.run()

    expect(output).toEqual({
      products: [
        {
          id: product1.id,
          name: product1.name,
          price: product1.price
        },
        {
          id: product2.id,
          name: product2.name,
          price: product2.price
        }
      ]
    })
  })
})
