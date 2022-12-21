import { faker } from '@faker-js/faker'

import { FindProductUseCase } from '@/usecase/product'
import { ProductRepositorySpy } from '@/tests/infra/mocks/mock-product-repository'
import { mockProduct } from '@/tests/domain/mocks'

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

  it('should find a product and return an OutputFindProductDto', async () => {
    const { sut, productRepositorySpy } = makeSut()
    const product = mockProduct()
    jest.spyOn(productRepositorySpy, 'find').mockResolvedValueOnce(product)

    const input = {
      id: product.id
    }

    const outputDto = {
      id: product.id,
      name: product.name,
      price: product.price
    }

    const result = await sut.run(input)

    expect(result).toEqual(outputDto)
  })

  it('should throw if ProductRepository throws', async () => {
    const { sut, productRepositorySpy } = makeSut()
    jest.spyOn(productRepositorySpy, 'find').mockRejectedValueOnce(new Error('Product not found'))

    const input = {
      id: faker.datatype.uuid()
    }

    expect(async () => {
      return await sut.run(input)
    }).rejects.toThrow('Product not found')
  })
})
