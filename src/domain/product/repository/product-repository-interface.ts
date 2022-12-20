import { Product } from '@/domain/product'
import { RepositoryInterface } from '@/domain/@shared/repository'

export default interface ProductRepositoryInterface extends RepositoryInterface<Product> {}
