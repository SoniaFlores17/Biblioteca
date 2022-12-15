const { request, response } = require("express");
const bcryptjs = require("bcryptjs")
const pool = require("../db/connection");
const {supervisaAdministrador} = require("../models/administrador");


const  prinAdministrador= async (req =request, res = response) => {
    let conn;

    try{
        conn = await pool.getConnection()
        const administrador = await conn.query(supervisaAdministrador.verprinAdministrador, (error)=>{throw new error})
        
        if(!administrador){
            res.status(404).json({msg:"No se encuentra registrado este administrador"})
            return
        }
        res.json({administrador})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}


const buscarprinAdministradorID = async (req =request, res = response) => {
    const {id} = req.params
    let conn;

    try{
        conn = await pool.getConnection()
        const [administrador] = await conn.query(supervisaAdministrador.busAdministradorID, [id], (error)=>{throw new error})
        
        if(!administrador){
            res.status(404).json({msg:`No se encontraron registros con el ID ${id}`})
            return
        }
        res.json({administrador})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}


const incorporaAdministrador = async (req =request, res = response) => {
    const {
        Usuario,
        Nombre,
        Apellidos,
        Direccion,
	    Telefono,
        Contrasena,
        Activo
    } = req.body

    if(
        !Usuario||
        !Nombre||
        !Apellidos||
        !Direccion ||
	    !Telefono ||
        !Contrasena||
        !Activo
    ){
        res.status(400).json({msg:"Falta información del usuario."})
        return
    }

    let conn;

    try{
        conn = await pool.getConnection()

        const [administrador] = await conn.query(supervisaAdministrador.agregaAdmin, [Usuario])
        if(administrador){
            res.status(403).json({msg:`El usuario '${Usuario}' ya se encuentra registrado.`})
            return
        }

        const salt = bcryptjs.genSaltSync()
        const contrasenaCifrada = bcryptjs.hashSync(Contrasena, salt)

        const {affectedRows} = await conn.query(supervisaAdministrador.AddAdministrador, [
            Usuario,
            Nombre,
            Apellidos,
            Direccion,
            Telefono,
            contrasenaCifrada,
            Activo
        ], (error)=>{throw new error})

        if(affectedRows===0){
            res.status(404).json({msg:`No se pudo agregar el registro del usuario ${Usuario}`})
            return
        }
        res.json({msg:`El usuario ${Usuario} se agregó satisfactoriamente.`})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}


const actualizaprinAdministrador= async (req =request, res = response) => {
    const {
        Usuario,
        Nombre,
        Apellidos,
        Direccion,
	    Telefono,
        Activo
    } = req.body

    if(
        !Usuario
    ){
        res.status(400).json({msg:"Falta información del usuario."})
        return
    }

    let conn;

    try{
        conn = await pool.getConnection()

        const [administrador] = await conn.query(supervisaAdministrador.datosAdmin, [Usuario])

        if(!administrador){
            res.status(403).json({msg:`El usuario '${Usuario}' no se encuentra registrado.`})
            return
        }


        const {affectedRows} = await conn.query(supervisaAdministrador.actualizaprinAdministrador, [
            Nombre || administrador.Nombre,
            Apellidos || administrador.Apellidos,
            Direccion|| administrador.Direccion,
            Telefono|| administrador.Telefono,
            Activo||administrador.Activo,
            Usuario
        ], (error)=>{throw new error})

        if(affectedRows===0){
            res.status(404).json({msg:`No se pudo actualizar el registro del usuario ${Usuario}`})
            return
        }
        res.json({msg:`El usuario ${Usuario} se actualizó satisfactoriamente.`})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}


const desconectarAdministrador = async (req =request, res = response) => {
    const {id} = req.query
    let conn;

    try{
        conn = await pool.getConnection()
        const {affectedRows} = await conn.query(supervisaAdministrador.desconectarAdministrador, [id], (error)=>{throw new error})
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


const IniciosesionAdministrador= async (req =request, res = response) => {
    const {
        Usuario,
        Contrasena
    } = req.body

    if(
        !Usuario||
        !Contrasena
    ){
        res.status(400).json({msg:"Falta información del usuario."})
        return
    }

    let conn;

    try{
        conn = await pool.getConnection()

        const [administrador] = await conn.query(supervisaAdministrador.IniciosesionAdmin, [Usuario])

        if(!administrador || administrador.Activo === 'N'){
            let code = !administrador ? 1:2;
            res.status(403).json({msg:`El usuario o la contraseña son incorrectos.`, errorCode:code})
            return
        }

        const accesoValido = bcryptjs.compareSync(Contrasena, administrador.Contrasena)

        if(!accesoValido){
            res.status(403).json({msg:`El usuario o la contraseña son incorrectos.`, errorCode:3})
            return
        }

        res.json({msg:`El usuario ${Usuario} ha iniciado sesión satisfactoriamente.`})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}


const restablecerContrasena = async (req =request, res = response) => {
    const {
        Usuario,
        Contrasena,
        ContrasenaNueva
    } = req.body

    if(
        !Usuario,
        !Contrasena,
        !ContrasenaNueva
    ){
        res.status(400).json({msg:"Falta información del usuario."})
        return
    }

    let conn;

    try{
        conn = await pool.getConnection()

        const [administrador] = await conn.query(supervisaAdministrador.IniciosesionAdmin, [Usuario])

        if(!administrador){
            res.status(403).json({msg:`El usuario '${Usuario}' no se encuentra registrado.`})
            return
        }
        if(!administrador || administrador.Activo === 'N'){
            let code = !administrador ? 1:2;
            res.status(403).json({msg:`El usuario o la contraseña son incorrectos.`, errorCode:code})
            return
        }

        const accesoValido = bcryptjs.compareSync(Contrasena, administrador.Contrasena)

        if(!accesoValido){
            res.status(403).json({msg:`El usuario o la contraseña son incorrectos.`, errorCode:3})
            return
        }

        if(Contrasena===ContrasenaNueva){
            res.status(403).json({msg:`No puede utilizar la contraseña anterior, ingrese una nueva.`})
            return
        }

        const salt = bcryptjs.genSaltSync()
        const contrasenaCifrada = bcryptjs.hashSync(ContrasenaNueva, salt)

        const {affectedRows} = await conn.query(prinAdministrador.newcontra, [
            contrasenaCifrada,
            Usuario
        ], (error)=>{throw new error})

        if(affectedRows===0){
            res.status(404).json({msg:`No se pudo actualizar la contraseña`})
            return
        }
        res.json({msg:`La contraseña se actualizó satisfactoriamente.`})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

module.exports = {prinAdministrador, buscarprinAdministradorID, incorporaAdministrador, actualizaprinAdministrador, desconectarAdministrador, IniciosesionAdministrador, restablecerContrasena}