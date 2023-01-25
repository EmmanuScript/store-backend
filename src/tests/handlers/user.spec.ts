import supertest from 'supertest';
import userRoutes from '../../handlers/users';



const request = supertest(userRoutes)


describe('Users controllers: ', () => {
    it('/users/create should return a user', () => {
        const data = {
            username: 'orlando',
            password: 'emmanue234',
        }
        request
            .post('/users')
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(201)
    })


    it('/users/:id should show a user', () => {

        request
            .get('/users/1')
            .expect('Content-Type', 'application/json')
            .expect(200)
            .expect({
                id: 1,
                username: 'orlando',
            })
    })


    it('/users/:id should authenticate a user', () => {
        request.post('/users/authenticate').expect(200)
    })
})
