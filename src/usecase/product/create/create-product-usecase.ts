import { ProductFactory, ProductRepositoryInterface } from '@/domain/product'
import { InputCreateProductDto } from './create-product-dto'

export class CreateProductUseCase {
  constructor (
    private readonly productRepository: ProductRepositoryInterface
  ) {}

  async run (input: InputCreateProductDto): Promise<void> {
    const product = ProductFactory.create(input.name, input.price)

    await this.productRepository.create(product)
  }
}
