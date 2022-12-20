import { CustomerRepositoryInterface } from '@/domain/customer'

export class ListCustomerUseCase {
  constructor (
    private readonly customerRepository: CustomerRepositoryInterface
  ) {}

  async run (): Promise<void> {
    this.customerRepository.findAll()
  }
}
