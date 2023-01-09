import { app, sequelize } from "../express";
import request from 'supertest'
describe('E2E test for product', () => {

    beforeEach(async () => {
        await sequelize.sync()
    })

    afterAll(async () => {
        await sequelize.close()
    })


    it("Should create a product", async () => {
        const response = await request(app).post('/product').send({
            name: "Product",
            price: 25.99
        })


        expect(response.status).toBe(200)
        expect(response.body.name).toBe("Product")
        expect(response.body.price).toBe(25.99)
    })

    it("Should not create a product", async () => {
        const response = await request(app).post('/product').send({
            name: "Product",
        })

        expect(response.status).toBe(500)
    })


    it("Should listing a product", async () => {
        const response1 = await request(app).post('/product').send({
            name: "Product 1",
            price: 25.99
        })

        expect(response1.status).toBe(200)

        const response2 = await request(app).post('/product').send({
            name: "Product 2",
            price: 32.00
        })

        expect(response2.status).toBe(200)


        const listResponse = await request(app).get('/product').send()


        const product1 = listResponse.body.products[0]
        const product2 = listResponse.body.products[1]

        expect(product1.name).toBe('Product 1')
        expect(product1.price).toBe(25.99)

        expect(product2.name).toBe('Product 2')
        expect(product2.price).toBe(32.00)
    })


});











