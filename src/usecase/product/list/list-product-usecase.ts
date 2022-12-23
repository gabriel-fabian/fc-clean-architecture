import { Product, ProductRepositoryInterface } from '@/domain/product'
import { OutputListProductDto } from './list-product-dto'

export class ListProductUseCase {
  constructor (
    private readonly productRepository: ProductRepositoryInterface
  ) {}

  async run (): Promise<OutputListProductDto> {
    const products = await this.productRepository.findAll()

    return formatOutput(products)
  }
}

const formatOutput = (products: Product[]): OutputListProductDto => {
  return {
    products: products.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price
    }))
  }
}
