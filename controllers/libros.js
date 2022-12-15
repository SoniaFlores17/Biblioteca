const { request, response } = require("express");
const bcryptjs = require("bcryptjs")
const pool = require("../db/connection");
const {biblioLibros} = require("../models/libros");


const  LisLibros= async (req =request, res = response) => {
    let conn;

    try{
        conn = await pool.getConnection()
        const libros = await conn.query(biblioLibros.obtListaLibros, (error)=>{throw new error})
        
        if(!libros){
            res.status(404).json({msg:"No se encuentra registrado este Libro"})
            return
        }
        res.json({libros})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}


const buscarLisLibrosID = async (req =request, res = response) => {
    const {id} = req.params
    let conn;

    try{
        conn = await pool.getConnection()
        const [libros] = await conn.query(biblioLibros.busLibrosID, [id], (error)=>{throw new error})
        
        if(!libros){
            res.status(404).json({msg:`No se encontraron registros con el ID ${id}`})
            return
        }
        res.json({libros})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}


const incorporaLibros = async (req =request, res = response) => {
    const {
        Nombre_Libro,
        Editorial,
        Autor,
	    Genero,
        Numero_paginas,
        Fecha_Edicion,
        Precio,
        Activo
    } = req.body

    if(
        !Nombre_Libro||
        !Editorial||
        !Autor ||
	    !Genero||
        !Numero_paginas||
        !Fecha_Edicion||
        !Precio||
        !Activo
    ){
        res.status(400).json({msg:"Falta información del libro."})
        return
    }

    let conn;

    try{
        conn = await pool.getConnection()

        const [libros] = await conn.query(biblioLibros.agregaLib, [Nombre_Libro])
        if(libros){
            res.status(403).json({msg:`El libro '${Nombre_Libro}' ya se encuentra registrado.`})
            return
        }

        const {affectedRows} = await conn.query(biblioLibros.AddLibros, [
            Nombre_Libro,
            Editorial,
            Autor,
            Genero,
            Numero_paginas,
            Fecha_Edicion,
            Precio,
            Activo
        ], (error)=>{throw new error})

        if(affectedRows===0){
            res.status(404).json({msg:`No se pudo agregar el registro del libro ${Nombre_Libro}`})
            return
        }
        res.json({msg:`El libro${Nombre_Libro} se agregó satisfactoriamente.`})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}


const actualizaLibros= async (req =request, res = response) => {
    const {
        Nombre_Libro,
	    Precio,
        Activo
    } = req.body

    if(
        !Nombre_Libro||
        !Precio
    ){
        res.status(400).json({msg:"Falta información del libro"})
        return
    }

    let conn;

    try{
        conn = await pool.getConnection()

        const [libros] = await conn.query(biblioLibros.datosLibros, [Nombre_Libro])

        if(!libros){
            res.status(403).json({msg:`El libro'${Nombre_Libro}' no se encuentra registrado.`})
            return
        }


        const {affectedRows} = await conn.query(biblioLibros.actualizaLibros, [
            Precio || libros.Precio,
            Activo||libros.Activo,
            Nombre_Libro || libros.Nombre_Libro
        ], (error)=>{throw new error})

        if(affectedRows===0){
            res.status(404).json({msg:`No se pudo actualizar el registro del libro ${Nombre_Libro}`})
            return
        }
        res.json({msg:`El libro ${Nombre_Libro} se actualizó satisfactoriamente.`})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}


const desconectarLibros = async (req =request, res = response) => {
    const {id} = req.query
    let conn;

    try{
        conn = await pool.getConnection()
        const {affectedRows} = await conn.query(biblioLibros.desLibros, [id], (error)=>{throw new error})
        if(affectedRows===0){
            res.status(404).json({msg:`No se pudo eliminar el registro con el ID ${id}`})
            return
        }
        res.json({msg:`El usuario con ID ${id} se eliminó satisfactoriamente.`})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}



module.exports = {LisLibros, buscarLisLibrosID, incorporaLibros, actualizaLibros, desconectarLibros}