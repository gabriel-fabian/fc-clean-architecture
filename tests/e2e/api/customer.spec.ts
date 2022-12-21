import { faker } from '@faker-js/faker'
import request from 'supertest'

import { app, sequelize } from '@/infra/api/express'

describe('Customer E2E', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should create a customer', async () => {
    const name = faker.name.firstName()
    const street = faker.address.street()
    const city = faker.address.city()
    const number = faker.datatype.number()
    const zipCode = faker.address.zipCode()

    const response = await request(app)
      .post('/customer')
      .send({
        name,
        address: {
          street,
          city,
          number,
          zipCode
        }
      })

    expect(response.status).toBe(200)
    expect(response.body.name).toBe(name)
    expect(response.body.address.city).toBe(city)
    expect(response.body.address.number).toBe(number)
    expect(response.body.address.zipCode).toBe(zipCode)
  })
})
