import { Sequelize } from 'sequelize-typescript'

import { ListProductUseCase } from '@/usecase/product'
import { ProductModel, ProductRepository } from '@/infra/product'
import { mockProduct } from '@/tests/domain/mocks'

type SutTypes = {
  sut: ListProductUseCase
  productRepository: ProductRepository
}

const makeSut = (): SutTypes => {
  const productRepository = new ProductRepository()
  const sut = new ListProductUseCase(productRepository)

  return {
    sut,
    productRepository
  }
}

describe('ListProductUseCase', () => {
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

  it('should return an OutputListProductDto', async () => {
    const { sut, productRepository } = makeSut()

    const product1 = mockProduct()
    const product2 = mockProduct()

    await productRepository.create(product1)
    await productRepository.create(product2)

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
