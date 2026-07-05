export const reqAutorizacion = async (req, res, next) => {
    // si el usuario existe en la sesion, pasa a la vista
    if (req.session && req.session.usuario ){
        return next();
    } else{ // si ino existe, nos redirige a la ventana del login para poder ingresar a cualquier vista
        return res.render('login', { error: 'Inicie sesión para continuar.' });
    }

}