import express, { Request, Response } from 'express'

import { CustomerRepository } from '@/infra/customer'
import { CreateCustomerUseCase } from '@/usecase/customer'

export const customerRoute = express.Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
customerRoute.post('/', async (req: Request, res: Response) => {
  const usecase = new CreateCustomerUseCase(new CustomerRepository())

  console.log(req.body)
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
