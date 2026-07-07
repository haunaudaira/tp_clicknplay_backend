import bcrypt from "bcrypt";
import UsuarioModel from "../models/UsuarioModel.js";


export const incioSesion = async (req, res) => {
    try {
        if (req.method === "GET") {
            return res.render("login", { error: null });
        }

        const { email, password } = req.body;
        const usuarios = await UsuarioModel.buscarCorreo(email);
        const usuario = usuarios && usuarios.length > 0 ? usuarios[0] : null;

        // si no existe ningun usuario con ese email, no se puede iniciar sesion
        if (!usuario) {
            console.log(usuario);
            return res.render("login", { error: "Correo o contraseña incorrectos" });
        }

        // el hash en el campo
        const hash = usuario.password;

        // si no hay hash, no podemos comparar la contraseña
        if (!hash) {
            return res.render("login", { error: "No se pudo validar la contraseña" });
        }

        // comparar la contraseña ingresada con el hash guardado en la base de datos
        const contrasenaValida = await bcrypt.compare(password, hash);

        // si la comparacion falla, devolvemos el mismo mensaje generico
        if (!contrasenaValida) {
            return res.render("login", { error: "Correo o contraseña incorrectos" });
        }

        // si la contraseña es valida, se carga la sesion del usuario
        req.session.usuario = { id: usuario.id, email: usuario.email };
        return res.redirect("/admin/dashboard");

    } catch (error) {
        console.error(error);
        return res.status(500).render("login", { error: "Error durante el login" });
    }

};

export const cerrarSesion = async (req, res) => {
        try {
            req.session.destroy((err) => {
                if (err){
                    console.log("Sesion finalizada.");                  
                }
                res.redirect('/admin/login');
            })
        } catch (error) {
            console.log(error);        
        }
};