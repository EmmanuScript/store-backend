import { Products, ProductStore } from '../../models/products.model';

const store = new ProductStore()

describe('Product Model', () => {
    it('should create a product', async () => {
        const result = await store.createProduct({
            name: 'Test product',
            price: '40.25',
            category: 'Test category',
        })
        expect(result).toEqual({
                id: 1,
                name: 'Test product',
                price: '40.25',
                category: 'Test category',
        })
    })


    it('should return a list of products', async () => {
        const result = await store.getProducts()
        expect(result).toEqual([{
            id: 1,
            name: 'Test product',
            price: '40.25',
            category: 'Test category',
        }])
    })

    it('should return the correct product', async () => {
        const result = await store.getProductById(1)
        expect(result).toEqual({
            id: 1,
            name: 'Test product',
            price: '40.25',
            category: 'Test category',
        })
    })

    it('should delete the product', async () => {
        await store.deleteProduct(1)
        const result = await store.getProducts()

        expect(result).toEqual([])
    })
})
