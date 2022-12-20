import { CustomerRepositoryInterface } from '@/domain/customer'
import { InputFindCustomerDto, OutputFindCustomerDto } from './find-customer-dto'

export class FindCustomerUseCase {
  constructor (
    private readonly customerRepository: CustomerRepositoryInterface
  ) {}

  async run (input: InputFindCustomerDto): Promise<OutputFindCustomerDto> {
    const customer = await this.customerRepository.find(input.id)

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
