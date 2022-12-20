export type InputListCustomerDto = {}

type Customer = {
  id: string
  name: string
  address: {
    street: string
    number: number
    city: string
    zipCode: string
  }
}

export type OutputListCustomerDto = {
  customers: Customer[]
}
