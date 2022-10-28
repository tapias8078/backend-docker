const validarProyecto = (req) => {
    const validaciones = []
    if(!req.body.numero){
        validaciones.push('Numero es Requerido')
    }
    if(!req.body.titulo){
        validaciones.push('Titulo es Requerida')
    }
    if(!req.body.descripcion){
        validaciones.push('Descripcion es Requerida')
    }
    if(!req.body.valor){
        validaciones.push('Valor es Requerido')
    }
    if(!req.body.fechaEntrega){
        validaciones.push('Fecha de Entrega es Requerida')
    }
    if(!req.body.fechaIniciacion){
        validaciones.push('Fecha de Inicio es Requerida')
    }
    if(!req.body.cliente){
        validaciones.push('Cliente es Requerida')
    }
    if(!req.body.tipoProyecto){
        validaciones.push('Tipo de Proyecto es Requerido')
    }
    if(!req.body.universidad){
        validaciones.push('Universidad es Requerida')
    }
    if(!req.body.etapa){
        validaciones.push('Etapa es Requerida')
    }
    
   
   

    return validaciones
}

module.exports = {
    validarProyecto
}