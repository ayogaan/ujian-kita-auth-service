const express = require('express');
const roleController = require('../controllers/roleController')

const router = express.Router();
router.post('', roleController.creatteRole);
router.delete('/:id', roleController.deleteRole);

module.exports = router;
