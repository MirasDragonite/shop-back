const express = require("express");
const router = express.Router();
let path = require('path');
const createUser = require('../controllers/authController')
router
    .route("/")
    .get((req, res) => res.render(path.resolve("views/register.ejs")))
    .post(createUser.create)
module.exports = router;
