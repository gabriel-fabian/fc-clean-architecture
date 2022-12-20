import { faker } from '@faker-js/faker'
import { ProductFactory } from '@/domain/product'

describe('ProductFactory', () => {
  it('should create a product of type a', () => {
    const name = faker.commerce.product()
    const price = faker.datatype.number()
    const product = ProductFactory.create('a', name, price)

    expect(product.id).toBeDefined()
    expect(product.name).toBe(name)
    expect(product.price).toBe(price)
    expect(product.constructor.name).toBe('Product')
  })

  it('should create a product of type b', () => {
    const name = faker.commerce.product()
    const price = faker.datatype.number()
    const product = ProductFactory.create('b', name, price)

    expect(product.id).toBeDefined()
    expect(product.name).toBe(name)
    expect(product.price).toBe(price * 2)
    expect(product.constructor.name).toBe('ProductB')
  })

  it('should throw an error when product type is invalid', () => {
    expect(() => ProductFactory.create(
      faker.datatype.uuid(),
      faker.commerce.product(),
      faker.datatype.number()
    )).toThrowError('Invalid product type')
  })
})
