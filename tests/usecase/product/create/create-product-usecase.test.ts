import { Sequelize } from 'sequelize-typescript'
import { faker } from '@faker-js/faker'

import { CreateProductUseCase } from '@/usecase/product'
import { ProductModel, ProductRepository } from '@/infra/product'

type SutTypes = {
  sut: CreateProductUseCase
  productRepository: ProductRepository
}

const makeSut = (): SutTypes => {
  const productRepository = new ProductRepository()
  const sut = new CreateProductUseCase(productRepository)

  return {
    sut,
    productRepository
  }
}

describe('CreateProductUseCase', () => {
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

  it('should create a product and return OutputProductDto', async () => {
    const { sut, productRepository } = makeSut()

    const name = faker.commerce.productName()
    const price = faker.datatype.number()

    const inputDto = {
      name,
      price
    }

    const output = await sut.run(inputDto)

    const createdProduct = await productRepository.find(output.id)

    expect(createdProduct.name).toEqual(name)
    expect(createdProduct.price).toEqual(price)
    expect(output).toEqual({
      id: createdProduct.id,
      ...inputDto
    })
  })
})
