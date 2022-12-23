import { ProductRepositoryInterface } from '@/domain/product'
import { InputFindProductDto, OutputFindProductDto } from './find-product-dto'

export class FindProductUseCase {
  constructor (
    private readonly productRepository: ProductRepositoryInterface
  ) {}

  async run (input: InputFindProductDto): Promise<OutputFindProductDto> {
    const product = await this.productRepository.find(input.id)

    return {
      id: product.id,
      name: product.name,
      price: product.price
    }
  }
}
