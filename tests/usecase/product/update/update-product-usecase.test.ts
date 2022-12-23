import { Sequelize } from 'sequelize-typescript'
import { faker } from '@faker-js/faker'

import { UpdateProductUseCase } from '@/usecase/product'
import { ProductModel, ProductRepository } from '@/infra/product'
import { mockProduct } from '@/tests/domain/mocks'

type SutTypes = {
  sut: UpdateProductUseCase
  productRepository: ProductRepository
}

const makeSut = (): SutTypes => {
  const productRepository = new ProductRepository()
  const sut = new UpdateProductUseCase(productRepository)

  return {
    sut,
    productRepository
  }
}

describe('UpdateProductUseCase', () => {
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

  it('should update a product and return an OutputUpdateProductDto', async () => {
    const { sut, productRepository } = makeSut()
    const product = mockProduct()
    productRepository.create(product)

    const updatedName = faker.commerce.productName()
    const updatedPrice = faker.datatype.number()

    const inputDto = {
      id: product.id,
      name: updatedName,
      price: updatedPrice
    }

    const output = await sut.run(inputDto)

    const updatedProduct = await productRepository.find(output.id)

    expect(updatedProduct.name).toEqual(updatedName)
    expect(updatedProduct.price).toEqual(updatedPrice)
    expect(output).toEqual(inputDto)
  })
})
