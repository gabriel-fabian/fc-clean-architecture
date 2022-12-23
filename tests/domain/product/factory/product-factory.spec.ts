import { faker } from '@faker-js/faker'
import { ProductFactory } from '@/domain/product'

describe('ProductFactory', () => {
  it('should create a product', () => {
    const name = faker.commerce.product()
    const price = faker.datatype.number()
    const product = ProductFactory.create(name, price)

    expect(product.id).toBeDefined()
    expect(product.name).toBe(name)
    expect(product.price).toBe(price)
    expect(product.constructor.name).toBe('Product')
  })
})
