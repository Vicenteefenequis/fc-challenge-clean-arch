import ProductFactory from "../../../domain/product/factory/product.factory"
import FindProductUseCase from "./find.product.usecase";

const product = ProductFactory.create("a", "Tenis", 25.99)


const MockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product))
    }
}


describe('Unit test find product use case', () => {
    test('should find a product', async () => {
        const productMockRepository = MockRepository()
        const usecase = new FindProductUseCase(productMockRepository)

        const input = {
            id: "any_id"
        }

        const output = await usecase.execute(input)

        expect(output).toEqual({
            id: product.id,
            name: product.name,
            price: product.price
        })
    });
});