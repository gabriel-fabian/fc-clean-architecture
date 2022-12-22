import { Customer } from '@/domain/customer'
import { ValidatorInterface } from '@/domain/@shared/validator'
import { CustomerYupValidator } from '@/domain/customer/validator'

export class CustomerValidatorFactory {
  static create (): ValidatorInterface<Customer> {
    return new CustomerYupValidator()
  }
}
