const { Router } = require("express");
const {
  createUser,
  getNftUser,
  createNftTemporal,
  login,
} = require("../controladores/UserController");
const router = Router();

router.post("/createUser", createUser);

router.post("/login", login);

router.post("/banned", banearUsuario);

router.get("/:wallet/nfttemporales", getNftUser);

router.post("/createNftTemporal", createNftTemporal);

module.exports = router;
