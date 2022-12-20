export default class Address {
  _street: string = ''
  _number: number = 0
  _city: string = ''
  _zipCode: string = ''

  constructor (street: string, number: number, city: string, zipCode: string) {
    this._street = street
    this._number = number
    this._city = city
    this._zipCode = zipCode

    this.validate()
  }

  get street (): string {
    return this._street
  }

  get number (): number {
    return this._number
  }

  get zipCode (): string {
    return this._zipCode
  }

  get city (): string {
    return this._city
  }

  validate (): void {
    if (this.street.length === 0) {
      throw new Error('Street is required')
    }

    if (this._number === 0) {
      throw new Error('Number is required')
    }

    if (this._city.length === 0) {
      throw new Error('City is required')
    }

    if (this._zipCode.length === 0) {
      throw new Error('zipCode is required')
    }
  }
}
