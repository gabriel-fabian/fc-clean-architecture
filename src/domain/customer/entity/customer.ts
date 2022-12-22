import { Entity } from '@/domain/@shared/entity/entity-abstract'
import { NotificationError } from '@/domain/@shared/notification'
import { CustomerValidatorFactory } from '@/domain/customer/factory'
import { Address } from '@/domain/customer'

export default class Customer extends Entity {
  private _name: string = ''
  private _address!: Address
  private _active: boolean = false
  private _rewardPoints: number = 0

  constructor (id: string, name: string) {
    super()
    this._id = id
    this._name = name
    this.validate()

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.errors)
    }
  }

  validate (): void {
    CustomerValidatorFactory.create().validate(this)
  }

  get name (): string {
    return this._name
  }

  get rewardPoints (): number {
    return this._rewardPoints
  }

  get address (): Address {
    return this._address
  }

  set address (address: Address) {
    this._address = address
  }

  changeName (name: string): void {
    this._name = name
  }

  changeAddress (address: Address): void {
    this._address = address
  }

  isActive (): boolean {
    return this._active
  }

  activate (): void {
    if (this._address === undefined) {
      throw new Error('Address is mandatory to activate customer')
    }
    this._active = true
  }

  deactivate (): void {
    this._active = false
  }

  addRewardPoints (points: number): void {
    this._rewardPoints += points
  }
}
