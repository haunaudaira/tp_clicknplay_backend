import express from "express";
import session from "express-session";
import environments from "./src/api/config/environment.js";
import cors from "cors";
import adminRoutes from "./src/routes/adminRoutes.js"
import productRoutes from "./src/routes/productRoutes.js"
import path from "path";
import { fileURLToPath } from "url";

// configuracion especial para __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// configuracion
const app = express();
const PORT = environments.port || 3000;

app.set("view engine", "ejs"); //CONFIGURACION DE EJS 
app.set("views", path.join(__dirname, "src/views")); //ajuste de la ruta de archivos

app.use(session({ secret: environments.database.secret, // clave del .env
    resave: false, // evita guardar la sesion si no hay cambios
    saveUninitialized: false,  //no guarda sesiones vacias
    cookie: {
        maxAge: 1000 * 60 * 5 // configuramos que la sesion se cierre luego de 5mins (300000 ms)
    }
}));

// MIDDLEWARES globales
app.use(cors()); // permite interacciones cruzadas
app.use(express.urlencoded({ extended: true })); // permite lectura de datos de forms
app.use(express.json()); // interaccion de api con json
app.use(express.static(path.join(__dirname, "public"))); // sirve archivos como /uploads/imagen.png
app.use('/uploads', express.static('public/uploads')); // habilitamos la carpeta del servidor para que sea de acceso al navegador, en este caso, las imagenes.

// RUTAS
app.use("/admin/", adminRoutes);
app.use('/', productRoutes); 

app.listen(PORT, () => {
    console.log('servidor corriendo en el puerto: ', PORT);
})
