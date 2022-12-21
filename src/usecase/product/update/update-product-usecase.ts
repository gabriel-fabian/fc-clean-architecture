import { ProductRepositoryInterface } from '@/domain/product'
import { InputUpdateProductDto } from './update-product-dto'

export class UpdateProductUseCase {
  constructor (
    private readonly productRepository: ProductRepositoryInterface
  ) {}

  async run (input: InputUpdateProductDto): Promise<void> {
    this.productRepository.find(input.id)
  }
}
