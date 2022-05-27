const express = require('express')
const router = express.Router()
const path = require('path')

router
    .route('/')
    .get((req,res) => res.render(path.resolve('./pages/shop-three-columns.ejs')))

module.exports = router
