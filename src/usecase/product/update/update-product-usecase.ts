import { ProductRepositoryInterface } from '@/domain/product'
import { InputUpdateProductDto, OutputUpdateProductDto } from './update-product-dto'

export class UpdateProductUseCase {
  constructor (
    private readonly productRepository: ProductRepositoryInterface
  ) {}

  async run (input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
    const product = await this.productRepository.find(input.id)
    product.changeName(input.name)
    product.changePrice(input.price)

    await this.productRepository.update(product)

    return {
      id: product.id,
      name: product.name,
      price: product.price
    }
  }
}
