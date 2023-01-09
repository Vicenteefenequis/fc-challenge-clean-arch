import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import FindCustomerUseCase from "./find.customer.usecase";

describe('Integration Test find customer usecase', () => {
    let sequelize: Sequelize


    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        })

        sequelize.addModels([CustomerModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should find a costumer", async () => {

        const customerRepository = new CustomerRepository()
        const usecase = new FindCustomerUseCase(customerRepository)

        const customer = new Customer("123", "Jhon")
        const address = new Address("Street", 123, "Zip", "City")
        customer.changeAddress(address)
        await customerRepository.create(customer)


        const input = {
            id: "123"
        }

        const output = {
            id: "123",
            name: "Jhon",
            address: {
                street: "Street",
                number: 123,
                city: "City",
                zip: "Zip"
            }
        }


        const result = await usecase.execute(input)


        expect(result).toEqual(output)


    })
});