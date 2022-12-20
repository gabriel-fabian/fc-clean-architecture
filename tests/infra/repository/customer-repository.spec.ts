import { Sequelize } from 'sequelize-typescript'
import { faker } from '@faker-js/faker'

import { CustomerModel, CustomerRepository } from '@/infra/customer'
import { mockCustomer } from '@/tests/domain/mocks'
import { Customer } from '@/domain/customer'

const makeSut = (): CustomerRepository => new CustomerRepository()

const createCustomer = (): Customer => {
  const customerRepository = makeSut()
  const customer = mockCustomer()
  customerRepository.create(customer)
  return customer
}

describe('CustomerRepository', () => {
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

  it('should create a customer', async () => {
    const customer = createCustomer()
    const customerModel = await CustomerModel.findOne({ where: { id: customer.id } })

    expect(customerModel?.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: customer.address.street,
      number: customer.address.number,
      city: customer.address.city,
      zipCode: customer.address.zipCode
    })
  })

  it('should update a customer', async () => {
    const sut = makeSut()
    const customer = createCustomer()
    const name = faker.name.firstName()
    customer.changeName(name)
    await sut.update(customer)
    const customerModel = await CustomerModel.findOne({ where: { id: customer.id } })

    expect(customerModel?.toJSON()).toStrictEqual({
      id: customer.id,
      name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: customer.address.street,
      number: customer.address.number,
      zipCode: customer.address.zipCode,
      city: customer.address.city
    })
  })

  it('should find a customer', async () => {
    const sut = makeSut()
    const customer = createCustomer()

    const customerResult = await sut.find(customer.id)

    expect(customer).toStrictEqual(customerResult)
  })

  it('should throw an error when customer is not found', async () => {
    const sut = makeSut()

    expect(async () => {
      await sut.find(faker.datatype.uuid())
    }).rejects.toThrow('Customer not found')
  })

  it('should find all customers', async () => {
    const sut = makeSut()
    const customer1 = createCustomer()
    customer1.addRewardPoints(10)
    customer1.activate()

    const customer2 = createCustomer()
    customer2.addRewardPoints(20)

    sut.update(customer1)
    sut.update(customer2)

    const customers = await sut.findAll()

    expect(customers).toHaveLength(2)
    expect(customers).toContainEqual(customer1)
    expect(customers).toContainEqual(customer2)
  })
})
