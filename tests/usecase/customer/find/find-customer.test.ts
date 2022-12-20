import { Sequelize } from 'sequelize-typescript'

import { CustomerModel, CustomerRepository } from '@/infra/customer'
import { mockCustomer } from '@/tests/domain/mocks'
import { FindCustomerUseCase } from '@/usecase/customer'

describe('FindCustomerUseCase', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([CustomerModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should find a customer', async () => {
    const customerRepository = new CustomerRepository()
    const usecase = new FindCustomerUseCase(customerRepository)
    const customer = mockCustomer()
    await customerRepository.create(customer)

    const input = {
      id: customer.id
    }

    const output = {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        city: customer.address.city,
        number: customer.address.number,
        zipCode: customer.address.zipCode
      }
    }

    const result = await usecase.run(input)

    expect(result).toEqual(output)
  })
})
