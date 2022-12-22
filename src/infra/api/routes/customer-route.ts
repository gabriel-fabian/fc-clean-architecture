import express, { Request, Response } from 'express'

import { CustomerRepository } from '@/infra/customer'
import { CustomerPresenter } from '@/infra/api/presenters'
import { CreateCustomerUseCase, ListCustomerUseCase } from '@/usecase/customer'

export const customerRoute = express.Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
customerRoute.post('/', async (req: Request, res: Response) => {
  const usecase = new CreateCustomerUseCase(new CustomerRepository())

  try {
    const customerDto = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        city: req.body.address.city,
        number: req.body.address.number,
        zipCode: req.body.address.zipCode
      }
    }

    const output = await usecase.run(customerDto)
    res.send(output)
  } catch (err) {
    res.status(500).json(err)
  }
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
customerRoute.get('/', async (_req: Request, res: Response) => {
  const usecase = new ListCustomerUseCase(new CustomerRepository())
  const output = await usecase.run()

  res.format({
    json: async () => res.send(output),
    xml: async () => res.send(CustomerPresenter.listXML(output))
  })
})
