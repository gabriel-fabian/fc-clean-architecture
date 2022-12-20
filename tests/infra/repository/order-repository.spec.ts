import { Sequelize } from 'sequelize-typescript'
import { faker } from '@faker-js/faker'

import { Customer } from '@/domain/customer'
import { Order, OrderItem } from '@/domain/checkout'
import { Product } from '@/domain/product'
import { CustomerModel, CustomerRepository } from '@/infra/customer'
import { OrderModel, OrderItemModel, OrderRepository } from '@/infra/order'
import { ProductModel, ProductRepository } from '@/infra/product'
import { mockCustomer, mockProduct, mockOrder, mockOrderItem } from '@/tests/domain/mocks'

const makeSut = (): OrderRepository => new OrderRepository()

const makeCustomer = async (): Promise<Customer> => {
  const customerRepository = new CustomerRepository()
  const customer = mockCustomer()
  await customerRepository.create(customer)
  return customer
}

const makeProduct = async (): Promise<Product> => {
  const productRepository = new ProductRepository()
  const product = mockProduct()
  await productRepository.create(product)
  return product
}

const makeOrder = async (customer: Customer, orderItems: OrderItem[]): Promise<Order> => {
  const sut = makeSut()
  const order = mockOrder(customer, orderItems)
  await sut.create(order)
  return order
}

describe('OrderRepository', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a new order', async () => {
    const customer = await makeCustomer()
    const product = await makeProduct()
    const orderItem = mockOrderItem(product)
    const order = await makeOrder(customer, [orderItem])

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items']
    })

    expect(orderModel?.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: order.id,
          product_id: product.id
        }
      ]
    })
  })

  it('should update an order', async () => {
    const customer = await makeCustomer()
    const product = await makeProduct()
    const orderItem = mockOrderItem(product)
    const order = await makeOrder(customer, [orderItem])
    const product2 = await makeProduct()
    const orderItem2 = mockOrderItem(product2)

    order.addItem(orderItem2)
    const sut = makeSut()
    await sut.update(order)

    const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ['items'] })

    expect(orderModel?.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: order.id,
          product_id: product.id
        },
        {
          id: orderItem2.id,
          name: orderItem2.name,
          price: orderItem2.price,
          quantity: orderItem2.quantity,
          order_id: order.id,
          product_id: product2.id
        }
      ]
    })
  })

  it('should find an order', async () => {
    const sut = makeSut()
    const product = await makeProduct()
    const customer = await makeCustomer()
    const orderItem = mockOrderItem(product)
    const order = await makeOrder(customer, [orderItem])
    const orderResult = await sut.find(order.id)

    expect(order).toStrictEqual(orderResult)
  })

  it('should throw if no order is found', async () => {
    const sut = makeSut()

    expect(async () => {
      await sut.find(faker.datatype.uuid())
    }).rejects.toThrow('Order not found')
  })

  it('should find all orders', async () => {
    const sut = makeSut()
    const product1 = await makeProduct()
    const customer1 = await makeCustomer()
    const orderItem1 = mockOrderItem(product1)
    const order1 = await makeOrder(customer1, [orderItem1])

    const product2 = await makeProduct()
    const customer2 = await makeCustomer()
    const orderItem2 = mockOrderItem(product2)
    const order2 = await makeOrder(customer2, [orderItem2])

    const orders = await sut.findAll()

    expect(orders).toHaveLength(2)
    expect(orders).toContainEqual(order1)
    expect(orders).toContainEqual(order2)
  })
})
