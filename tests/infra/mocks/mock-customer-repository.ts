import { Customer, CustomerRepositoryInterface } from '@/domain/customer'
import { mockCustomer } from '@/tests//domain/mocks'

export class CustomerRepositorySpy implements CustomerRepositoryInterface {
  customer = mockCustomer()
  callsCount = 0

  async create (_entity: Customer): Promise<void> {
    this.callsCount++
    return await new Promise(resolve => resolve())
  }

  async update (_entity: Customer): Promise<void> {
    this.callsCount++
    return await new Promise(resolve => resolve())
  }

  async find (_id: string): Promise<Customer> {
    this.callsCount++
    return await new Promise(resolve => resolve(this.customer))
  }

  async findAll (): Promise<Customer[]> {
    this.callsCount++
    return await new Promise(resolve => resolve([this.customer]))
  }
}
