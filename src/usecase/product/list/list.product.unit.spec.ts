import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";

const product1 = ProductFactory.create("a", "Product1", 25.99)
const product2 = ProductFactory.create("a", "Product2", 30.99)



const MockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn().mockReturnValue([product1, product2]),
        find: jest.fn()
    }
}


describe('Unit test list product usecase', () => {
    test('Should a listing product', async () => {
        const productMockRepository = MockRepository()
        const usecase = new ListProductUseCase(productMockRepository)

        const output = await usecase.execute({})

        expect(output.products[0].id).toBe(product1.id)
        expect(output.products[0].name).toBe(product1.name)
        expect(output.products[0].price).toBe(product1.price)


        expect(output.products[1].id).toBe(product2.id)
        expect(output.products[1].name).toBe(product2.name)
        expect(output.products[1].price).toBe(product2.price)
    });
});