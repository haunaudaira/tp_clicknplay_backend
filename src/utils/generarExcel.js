import exceljs from 'exceljs';

export const armarExcelVentas = async (datosVentas, res) => {
    // 1. creamos un nuevo libro y una hoja de cÃ¡lculo
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('Listado de Ventas');

    // 2. definimos las columnas del Excel (El 'key' debe coincidir con el nombre de tu columna en la base de datos)
    worksheet.columns = [
        { header: 'ID Venta', key: 'id_venta', width: 15 },
        { header: 'Fecha', key: 'fecha', width: 20 },
        { header: 'Cliente', key: 'cliente', width: 25 },
        { header: 'Producto', key: 'producto', width: 30 },
        { header: 'Cantidad', key: 'cantidad', width: 15 },
        { header: 'Precio Final', key: 'precio_total', width: 20 }
    ];

    // 3. le pasamos los datos que trajimos de MySQL para que llene las filas
    worksheet.addRows(datosVentas);

    // 4. configuramos los Headers de la respuesta para forzar la descarga en el navegador
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="Listado_Ventas_MediaVault.xlsx"');

    // 5. escribimos el archivo directamente en la respuesta HTTP
    await workbook.xlsx.write(res);
    res.end();
};