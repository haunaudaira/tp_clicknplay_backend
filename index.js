import express from "express";
import session from "express-session";
import environments from "./src/api/config/environment.js";
import cors from "cors";
import adminRoutes from "./src/routes/adminRoutes.js"
import path from "path";
import { fileURLToPath } from "url";

// configuracion especial para __dirname en ES Modules, nos va a permitir renderizar las vistas 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// configuracion
const app = express();
const PORT = environments.port || 3000;

app.set("view engine", "ejs"); //CONFIGURACION DE EJS - similar a las lineas 10 y 11
app.set("views", path.join(__dirname, "src/views")); // le indicamos a donde ir a buscar las vista

// MIDDLEWARES globales
app.use(cors()); // permite interacciones cruzadas
app.use(express.urlencoded({ extended: true })); // permite lectura de datos de forms
app.use(express.json()); // interaccion de api con json
// app.use(express.static(path.join(__dirname, "public"))); // sirve archivos como /uploads/imagen.png
// app.use('/uploads', express.static('public/uploads')); // habilitamos la carpeta del servidor para que sea de acceso al navegador, en este caso, las imagenes.

// RUTAS
app.use("/admin/", adminRoutes);

app.listen(PORT, () => {
    console.log('servidor corriendo en el puerto: ', PORT);
})
