const {Router} = require('express')
const TipoProyecto = require('../models/TipoProyecto')
const {validarTipoProyecto} = require('../helpers/validar-TipoProyecto')
const router = Router()


router.get('/', async function(req,res){
    try{
        const tipoProyecto = await TipoProyecto.find()
        res.send(tipoProyecto)
    }catch(error){
        console.log(error);
        res.send('Ocurrio un error')
    }

})
router.post('/', async function(req,res){
    try{
        const validaciones = validarTipoProyecto(req)
        if (validaciones.length > 0) {
            return res.status(400).send(validaciones)
        }
        let tipoProyecto = new TipoProyecto();
        tipoProyecto.nombre = req.body.nombre        
        tipoProyecto.fechaCreacion = new Date()
        tipoProyecto.fechaActualizacion = new Date()
        tipoProyecto = await tipoProyecto.save()   
        res.send(tipoProyecto)
    }catch(error){
        console.log(error);
        res.send('Ocurrio un error')
    }
})
router.put('/:tipoProyectoId', async function(req,res){
    try{
        let tipoProyecto = await TipoProyecto.findById(req.params.tipoProyectoId)
        if(!tipoProyecto){
            return res.send('No existe el TipoProyecto')
        }
        tipoProyecto.nombre = req.body.nombre        
        tipoProyecto.fechaActualizacion = new Date()
        tipoProyecto = await tipoProyecto.save()   
        res.send(tipoProyecto)
    }catch(error){
        console.log(error);
        res.send('Ocurrio un error')
    }
})

router.get('/:tipoProyectoId', async function(req, res){
    try {
        const tipoProyecto = await TipoProyecto.findById(req.params.tipoProyectoId)
        if (!tipoProyecto) {
            return res.status(404).send('Tipo Proyecto no existe')
                          
        }
        res.send(tipoProyecto)
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al consultar Tipo Proyecto')
    }
 })

module.exports = router