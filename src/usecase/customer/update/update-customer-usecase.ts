import { Address, CustomerRepositoryInterface } from '@/domain/customer'
import { InputUpdateCustomerDto, OutputUpdateCustomerDto } from './update-customer-dto'

export class UpdateCustomerUseCase {
  constructor (
    private readonly customerRepository: CustomerRepositoryInterface
  ) {}

  async run (input: InputUpdateCustomerDto): Promise<OutputUpdateCustomerDto> {
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

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        city: customer.address.city,
        number: customer.address.number,
        zipCode: customer.address.zipCode
      }
    }
  }
}
