const validarTipoProyecto = (req) => {
    const validaciones = []
    if(!req.body.nombre){
        validaciones.push('Nombre es Requerido')
    }
   
   

    return validaciones
}

module.exports = {
    validarTipoProyecto
}