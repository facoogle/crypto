const { Router } = require("express");
const {
  createUser,
  getNftUser,
  createNftTemporal,
  add,
  deliveryStar,
  login,
} = require("../controladores/UserController");
const router = Router();

router.post("/createUser", createUser);

router.post("/login", login);

router.post("/banned", banearUsuario);

router.get("/:wallet/nfttemporales", getNftUser);

router.post("/createNftTemporal", createNftTemporal);

router.post("/add", add);

router.post("/deliveryStar", deliveryStar);

module.exports = router;
