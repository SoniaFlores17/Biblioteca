const {Router} = require("express")
const { LisLibros, buscarLisLibrosID, incorporaLibros, actualizaLibros, desconectarLibros } = require("../controllers/libros")

const router = Router()

// http://localhost:4005/api/v1/libros

//GET
router.get("/",LisLibros) 
//http://localhost:4008/api/v1/clientes/id/11
router.get("/id/:id",buscarLisLibrosID) 

//POST
router.post("/", incorporaLibros)


//PUT
router.put("/", actualizaLibros)



//DELETE
// http://localhost:4000/api/v1/administrador/?id=1

router.delete("/", desconectarLibros) 

module.exports = router