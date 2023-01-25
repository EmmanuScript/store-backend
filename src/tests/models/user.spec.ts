import { UserStore } from '../../models/users.model'

const store = new UserStore()

describe('User Model', () => {
    it('should create a user', async () => {
        const result = await store.create({
            username: 'ssmith',
            password: 'password123',
        })
        expect(result.username).toEqual('ssmith')
    })


    it('should return a list of users', async () => {
        const result = await store.index()
        expect(result.length).toEqual(1)
    })

    it('should return the correct user', async () => {
  
        const userId = 1
        const result = await store.show(userId)
        expect(result.username).toEqual('ssmith')
    })

    it('should delete the user', async () => {
        
        const userId = 1
        await store.delete(userId)
        const users = await store.index()

        expect(users.length).toEqual(0)
    })
})
