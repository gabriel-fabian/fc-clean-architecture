import { Address, CustomerFactory, CustomerRepositoryInterface } from '@/domain/customer'
import { InputCreateCustomerDto, OutputCreateCustomerDto } from './create-customer-dto'

export class CreateCustomerUseCase {
  constructor (
    private readonly customerRepository: CustomerRepositoryInterface
  ) {}

  async run (input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
    const customer = CustomerFactory.createWithAddress(input.name, new Address(
      input.address.street,
      input.address.number,
      input.address.city,
      input.address.zipCode
    ))

    await this.customerRepository.create(customer)

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
