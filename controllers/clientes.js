const { request, response } = require("express");
const bcryptjs = require("bcryptjs")
const pool = require("../db/connection");
const {biblioclientes} = require("../models/clientes");


const  LisClientes= async (req =request, res = response) => {
    let conn;

    try{
        conn = await pool.getConnection()
        const clientes = await conn.query(biblioclientes.obsListaClientes, (error)=>{throw new error})
        
        if(!clientes){
            res.status(404).json({msg:"No se encuentra registrado este cliente"})
            return
        }
        res.json({clientes})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}


const buscarLisClientesID = async (req =request, res = response) => {
    const {id} = req.params
    let conn;

    try{
        conn = await pool.getConnection()
        const [clientes] = await conn.query(biblioclientes.busClientesID, [id], (error)=>{throw new error})
        
        if(!clientes){
            res.status(404).json({msg:`No se encontraron registros con el ID ${id}`})
            return
        }
        res.json({clientes})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}


const incorporaClientes = async (req =request, res = response) => {
    const {
        Usuario,
        Nombre_Cliente,
        Apellidos,
        Dirección,
	    Telefono,
        Correo_Electronico, 
        Edad,
        Contrasena,
        Activo
    } = req.body

    if(
        !Usuario||
        !Nombre_Cliente||
        !Apellidos||
        !Dirección ||
	    !Telefono ||
        !Correo_Electronico ||
        !Edad||
        !Contrasena||
        !Activo
    ){
        res.status(400).json({msg:"Falta información del usuario."})
        return
    }

    let conn;

    try{
        conn = await pool.getConnection()

        const [clientes] = await conn.query(biblioclientes.agregaClientes, [Usuario])
        if(clientes){
            res.status(403).json({msg:`El usuario '${Usuario}' ya se encuentra registrado.`})
            return
        }

        const salt = bcryptjs.genSaltSync()
        const contrasenaCifrada = bcryptjs.hashSync(Contrasena, salt)

        const {affectedRows} = await conn.query(biblioclientes.AddClientes, [
            Usuario,
            Nombre_Cliente,
            Apellidos,
            Dirección,
            Telefono,
            Correo_Electronico,
            Edad,
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


const actualizaClientes= async (req =request, res = response) => {
    const {
        Usuario,
        Nombre_Cliente,
        Edad,
        Dirección,
        Correo_Electronico,
	    Telefono,
        Activo
    } = req.body

    if(
        !Usuario||
        !Nombre_Cliente||
        !Edad||
        !Dirección||
        !Correo_Electronico||
	    !Telefono
    ){
        res.status(400).json({msg:"Falta información del usuario."})
        return
    }

    let conn;

    try{
        conn = await pool.getConnection()

        const [clientes] = await conn.query(biblioclientes.datosClientes, [Usuario])

        if(!clientes){
            res.status(403).json({msg:`El usuario '${Usuario}' no se encuentra registrado.`})
            return
        }


        const {affectedRows} = await conn.query(biblioclientes.actualizaClientes, [
            Nombre_Cliente || clientes.Nombre_Cliente,
            Edad || clientes.Edad,
            Dirección|| clientes.Dirección,
            Correo_Electronico|| clientes.Correo_Electronico,
            Telefono|| clientes.Telefono,
            Activo||clientes.Activo,
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


const desconectarClientes = async (req =request, res = response) => {
    const {id} = req.query
    let conn;

    try{
        conn = await pool.getConnection()
        const {affectedRows} = await conn.query(biblioclientes.desconectarClientes, [id], (error)=>{throw new error})
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


const IniciosesionClientes= async (req =request, res = response) => {
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

        const [clientes] = await conn.query(biblioclientes.IniciosesionCli, [Usuario])

        if(!clientes || clientes.Activo === 'N'){
            let code = !clientes ? 1:2;
            res.status(403).json({msg:`El usuario o la contraseña son incorrectos.`, errorCode:code})
            return
        }

        const accesoValido = bcryptjs.compareSync(Contrasena, clientes.Contrasena)

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


const restablecerContrasenaCli = async (req =request, res = response) => {
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

        const [clientes] = await conn.query(biblioclientes.IniciosesionCli, [Usuario])

        if(!clientes){
            res.status(403).json({msg:`El usuario '${Usuario}' no se encuentra registrado.`})
            return
        }
        if(!clientes || clientes.Activo === 'N'){
            let code = !clientes ? 1:2;
            res.status(403).json({msg:`El usuario o la contraseña son incorrectos.`, errorCode:code})
            return
        }

        const accesoValido = bcryptjs.compareSync(Contrasena, clientes.Contrasena)

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

        const {affectedRows} = await conn.query(biblioclientes.newcontraCli, [
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

module.exports = {LisClientes, buscarLisClientesID, incorporaClientes, actualizaClientes, desconectarClientes, IniciosesionClientes, restablecerContrasenaCli}