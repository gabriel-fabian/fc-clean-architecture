import { v4 as uuid } from 'uuid'

import { Product } from '@/domain/product'

export default class ProductFactory {
  public static create (name: string, price: number): Product {
    return new Product(uuid(), name, price)
  }
}
