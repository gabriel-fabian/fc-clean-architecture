import { Address, CustomerRepositoryInterface } from '@/domain/customer'
import { InputUpdateCustomerDto } from './update-customer-dto'

export class UpdateCustomerUseCase {
  constructor (
    private readonly customerRepository: CustomerRepositoryInterface
  ) {}

  async run (input: InputUpdateCustomerDto): Promise<void> {
    const customer = await this.customerRepository.find(input.id)
    customer.changeName(input.name)
    customer.changeAddress(
      new Address(
        input.address.street,
        input.address.number,
        input.address.city,
        input.address.zipCode
      )
    )

    this.customerRepository.update(customer)
  }
}
