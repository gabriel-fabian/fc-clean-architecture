import { Sequelize } from 'sequelize-typescript'

import { ProductModel, ProductRepository } from '@/infra/product'
import { mockProduct } from '@/tests/domain/mocks'
import { FindProductUseCase } from '@/usecase/product'

type SutTypes = {
  sut: FindProductUseCase
  productRepository: ProductRepository
}

const makeSut = (): SutTypes => {
  const productRepository = new ProductRepository()
  const sut = new FindProductUseCase(productRepository)

  return {
    sut,
    productRepository
  }
}

describe('FindCustomerUseCase', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should find a product and return OutputProductDto', async () => {
    const { sut, productRepository } = makeSut()
    const product = mockProduct()
    await productRepository.create(product)

    const input = {
      id: product.id
    }

    const output = {
      id: product.id,
      name: product.name,
      price: product.price
    }

    const result = await sut.run(input)

    expect(result).toEqual(output)
  })
})
