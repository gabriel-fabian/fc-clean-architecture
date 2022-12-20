import { faker } from '@faker-js/faker'

import { Order, OrderItem } from '@/domain/checkout'

describe('Order unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      void new Order('', faker.datatype.uuid(), [])
    }).toThrowError('Id is required')
  })

  it('should throw error when customerId is empty', () => {
    expect(() => {
      void new Order(faker.datatype.uuid(), '', [])
    }).toThrowError('CustomerId is required')
  })

  it('should throw error when items is empty', () => {
    expect(() => {
      void new Order(faker.datatype.uuid(), faker.datatype.uuid(), [])
    }).toThrowError('Item qtd must be greater than 0')
  })

  it('should calculate total', () => {
    const item = new OrderItem('i1', 'item 1', 100, 'p1', 2)
    const item2 = new OrderItem('i1', 'item 2', 200, 'p2', 2)
    const order = new Order('o1', 'c1', [item])

    let total = order.total()

    expect(total).toBe(200)

    const order2 = new Order('o1', 'c1', [item, item2])

    total = order2.total()

    expect(total).toBe(600)
  })

  it('should throw error if the item quantity is less or equal 0', () => {
    expect(() => {
      const item = new OrderItem('i1', 'item 1', 100, 'p1', 0)
      void new Order('o1', 'c1', [item])
    }).toThrowError('Item quantity must be greater than 0')
  })
})
