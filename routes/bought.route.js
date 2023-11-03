const express = require('express');

const router = express.Router();

const {getAllBought , delete_book} = require('../controller/bought.controller');

router.route('/get_all_bought')
.get(getAllBought);

router.route('/:id')
.delete(delete_book);
module.exports = router;