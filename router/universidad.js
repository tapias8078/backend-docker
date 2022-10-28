const {Router} = require('express')
const Universidad = require('../models/Universidad')
const {validarUniversidad} = require('../helpers/validar-Universidad')
const router = Router()


router.get('/', async function(req,res){
    try{
        const universidades = await Universidad.find()
        res.send(universidades)
    }catch(error){
        console.log(error);
        res.send('Ocurrio un error')
    }

})
router.post('/', async function(req,res){
    try{
        const validaciones = validarUniversidad(req)
        if (validaciones.length > 0) {
            return res.status(400).send(validaciones)
        }
        let universidad = new Universidad();
        universidad.nombre = req.body.nombre
        universidad.direccion = req.body.direccion
        universidad.telefono = req.body.telefono
        universidad.fechaCreacion = new Date()
        universidad.fechaActualizacion = new Date()
        universidad = await universidad.save()   
        res.send(universidad)
    }catch(error){
        console.log(error);
        res.send('Ocurrio un error')
    }
})
router.put('/:universidadId', async function(req,res){
    try{
        let universidad = await Universidad.findById(req.params.universidadId)
        if(!universidad){
            return res.send('No existe el Universidad')
        }
        universidad.nombre = req.body.nombre
        universidad.direccion = req.body.direccion
        universidad.telefono = req.body.telefono
        universidad.fechaActualizacion = new Date()
        universidad = await universidad.save()   
        res.send(universidad)
    }catch(error){
        console.log(error);
        res.send('Ocurrio un error')
    }
})

router.get('/:universidadId', async function(req, res){
    try {
        const universidad = await Universidad.findById(req.params.universidadId)
        if (!universidad) {
            return res.status(404).send('Universidad no existe')
                          
        }
        res.send(universidad)
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al consultar Universidad')
    }
 })

module.exports = router