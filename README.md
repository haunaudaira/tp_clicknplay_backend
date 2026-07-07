# ClickAndPlay - Backend

## descripcion
Este proyecto contiene el backend de ClickAndPlay. Su funcion es exponer la API para el frontend, gestionar productos, ventas, usuarios y la autenticacion del panel de administracion.

## estructura de carpetas
- src/controllers/: controladores que procesan las peticiones HTTP.
- src/routes/: definicion de rutas y endpoints.
- src/models/: consultas y operaciones sobre la base de datos.
- src/middlewares/: validaciones, autenticacion y manejo de archivos.
- src/views/: plantillas EJS para las vistas del panel admin.
- public/: archivos estaticos accesibles desde el navegador.
- public/uploads/: imagenes subidas para los productos.
- api/config/: configuracion de entorno.
- api/database/: conexion con la base de datos.

## funcionalidades principales
- manejo de productos
- alta, modificacion y consulta de productos
- cambio de estado de productos
- registro y procesamiento de ventas
- autenticacion para rutas de administracion
- subida de imagenes con multer

## tecnologias usadas
- Node.js
- Express
- EJS
- Multer
- MySQL o base de datos configurada por entorno

## requisitos previos
- Node.js instalado
- dependencia de la base de datos configurada
- archivo .env con las variables necesarias

## variables de entorno
El proyecto espera variables como:
- PORT
- SESSION_SECRET
- DB_HOST
- DB_USER
- DB_PASSWORD
- DB_NAME

## como ejecutar
1. instalar dependencias con npm install
2. crear un archivo .env con las variables de entorno necesarias
3. ejecutar el servidor con npm start
4. acceder al backend desde http://localhost:3000

## puntos importantes
- las rutas del frontend consumen esta API
- las imagenes de productos se guardan en public/uploads
- las vistas de administracion se renderizan con EJS
