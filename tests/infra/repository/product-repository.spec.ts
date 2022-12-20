import { Sequelize } from 'sequelize-typescript'
import { faker } from '@faker-js/faker'

import { Product } from '@/domain/product'
import { ProductModel, ProductRepository } from '@/infra/product'
import { mockProduct } from '@/tests/domain/mocks'

const makeSut = (): ProductRepository => new ProductRepository()

const makeProduct = (): Product => {
  const productRepository = makeSut()
  const product = mockProduct()
  productRepository.create(product)
  return product
}

describe('ProductRepository', () => {
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

  it('should create a product', async () => {
    const product = makeProduct()

    const productModel = await ProductModel.findOne({ where: { id: product.id } })
    expect(productModel?.toJSON()).toStrictEqual({
      id: product.id,
      name: product.name,
      price: product.price
    })
  })

  it('should update a product', async () => {
    const product = makeProduct()
    const sut = makeSut()

    const newName = faker.datatype.string()
    const newPrice = faker.datatype.number()
    product.changeName(newName)
    product.changePrice(newPrice)

    await sut.update(product)

    const productModel = await ProductModel.findOne({ where: { id: product.id } })

    expect(productModel?.toJSON()).toStrictEqual({
      id: product.id,
      name: newName,
      price: newPrice
    })
  })

  it('should find a product', async () => {
    const sut = makeSut()
    const product = makeProduct()

    const productModel = await ProductModel.findOne({ where: { id: product.id } })

    const foundProduct = await sut.find(product.id)

    expect(productModel?.toJSON()).toStrictEqual({
      id: foundProduct.id,
      name: foundProduct.name,
      price: foundProduct.price
    })
  })

  it('should find all products', async () => {
    const sut = makeSut()
    const product = makeProduct()
    const product2 = makeProduct()

    const foundProducts = await sut.findAll()
    const products = [product, product2]

    expect(products).toEqual(foundProducts)
  })
})
