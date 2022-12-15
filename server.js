const express = require('express')
const cors = require("cors")
const administrador = require("./routes/administrador")
const clientes = require("./routes/clientes")
const libros = require("./routes/libros")

class Server{
    constructor(){
        this.app = express()
        this.paths = {
            administrador:"/api/v1/administrador",
            clientes:"/api/v1/clientes",
            libros:"/api/v1/libros",
            
        }
        this.middlewares()
        this.routes()
    }

    routes(){
        this.app.use(this.paths.administrador, administrador)
        this.app.use(this.paths.clientes, clientes)
        this.app.use(this.paths.libros, libros)
    }

    middlewares(){
        this.app.use(cors())
        this.app.use(express.json()) 
    }

    listen(){
        this.app.listen(process.env.PORT,()=>{
            console.log("Proyecto en ejecución en el puerto",process.env.PORT)
        })
    }
}

module.exports = Server 