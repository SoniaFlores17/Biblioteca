const {Router} = require("express")
const { LisClientes, buscarLisClientesID, incorporaClientes, IniciosesionClientes, actualizaClientes, restablecerContrasenaCli, desconectarClientes } = require("../controllers/clientes")
const router = Router()

// http://localhost:4008/api/v1/clientes

//GET
router.get("/",LisClientes) 
//http://localhost:4008/api/v1/clientes/id/11
router.get("/id/:id",buscarLisClientesID) 

//POST
router.post("/", incorporaClientes)
router.post("/iniciar", IniciosesionClientes)

//PUT
router.put("/", actualizaClientes)
router.put("/actContra", restablecerContrasenaCli)



//DELETE
// http://localhost:4000/api/v1/administrador/?id=1

router.delete("/", desconectarClientes) 

module.exports = router