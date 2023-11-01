import { Router } from 'express'
import cors from 'cors'
import { getUsers, getUserById, createUser, deleteUser, updateUsers, } from '../controllers/users.controllers'
import { validateCreateUser, validateUpdateUser, validateIdUser } from '../validators/users'

const router = Router() // objeto que me permite crear rutas para mi servidor

router.get('/users', getUsers)
router.get('/users/:id', validateIdUser, getUserById)
router.post('/users', validateCreateUser, createUser)
router.put('/users/:id', validateUpdateUser, updateUsers)
router.delete('/users/:id', deleteUser)



// router.get('/users/:id/products')
// http://localhost:3000/products/
// http://localhost:3000/users/:id/products ===== bla bla bla bla


export default router

