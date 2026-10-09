const express = require('express');
const {insertLog} = require('../controllers/collection.controller');

const router = express.Router();
router.post('/', insertLog);
module.exports = router;