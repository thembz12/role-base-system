

const { signUp, studentScore, makeAdmin, loginUser } = require("../controller/userController")
const { authenticator } = require("../middleware/auth")
const { CreateValidator } = require("../middleware/validator")
const router = require("express").Router()

router.post("/signup" ,CreateValidator, signUp)
router.post("/loginuser", loginUser)
router.put("/update-score/:id", authenticator, studentScore)
router.put("/make-admin/:id", makeAdmin)
module.exports = router
 