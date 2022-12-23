import { Product, ProductRepositoryInterface } from '@/domain/product'
import { mockProduct } from '@/tests/domain/mocks'

export class ProductRepositorySpy implements ProductRepositoryInterface {
  product = mockProduct()
  callsCount = 0

  async create (_entity: Product): Promise<void> {
    this.callsCount++
    return await new Promise(resolve => resolve())
  }

  async update (_entity: Product): Promise<void> {
    this.callsCount++
    return await new Promise(resolve => resolve())
  }

  async find (_id: string): Promise<Product> {
    this.callsCount++
    return await new Promise(resolve => resolve(this.product))
  }

  async findAll (): Promise<Product[]> {
    this.callsCount++
    return await new Promise(resolve => resolve([this.product]))
  }
}
