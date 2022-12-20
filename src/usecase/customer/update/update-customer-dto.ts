export type InputUpdateCustomerDto = {
  id: string
  name: string
  address: {
    street: string
    number: number
    zipCode: string
    city: string
  }
}

export type OutputUpdateCustomerDto = {
  id: string
  name: string
  address: {
    street: string
    number: number
    zipCode: string
    city: string
  }
}
