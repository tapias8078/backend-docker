const {Router} = require('express')
const Etapas = require('../models/Etapas')
const {validarEtapa} = require('../helpers/validar-Etapas')
const router = Router()


router.get('/', async function(req,res){
    try{
        const etapa = await Etapas.find()
        res.send(etapa)
    }catch(error){
        console.log(error);
        res.send('Ocurrio un error')
    }

})
router.post('/', async function(req,res){
    try{
        const validaciones = validarEtapa(req)
        if (validaciones.length > 0) {
            return res.status(400).send(validaciones)
        }
        let etapa = new Etapas();
        etapa.nombre = req.body.nombre        
        etapa.fechaCreacion = new Date()
        etapa.fechaActualizacion = new Date()
        etapa = await etapa.save()   
        res.send(etapa)
    }catch(error){
        console.log(error);
        res.send('Ocurrio un error')
    }
})
router.put('/:etapaId', async function(req,res){
    try{
        let etapa = await Etapas.findById(req.params.etapaId)
        if(!etapa){
            return res.send('No existe la Etapa')
        }
        etapa.nombre = req.body.nombre        
        etapa.fechaActualizacion = new Date()
        etapa = await etapa.save()   
        res.send(etapa)
    }catch(error){
        console.log(error);
        res.send('Ocurrio un error')
    }
})

router.get('/:etapaId', async function(req, res){
    try {
        const etapa = await Etapas.findById(req.params.etapaId)
        if (!etapa) {
            return res.status(404).send('Etapas no existe')
                          
        }
        res.send(etapa)
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al consultar Etapas')
    }
 })

module.exports = router