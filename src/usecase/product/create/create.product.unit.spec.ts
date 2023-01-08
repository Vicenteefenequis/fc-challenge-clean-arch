import CreateProductUseCase from "./create.product.usecase";


const input = {
    name: "Jhon doe",
    price: 25.99
}


const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}


describe('Unit test create product usecase', () => {

    test('Should create a product', async () => {
        const productMockRepository = MockRepository()
        const useCase = new CreateProductUseCase(productMockRepository)

        const output = await useCase.execute(input)

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        })

    });
});

