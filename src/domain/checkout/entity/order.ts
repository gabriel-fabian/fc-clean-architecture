import { OrderItem } from '@/domain/checkout'

export default class Order {
  private readonly _id: string
  private readonly _customer_id: string
  private readonly _items: OrderItem[] = []

  constructor (id: string, customerId: string, items: OrderItem[]) {
    this._id = id
    this._customer_id = customerId
    this._items = items

    this.validate()
  }

  get id (): string {
    return this._id
  }

  get customer_id (): string {
    return this._customer_id
  }

  get items (): OrderItem[] {
    return this._items
  }

  validate (): boolean {
    if (this._id.length === 0) {
      throw new Error('Id is required')
    }

    if (this._customer_id.length === 0) {
      throw new Error('CustomerId is required')
    }

    if (this._items.length === 0) {
      throw new Error('Item qtd must be greater than 0')
    }

    if (this._items.some((item) => item._quantity <= 0)) {
      throw new Error('Item quantity must be greater than 0')
    }

    return true
  }

  total (): number {
    return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0)
  }

  addItem (item: OrderItem): OrderItem[] {
    this._items.push(item)
    return this._items
  }
}
