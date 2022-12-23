export type InputListProductDto = {}

export type OutputListProductDto = {
  products: Product[]
}

type Product = {
  id: string
  name: string
  price: number
}
