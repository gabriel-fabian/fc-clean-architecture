import { Order } from '@/domain/checkout'
import { RepositoryInterface } from '@/domain/@shared/repository'

export default interface OrderRepositoryInterface extends RepositoryInterface<Order> {}
