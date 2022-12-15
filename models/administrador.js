const supervisaAdministrador = {

    verprinAdministrador:  `SELECT * FROM administrador`,   
    busAdministradorID:  `SELECT * FROM administrador WHERE ID_Admin = ?`,       
    agregaAdmin:   `SELECT Usuario FROM administrador  WHERE  Usuario = ?`,  
    AddAdministrador:                              
    `INSERT INTO administrador (
        Usuario,
        Nombre,
        Apellidos,
        Direccion,
	    Telefono,
        Contrasena,
        Activo
    ) VALUES (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
    	?
    )`,
    datosAdmin: `SELECT Usuario, Nombre, Apellidos, Direccion, Telefono, Activo FROM administrador WHERE Usuario = ?`,
    actualizaprinAdministrador:                                  
    `UPDATE administrador SET
        Nombre = ?,
        Apellidos = ?,
        Direccion = ?,
	    Telefono = ?,
        Activo=?
    WHERE Usuario = ?`,

    desconectarAdministrador:                                  
    `UPDATE administrador SET Activo='N' WHERE ID_Admin = ?`,

    IniciosesionAdmin:                                   
    `SELECT Usuario, Contrasena, Activo FROM administrador WHERE Usuario = ?`,
    newcontra:                                
    `UPDATE administrador SET
        Contrasena = ?
    WHERE Usuario = ?` 
}
module.exports = {supervisaAdministrador}