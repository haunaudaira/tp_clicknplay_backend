// este archivo crea la conexion a la db usando pool. que es lo que el backend va a usar para consultar la bd

import mysql from "mysql2/promise";
import env from "../config/environment.js";

const pool = mysql.createPool({ // createPool es la conexion a la bd
  host: env.database.host,
  database: env.database.name,
  user: env.database.user,
  password: env.database.password,
});

export default pool;