// posteriormente conectar a la BD para visualizar los productos

export const controladorDashboard = {
    mostrarDashboard: async (req, res) => {
        // prueba dashboard
        res.render('dashboard', { titulo: 'prueba panel de dashboard', productos: [] });
    }
};