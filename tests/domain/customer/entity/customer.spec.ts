import { faker } from '@faker-js/faker'

import { Customer } from '@/domain/customer'
import { mockCustomer } from '@/tests/domain/mocks'

describe('Customer unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      void new Customer('', faker.name.firstName())
    }).toThrowError('Id is required')
  })

  it('should throw error when name is empty', () => {
    expect(() => {
      void new Customer(faker.datatype.uuid(), '')
    }).toThrowError('Name is required')
  })

  it('should change name', () => {
    const customer = mockCustomer()
    const name = faker.name.firstName()

    customer.changeName(name)

    expect(customer.name).toBe(name)
  })

  it('should activate customer', () => {
    const customer = mockCustomer()
    customer.activate()

    expect(customer.isActive()).toBe(true)
  })

  it('should deactivate customer', () => {
    const customer = mockCustomer()
    customer.activate()

    expect(customer.isActive()).toBe(true)

    customer.deactivate()

    expect(customer.isActive()).toBe(false)
  })

  it('should throw error when address is undefined to activate a customer', () => {
    expect(() => {
      const customer = new Customer(faker.datatype.uuid(), faker.name.firstName())

      customer.activate()
    }).toThrowError('Address is mandatory to activate customer')
  })

  it('should add reward points', () => {
    const customer = mockCustomer()
    expect(customer.rewardPoints).toBe(0)

    customer.addRewardPoints(10)
    expect(customer.rewardPoints).toBe(10)

    customer.addRewardPoints(10)
    expect(customer.rewardPoints).toBe(20)
  })
})
