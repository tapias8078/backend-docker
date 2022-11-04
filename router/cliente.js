const {Router} = require('express')
const Cliente = require('../models/Cliente')
const {validarCliente} = require('../helpers/validar-cliente')
const router = Router()


router.get('/', async function(req,res){
    try{
        const clientes = await Cliente.find()
        res.send(clientes)
    }catch(error){
        console.log(error);
        res.send('Ocurrio un error')
    }

})
router.post('/', async function(req,res){
    try{
        const validaciones = validarCliente(req)
        if (validaciones.length > 0) {
            return res.status(400).send(validaciones)
        }
        let cliente = new Cliente();
        cliente.nombre = req.body.nombre
        cliente.email = req.body.email
        cliente.fechaCreacion = new Date()
        cliente.fechaActualizacion = new Date()
        cliente = await cliente.save()   
        res.send(cliente)
    }catch(error){
        console.log(error);
        res.send('Ocurrio un error')
    }
})
router.put('/:clienteId', async function(req,res){
    try{
        let cliente = await Cliente.findById(req.params.clienteId)
        if(!cliente){
            return res.send('No existe el Cliente')
        }
        cliente.nombre = req.body.nombre
        cliente.email = req.body.email
        cliente.fechaActualizacion = new Date()
        cliente = await cliente.save()   
        res.send(cliente)
    }catch(error){
        console.log(error);
        res.send('Ocurrio un error')
    }
})

router.get('/:clienteId', async function(req, res){
    try {
        const cliente = await Cliente.findById(req.params.clienteId)
        if (!cliente) {
            return res.status(404).send('Cliente no existe')
                          
        }
        res.send(cliente)
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al consultar Cliente')
    }
 })

module.exports = router