export default class OrderItem {
  _id: string
  _product_id: string
  _name: string
  _price: number
  _quantity: number

  constructor (id: string, name: string, price: number, productId: string, quantity: number) {
    this._id = id
    this._name = name
    this._price = price
    this._product_id = productId
    this._quantity = quantity
  }

  orderItemTotal (): number {
    return this._price * this._quantity
  }

  get id (): string {
    return this._id
  }

  get name (): string {
    return this._name
  }

  get quantity (): number {
    return this._quantity
  }

  get price (): number {
    return this._price
  }

  get product_id (): string {
    return this._product_id
  }
}
