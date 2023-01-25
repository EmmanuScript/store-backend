import { OrderStore } from '../../models/order.model';
import { ProductStore } from '../../models/products.model';
import { UserStore } from '../../models/users.model';

const store = new OrderStore()
const productStore = new ProductStore()
const userStore = new UserStore()

let productId = 1
let userId = 1

describe('Order Model', () => {
    beforeAll(async () => {
        const product = await productStore.createProduct({
            name: 'Superman underroos',
            price: '40.0',
            category: 'Underwear',
        })
        productId = product.id as number
        const user = await userStore.create({
            username: 'ssmith',
            password: 'password123',
        })
    })

    afterAll(async () => {
        await productStore.deleteProduct(productId)
        await userStore.delete(userId)
    })

    it('should create an order', async () => {
        const result = await store.createOrder({
            products_id: productId,
            quantity: 10,
            user_id: userId,
            status: 'new',
        })
        expect(result).toEqual({
            id: 1,
            products_id: productId,
            quantity: 10,
            user_id: userId,
            status: 'new',
        })
    })

    it('should return a list of orders', async () => {
        const result = await store.getAllOrders()
        expect(result).toEqual([
            {
                id: 1,
                products_id: productId,
                quantity: 10,
                user_id: userId,
                status: 'new',
            },
        ])
    })

    it('should return the correct order', async () => {
        const result = await store.getOrders(1)
        expect(result).toEqual([{
            id: 1,
            products_id: productId,
            quantity: 10,
            user_id: userId,
            status: 'new',
        }])
    })


    it('should delete the order', async () => {
        await store.deleteOrder(1)
        const result = await store.getAllOrders()
        expect(result).toEqual([])
    })
})
