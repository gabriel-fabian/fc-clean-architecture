import { faker } from '@faker-js/faker'

import { Product } from '@/domain/product'

export const mockProduct = (): Product => new Product(
  faker.datatype.uuid(),
  faker.commerce.productName(),
  faker.datatype.number()
)
