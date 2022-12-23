import { ProductFactory, ProductRepositoryInterface } from '@/domain/product'
import { InputCreateProductDto, OutputCreateProductDto } from './create-product-dto'

export class CreateProductUseCase {
  constructor (
    private readonly productRepository: ProductRepositoryInterface
  ) {}

  async run (input: InputCreateProductDto): Promise<OutputCreateProductDto> {
    const product = ProductFactory.create(input.name, input.price)

    await this.productRepository.create(product)

    return {
      id: product.id,
      name: product.name,
      price: product.price
    }
  }
}
