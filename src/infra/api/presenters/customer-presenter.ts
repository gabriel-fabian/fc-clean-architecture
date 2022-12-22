import { OutputListCustomerDto } from '@/usecase/customer/list/list-customer-dto'
import { toXML } from 'jstoxml'

export class CustomerPresenter {
  static listXML (data: OutputListCustomerDto): string {
    const xmlOption = {
      header: true,
      indent: '  ',
      newline: '\n',
      allowEmpty: true
    }

    return toXML({
      customers: {
        customer: data.customers.map(customer => ({
          id: customer.id,
          name: customer.name,
          address: {
            street: customer.address.street,
            number: customer.address.number,
            zipCode: customer.address.zipCode,
            city: customer.address.city
          }
        }))
      }
    },
    xmlOption
    )
  }
}
