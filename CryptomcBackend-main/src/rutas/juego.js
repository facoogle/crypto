const { Router } = require("express");
const { iniciarViaje } = require("../controladores/clickToEarn");
const router = Router();

router.post("/", iniciarViaje);

router.put("/", comprarNft);

router.put("/", comprarInstrumento);

module.exports = router;