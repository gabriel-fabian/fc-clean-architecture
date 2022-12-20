import Address from './domain/customer/value-object/address'
import Customer from './domain/customer/entity/customer'
import Order from './domain/checkout/entity/order'
import OrderItem from './domain/checkout/entity/order-item'

const customer = new Customer('123', 'Gabriel Fabian')
const address = new Address('rua dois', 2, '12345-678', 'São Paulo')
customer.changeAddress(address)
customer.activate()

const item1 = new OrderItem('1', 'item 1', 10, 'product 1', 1)
const item2 = new OrderItem('2', 'item 2', 15, 'product 2', 2)
const order = new Order('1', '123', [item1, item2])
console.log(order)
