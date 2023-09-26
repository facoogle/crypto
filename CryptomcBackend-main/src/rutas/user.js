const { Router } = require("express");
require("../controladores/UserController");
const router = Router();

router.post("/", createUser);

router.post("/banned", banearUsuario);

module.exports = router;