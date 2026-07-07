import ProductosModelo from "../models/ProductoModel.js";
import db from "../api/database/db.js"

const controladorProductos = {
    formularioAltaProductos: async (req, res) =>{
        res.render('alta', {titulo: 'agregar nuevo producto'});
    },

    procesoDatos: async (req, res) => {
        try {
            const {nombre, genero, categoria, precio} = req.body; 
            const rutaImg = req.file ? `/uploads/${req.file.filename}` : null; // atraves de este req se accede al nombre del archivo para guardarlo en la bd

            await ProductosModelo.crear(nombre, rutaImg, genero, categoria, precio);

            res.status(201).json({ success: true, message: 'Producto creado correctamente' });
            console.log(req.body);
            console.log(req.file);
            
            
        } catch (error) {
            console.log(error);
            res.status(500).send('Se produjo un error al guardar el producto')
        }
    },
    
    cambiarEstadoProducto: async (req, res) => {
        try {
            const { id } = req.params;
            const { estado } = req.body;

            if (estado === undefined) {
                return res.status(400).send('Falta el estado del producto');
            }

            await ProductosModelo.cambiarEstado(id, estado);
            res.redirect('/admin/dashboard');
        } catch (error) {
            console.log("Error al actualizar el estado: ", error);
            res.status(500).send('Error al procesar la solicitud');
        }
    },

    buscarPorId: async (req, res) =>{
        try {
            const {id} = req.query; //destructuracion
            let productosDb = [];

            if (id){
                productosDb = await ProductosModelo.buscar(id)
            }
            res.render("consulta", { productos: productosDb });

        } catch (error) {
            console.log(error);
            res.status(500).send("Error al realizar la consulta.")
            
        }
    },

    modificarDatos: async (req, res) => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).send("No se recibió el id del producto");
            }

            const productosDb = await ProductosModelo.buscar(id);

            if (!productosDb || productosDb.length === 0) {
                return res.status(404).send("producto no encontrado");
            }

            res.render('modificar', { titulo: 'Modificar Producto', producto: productosDb[0]
            });
        } catch (error) {
            console.log(error);
            res.status(500).send("error al cargar el producto");
        }
    },

    procesarEdicion: async (req, res) => {
        try {
            const { id } = req.params;
            const { nombre, precio, genero, categoria } = req.body;

            const productoActual = await ProductosModelo.buscar(id);
            const productoGuardado = productoActual && productoActual[0] ? productoActual[0] : {};
            const rutaImagen = req.file ? `/uploads/${req.file.filename}` : (productoGuardado.imagen || productoGuardado.rutaImg || null);

            await ProductosModelo.modificar(
                id,
                nombre,
                precio,
                genero,
                categoria,
                rutaImagen
            );

            res.redirect('/admin/dashboard');
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: error.message || 'Error al modificar el producto'
            });
        }
    },

    obtenerProductosClientes: async (req,res) =>{
        try {

        const productos = await ProductosModelo.mostrarActivos();

        res.json(productos); 
        } catch (error) {
            console.error("Error al obtener productos de la API:", error);
            res.status(500).json({ mensaje: "Error del servidor" });
        }
    }
}

export default controladorProductos;
