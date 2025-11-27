let express = require("express");
let router = express.Router();
let Controllers = require("../controllers");

router.get("/:username", (req, res) => {
  Controllers.playerController.getPlayer(req, res);
});

module.exports = router;

if (require.main === module) {
}
