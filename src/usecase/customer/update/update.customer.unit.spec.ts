import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress("Jhon", new Address("Street", 123, "Zip", "City"))


const input = {
    id: customer.id,
    name: "Jhon Updated",
    address: {
        street: "Street Updated",
        number: 1234,
        zip: "Zip Updated",
        city: "City Updated"
    }
}


const MockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        update: jest.fn()
    }
}

describe('Unit test update customer use case', () => {
    test('Should update a customer', async () => {
        const customerMockRepository = MockRepository()
        const updateCustomerUseCase = new UpdateCustomerUseCase(customerMockRepository)

        const output = await updateCustomerUseCase.execute(input)

        expect(output).toEqual(input)
    });
});
