import { faker } from '@faker-js/faker'
import request from 'supertest'

import { app, sequelize } from '@/infra/api/express'
import { CustomerRepository } from '@/infra/customer'
import { mockCustomer } from '@/tests/domain/mocks'

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

  it('should return 500 if params is invalid', async () => {
    const response = await request(app)
      .post('/customer')
      .send({
        name: faker.name.firstName()
      })

    expect(response.status).toBe(500)
  })

  it('should list all customers', async () => {
    const customer1 = mockCustomer()
    const customer2 = mockCustomer()

    const customerRepository = new CustomerRepository()
    customerRepository.create(customer1)
    customerRepository.create(customer2)

    const response = await request(app)
      .get('/customer')
      .send()

    expect(response.status).toBe(200)
    expect(response.body.customers.length).toBe(2)
    expect(response.body.customers[0].name).toBe(customer1.name)
    expect(response.body.customers[0].address.street).toBe(customer1.address.street)
    expect(response.body.customers[1].name).toBe(customer2.name)
    expect(response.body.customers[1].address.street).toBe(customer2.address.street)

    const responseXml = await request(app)
      .get('/customer')
      .set('Accept', 'application/xml')
      .send()

    expect(responseXml.status).toBe(200)
    expect(responseXml.text).toContain('<?xml version="1.0" encoding="UTF-8"?>')
    expect(responseXml.text).toContain('<customers>')
    expect(responseXml.text).toContain('<customer>')
    expect(responseXml.text).toContain(`<name>${customer1.name}</name>`)
    expect(responseXml.text).toContain('<address>')
    expect(responseXml.text).toContain(`<street>${customer1.address.street}</street>`)
    expect(responseXml.text).toContain(`<city>${customer1.address.city}</city>`)
    expect(responseXml.text).toContain(`<number>${customer1.address.number}</number>`)
    expect(responseXml.text).toContain(`<zipCode>${customer1.address.zipCode}</zipCode>`)
    expect(responseXml.text).toContain('</address>')
    expect(responseXml.text).toContain('</customer>')
    expect(responseXml.text).toContain(`<name>${customer2.name}</name>`)
    expect(responseXml.text).toContain('</customers>')
  })
})
