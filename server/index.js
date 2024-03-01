import "dotenv/config"
import express from "express"
import cors from 'cors'
import routes from './src/routes/index.js'

const app = express()
app.use(cors())


const port = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api', routes)

app.listen(port, () => {
    console.log(`Serviço iniciado na porta ${port} ☝️`)
})