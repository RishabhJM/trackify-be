const router = require("express").Router();
const { signup, login, logout } = require("../controllers/auth");

router
  .get("/test", (req, res) => {
    console.log("TESTING");
    res.send("TEST RESPONSE");
  })
  .post("/signup", signup)
  .post("/login", login)
  .get("/logout", logout);

module.exports = router;
