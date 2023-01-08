import ProductFactory from "../../../domain/product/factory/product.factory"
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create("a", "Tenis", 25.99)



const MockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product))
    }
}




describe('Unit test update product usecase', () => {
    test('should updated a product', async () => {

        const productMockRepository = MockRepository()
        const usecase = new UpdateProductUseCase(productMockRepository)

        const input = {
            id: product.id,
            name: "Tenis updated",
            price: 30.99
        }


        const output = await usecase.execute(input)


        expect(output).toEqual(input)

    });
});