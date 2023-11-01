import express from 'express'
import usersRoutes from './routes/index'
import productsRoutes from './routes/products'
import { errorHandler, logError } from './middleware/error.handler'
import cors from 'cors'


const app = express()

const allowedOrigins = ['http://localhost:5000']
const options: cors.CorsOptions = {
  origin: allowedOrigins
}
app.use(cors(options))


//middlewares FAZT
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(usersRoutes)
app.use(productsRoutes)

app.use(logError)
app.use(errorHandler)

app.listen(3000) // Debe escuchar en un puerto especifico 'port'
console.log('server on port', 3000)


/* app.listen(port, () => {
  console.log('server on port')
})
 */
