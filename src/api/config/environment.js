// lee la configuracion desde .env y sirve para que el backend no tenga datos sensibles hadcodeados y pueda configurarse segun el entorno donde se ejecuta.
import dotenv from "dotenv"; // libreria que permite leer un archivo

dotenv.config(); // ejecuta la carga de variables para que puedan ser ejecutadas: process.env

// export default, exporta un objeto

export default {
    port: process.env.PORT || 3000, // si no existe el PORT, utiliza el 3000
    database: { // lee los datos especificados en .env.
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        secret: process.env.SESSION_SECRET // esto se llama en nuestro archivo index
    }

}