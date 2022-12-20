import { Customer, CustomerRepositoryInterface } from '@/domain/customer'
import { OutputListCustomerDto } from './list-customer-dto'

export class ListCustomerUseCase {
  constructor (
    private readonly customerRepository: CustomerRepositoryInterface
  ) {}

  async run (): Promise<OutputListCustomerDto> {
    const customers = await this.customerRepository.findAll()

    return formatOutput(customers)
  }
}

const formatOutput = (customer: Customer[]): OutputListCustomerDto => {
  return {
    customers: customer.map((customer) => ({
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        number: customer.address.number,
        city: customer.address.city,
        zipCode: customer.address.zipCode
      }
    }))
  }
}
