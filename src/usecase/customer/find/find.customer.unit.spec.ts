import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import FindCustomerUseCase from "./find.customer";


const customer = new Customer("123", "Jhon")
const address = new Address("Street", 123, "Zip", "City")
customer.changeAddress(address)


const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}


describe('Unit Test find customer usecase', () => {

    it("should find a costumer", async () => {

        const customerRepository = MockRepository()
        const usecase = new FindCustomerUseCase(customerRepository)


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