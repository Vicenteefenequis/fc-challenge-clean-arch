import CreateCustomerUseCase from "./create.customer.usecase";

const input = {
    name: "Jhon",
    address: {
        street: "Street",
        zip: "Zip",
        city: "City",
        number: 123,
    }
}
const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}




describe('Unit test create customer use case', () => {
    it("Should create a customer", async () => {
        const customerRepository = MockRepository()
        const createCustomerUseCase = new CreateCustomerUseCase(customerRepository)

        const output = await createCustomerUseCase.execute(input)

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                zip: input.address.zip,
                city: input.address.city,
                number: input.address.number,
            }
        })

    })
});