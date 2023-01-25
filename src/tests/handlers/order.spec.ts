import supertest from 'supertest'
import productRoutes from '../../handlers/products'
import jwt from 'jsonwebtoken';


const request = supertest(productRoutes)
const token: string = jwt.sign({id: 1, username: 'orlando'}, 'bearer')


fdescribe('Product controllers: ', () => {
    it('should return a new user after it is created', () => {
        const data = {
            name: 'Test leather',
            price: '100',
            category: 'wallet',
        }
        request
            .post('/products')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect('Content-Type', /json/)
            .expect(201)
            .expect({
                id: 1,
                name: 'Test leather',
                price: '100',
                category: 'wallet',
            })
    })


    it('should show all products', () => {
        request
            .get('/products')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect({
                id: 1,
                name: 'Test leather',
                price: '100',
                category: 'wallet',
            })
    })

    it('should show a product given an id', () => {
        
        request
            .get('/products/1')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect({
                id: 1,
                name: 'Test leather',
                price: '100',
                category: 'wallet',
            })
    })


    it('should delete a product given its id', () => {
        request
            .delete('/api/products/1')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then(() => {
                request.get('/api/products').expect({
                    id: 1,
                name: 'Test leather',
                price: '100',
                category: 'wallet',
                })
            })
    })
})
