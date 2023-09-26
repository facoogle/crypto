const { Router } = require("express");
require("../controladores/clickToEarn");
const router = Router();

router.post("/", iniciarViaje);

router.put("/", comprarNft);

router.put("/", comprarInstrumento);

module.exports = router;