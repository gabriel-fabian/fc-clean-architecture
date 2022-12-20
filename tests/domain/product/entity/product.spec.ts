import { faker } from '@faker-js/faker'
import { Product } from '@/domain/product'

describe('Product unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      void new Product('', faker.datatype.string(), faker.datatype.number())
    }).toThrowError('Id is required')
  })

  it('should throw error when name is empty', () => {
    expect(() => {
      void new Product(faker.datatype.uuid(), '', faker.datatype.number())
    }).toThrowError('Name is required')
  })

  it('should throw error when price is less than zero', () => {
    expect(() => {
      void new Product(faker.datatype.uuid(), faker.datatype.string(), -1)
    }).toThrowError('Price must be valid')
  })

  it('should change name', () => {
    const product = new Product(
      faker.datatype.uuid(),
      faker.datatype.string(),
      faker.datatype.number()
    )
    const name = faker.datatype.string()
    product.changeName(name)
    expect(product.name).toBe(name)
  })

  it('should change price', () => {
    const product = new Product(
      faker.datatype.uuid(),
      faker.datatype.string(),
      faker.datatype.number()
    )
    const price = faker.datatype.number()
    product.changePrice(price)
    expect(product.price).toBe(price)
  })
})
