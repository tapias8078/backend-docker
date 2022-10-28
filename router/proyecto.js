const {Router} = require('express')
const Proyecto = require('../models/Proyecto')
const {validarProyecto} = require('../helpers/validar-Proyecto')
const router = Router()


router.get('/', async function(req,res){
    try{
        const proyectos = await Proyecto.find()
        res.send(proyectos)
    }catch(error){
        console.log(error);
        res.send('Ocurrio un error')
    }

})
router.post('/', async function(req,res){
    try{
        const validaciones = validarProyecto(req)
        if (validaciones.length > 0) {
            return res.status(400).send(validaciones)
        }
        let proyecto = new Proyecto();
        proyecto.numero = req.body.numero
        proyecto.titulo = req.body.titulo
        proyecto.descripcion = req.body.descripcion
        proyecto.valor = req.body.valor
        proyecto.fechaIniciacion = req.body.fechaIniciacion
        proyecto.fechaEntrega = req.body.fechaEntrega
        proyecto.cliente = req.body.cliente._id
        proyecto.tipoProyecto = req.body.tipoProyecto._id
        proyecto.universidad = req.body.universidad._id
        proyecto.etapa = req.body.etapa._id
        proyecto.fechaCreacion = new Date()
        proyecto.fechaActualizacion = new Date()
        proyecto = await proyecto.save()   
        res.send(proyecto)
    }catch(error){
        console.log(error);
        res.send('Ocurrio un error')
    }
})
router.put('/:proyectoId', async function(req,res){
    try{
        let proyecto = await Proyecto.findById(req.params.proyectoId)
        if(!proyecto){
            return res.send('No existe el Proyecto')
        }
        proyecto.numero = req.body.numero
        proyecto.titulo = req.body.titulo
        proyecto.descripcion = req.body.descripcion
        proyecto.valor = req.body.valor
        proyecto.fechaIniciacion = req.body.fechaIniciacion
        proyecto.fechaEntrega = req.body.fechaEntrega
        proyecto.cliente = req.body.cliente._id
        proyecto.tipoProyecto = req.body.tipoProyecto._id
        proyecto.universidad = req.body.universidad._id
        proyecto.etapa = req.body.etapa._id
        proyecto.fechaActualizacion = new Date()
        proyecto = await proyecto.save()   
        res.send(proyecto)
    }catch(error){
        console.log(error);
        res.send('Ocurrio un error')
    }
})

router.get('/:proyectoId', async function(req, res){
    try {
        const proyecto = await Proyecto.findById(req.params.proyectoId)
        if (!proyecto) {
            return res.status(404).send('Proyecto no existe')
                          
        }
        res.send(proyecto)
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al consultar Proyecto')
    }
 })

module.exports = router