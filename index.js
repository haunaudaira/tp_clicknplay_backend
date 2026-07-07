import express from "express";
import dotenv from "dotenv"
import session from "express-session";
import environments from "./src/api/config/environment.js";
import cors from "cors";
import adminRoutes from "./src/routes/adminRoutes.js"
import productosRoutes from "./src/routes/productosRoutes.js"
import ventasRoutes from "./src/routes/ventasRoutes.js"
import path from "path";
import { fileURLToPath } from "url";

// configuracion especial para poder usar dirname ya que no existe po defecto en ESM (esmodules) y evitar que tire "ReferenceError: __dirname is not defined"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// configuracion
const app = express();
const PORT = environments.port || 3000;

app.set("view engine", "ejs"); //CONFIGURACION DE EJS - similar a las lineas 10 y 11
app.set("views", path.join(__dirname, "src/views")); // le indicamos a donde ir a buscar las vista
app.use(express.static(path.join(__dirname, "public"))); // 

app.use(session({ secret: environments.database.secret, // clave del .env
    resave: false, // evita guardar la sesion si no hay cambios
    saveUninitialized: false,  //no guarda sesiones vacias
    cookie: {
        maxAge: 1000 * 60 * 60 // configuramos que la sesion se cierre luego de 1 hora 
    }
}));

// MIDDLEWARES globales
app.use(cors()); // permite interacciones cruzadas
app.use(express.urlencoded({ extended: true })); // permite lectura de datos de forms
app.use(express.json()); // interaccion de api con json

// RUTAS
app.use("/admin/", adminRoutes);
app.use("/", productosRoutes);
app.use("/api/ventas", ventasRoutes);

app.listen(PORT, () => {
    console.log('servidor corriendo en el puerto: ', PORT);
})
