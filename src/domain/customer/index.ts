export { default as Address } from './value-object/address'
export { default as Customer } from './entity/customer'
export { default as CustomerAddressChangedEvent } from './event/customer-address-changed-event'
export { default as CustomerCreatedEvent } from './event/customer-created-event'
export { default as CustomerRepositoryInterface } from './repository/customer-repository-interface'

export {
  default as SendEmailWhenCustomerAddressChangedHandler
} from './event/handler/send-email-when-customer-address-changed-handler'
export {
  default as SendEmailWhenCustomerIsCreatedHandler
} from './event/handler/send-email-when-customer-is-created-handler'
export {
  default as SendSmsWhenCustomerIsCreatedHandler
} from './event/handler/send-sms-when-customer-is-created-handler'
