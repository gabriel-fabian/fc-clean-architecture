import { ProductRepositoryInterface } from '@/domain/product'
import { InputFindProductDto } from './find-product-dto'

export class FindProductUseCase {
  constructor (
    private readonly productRepository: ProductRepositoryInterface
  ) {}

  async run (input: InputFindProductDto): Promise<void> {
    this.productRepository.find(input.id)
  }
}
