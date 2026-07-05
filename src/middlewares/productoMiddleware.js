const ProductoMiddleware = {
    validarDatosProducto:(req, res, next) => {
    const {nombre, precio, categoria} = req.body; //extraccion de datos que vienen del form
    const categoriasValidas = ['VINILO', 'DVD'];
    let errores = [] //array para almacenar errores

    if (!nombre || nombre.trim() == '') // trim() eliminar espacios en blanco innecesarios 
    {
        errores.push('El nombre del producto es obligatorio');
    }

    if (!precio || isNaN(precio) || precio < 0 ){
        errores.push('El precio debe ser un valor numerico distinto de cero');
    }

    if (!categoria || !categoriasValidas.includes(categoria)){
        errores.push("El tipo de producto es invalido");
    }

    if (errores.length > 0) {
        return res.status(400).json({ success: false, message: errores.join(" ") });
    }

    next();
},

    validarId : (req, res, next) => {
    const id = req.params.id || req.query.id;
    let errores = [];

    if(id && isNaN(id)){
        errores.push("ID invalido, asegurarse de ingresar un valor numerico.")
    }

    next();
}
}

export default ProductoMiddleware;