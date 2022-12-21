import { ProductRepositoryInterface } from '@/domain/product'

export class ListProductUseCase {
  constructor (
    private readonly productRepository: ProductRepositoryInterface
  ) {}

  async run (): Promise<void> {
    this.productRepository.findAll()
  }
}
