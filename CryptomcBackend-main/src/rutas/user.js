const { Router } = require("express");
const {createUser,getNftUser,createNftTemporal} = require("../controladores/UserController");
const router = Router();

router.post("/createUser", createUser);

router.post("/banned", banearUsuario);

router.get("/:userId/nfttemporales",getNftUser)

router.post("/:userId/crearNFTTemporal",createNftTemporal)

module.exports = router;