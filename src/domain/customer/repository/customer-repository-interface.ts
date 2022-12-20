import { Customer } from '@/domain/customer'
import { RepositoryInterface } from '@/domain/@shared/repository'

export default interface CustomerRepositoryInterface extends RepositoryInterface<Customer> {}
