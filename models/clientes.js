const biblioclientes = {

    obsListaClientes:  `SELECT * FROM clientes`,   
    busClientesID:  `SELECT * FROM clientes WHERE ID_Clientes = ?`,       
    agregaClientes:   `SELECT Usuario FROM clientes  WHERE  Usuario = ?`,  
    AddClientes:                              
    `INSERT INTO clientes (
        Usuario,
        Nombre_Cliente,
        Apellidos,
        Dirección,
	    Telefono,
        Correo_Electronico,
        Edad,
        Contrasena,
        Activo
    ) VALUES (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
    	?
    )`,
    datosClientes: `SELECT Usuario, Nombre_Cliente, Apellidos, Dirección, Telefono FROM clientes WHERE Usuario = ?`,

    actualizaClientes:                                  
    `UPDATE clientes SET
        Nombre_Cliente = ?,
        Edad = ?,
        Dirección = ?,
        Correo_Electronico = ?,
	    Telefono = ?,
        Activo= ?
    WHERE Usuario = ?`,

    desconectarClientes:                                  
    `UPDATE clientes SET Activo='N' WHERE ID_Clientes = ?`,

    IniciosesionCli:                                   
    `SELECT Usuario, Contrasena, Activo FROM clientes WHERE Usuario = ?`,
    newcontraCli:                                
    `UPDATE clientes SET
        Contrasena = ?
    WHERE Usuario = ?` 
}
module.exports = {biblioclientes}