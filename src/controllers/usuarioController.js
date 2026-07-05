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

        if (!usuario) {
            console.log(usuario);
            
            return res.render("login", { error: "Correo o contraseña incorrectos" });
        }

        const hash = usuario.password ?? usuario.pswd ?? null;

        if (!hash) {
            return res.render("login", { error: "No se pudo validar la contraseña" });
        }

        const contrasenaValida = await bcrypt.compare(password, hash);

        if (!contrasenaValida) {
            return res.render("login", { error: "Correo o contraseña incorrectos" });
        }

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