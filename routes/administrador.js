const {Router} = require("express")
const {prinAdministrador,  buscarprinAdministradorID, incorporaAdministrador, actualizaprinAdministrador, desconectarAdministrador, IniciosesionAdministrador, restablecerContrasena} = require("../controllers/administrador")
const router = Router()

// http://localhost:4008/api/v1/administrador

//GET
router.get("/",prinAdministrador)
router.get("/id/:id",buscarprinAdministradorID) //http://localhost:4008/api/v1/administrador/id/11

//POST
router.post("/", incorporaAdministrador)
router.post("/iniciar", IniciosesionAdministrador)

//PUT
router.put("/", actualizaprinAdministrador)
router.put("/actContra", restablecerContrasena)

//DELETE
router.delete("/", desconectarAdministrador) // http://localhost:4000/api/v1/administrador/?id=1

module.exports = router