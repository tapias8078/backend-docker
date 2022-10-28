const express = require('express')
const {getConnection} = require('./db/db-connection-mongo')
require('dotenv').config()

const cors = require('cors')

const app = express()
const port = process.env.PORT

//Implementado Cors
app.use(cors())

getConnection()

//Parseo Json
app.use(express.json())

app.use('/cliente',require('./router/cliente'))
app.use('/etapas',require('./router/etapas'))
app.use('/tipo-proyecto',require('./router/tipoProyecto'))
app.use('/universidad',require('./router/universidad'))
app.use('/proyecto',require('./router/proyecto'))


app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`)
})


