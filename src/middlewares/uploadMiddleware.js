import multer from 'multer'; // libreria para manejar archivos que llegan en formularios de tipo multipart/form-data
import path from 'path'; // modulo nativo de node para armar y manejar rutas de archivos de forma segura entre sistemas operativos
import fs from 'fs'; // file system, modulo nativo de node para leer escribir y verificar archivos y carpetas en el disco
import { fileURLToPath } from 'url';  // fileURLToPath convierte la url del archivo actual (formato file://) en una ruta de archivo comun

const __filename = fileURLToPath(import.meta.url); // import.meta.url da la url de este mismo archivo, la convertimos a ruta tradicional de archivo
const __dirname = path.dirname(__filename);// path.dirname se queda solo con la carpeta que contiene este archivo, sin el nombre del archivo
// esto reemplaza a __dirname, que no existe por defecto en esmodules


const uploadDir = path.resolve(__dirname, '..', '..', 'public', 'uploads'); // guardamos en la carpeta pública que sirve Express
if (!fs.existsSync(uploadDir)) {   // existsSync revisa si esa carpeta ya existe fisicamente en el disco
  fs.mkdirSync(uploadDir, { recursive: true });
}

const configuracionAlmacenamiento = multer.diskStorage({ // diskStorage le indica a multer que guarde los archivos directo en el disco del servidor, no en memoria
    destination: (req, file, cb) => { // esta funcion decide en que carpeta se va a guardar el archivo
        cb(null, uploadDir); // cb (callback) recibe primero el error (null si no hay ninguno) y despues la carpeta destino
    },
    filename: (req, file, cb) => { // esta funcion decide con que nombre se va a guardar el archivo
        const nombreUnico = Date.now() + path.extname(file.originalname); // path.extname conserva la extension original del archivo (.jpg, .png, etc)
        cb(null, nombreUnico); // cb recibe primero el error (null) y despues el nombre final que va a tener el archivo
    } 
});

const uploadMiddleware = multer({ storage: configuracionAlmacenamiento });
// creamos el middleware de multer, indicandole que use la configuracion de almacenamiento de arriba

export default uploadMiddleware;