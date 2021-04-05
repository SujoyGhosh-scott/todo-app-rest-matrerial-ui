const express = require("express");
const router = express.Router();

const {
  getDaily,
  getRandom,
  getFuture,
  getNotes,
  getProjects,
} = require("../controllers/getTodo");

router.route("/").post(getDaily);
router.route("/getrandom").post(getRandom);
router.route("/getfuture").post(getFuture);
router.route("/getnotes").post(getNotes);
router.route("/getprojects").post(getProjects);

module.exports = router;
