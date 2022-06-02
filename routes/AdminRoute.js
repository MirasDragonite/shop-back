const express = require('express')

const AdminController=require('../controllers/AdminController')
const router = express.Router();
router.get('/admin', AdminController.findAll);
router.get('/:email', AdminController.findOne);
router.post('/admin', AdminController.create);
router.patch('/:email', AdminController.update);
router.delete('/:email', AdminController.destroy);

module.exports = router