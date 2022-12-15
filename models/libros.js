const biblioLibros = {

    obtListaLibros:  `SELECT * FROM libros`,   
    busLibrosID:  `SELECT * FROM libros WHERE ID_Libro = ?`,       
    agregaLib:   `SELECT Nombre_Libro FROM libros  WHERE  Nombre_Libro = ?`,  
    AddLibros:                              
    `INSERT INTO libros (
        Nombre_Libro,
            Editorial,
            Autor,
            Genero,
            Numero_paginas,
            Fecha_Edicion,
            Precio,
            Activo
    ) VALUES (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
    )`,
    datosLibros: `SELECT  Nombre_Libro, Precio, Activo FROM libros WHERE Nombre_Libro = ?`,
    actualizaLibros:                                  
    `UPDATE libros SET
        Precio = ?,
        Activo = ?
    WHERE Nombre_Libro= ?`,

    desLibros:                                  
    `UPDATE libros SET Activo='N' WHERE ID_Libro= ?`

   
}
module.exports = {biblioLibros}