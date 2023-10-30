const express = require('express');

const router = express.Router();

const {getAllUsers , register , login , updateUser , deleteUser} = require('../controller/user.controller');

router.route('/get_all_users')
.get(getAllUsers);

router.route('/register')
.post(register);

router.route('/login')
.post(login);

router.route('/:id')
.patch(updateUser);

router.route('/:id')
.delete(deleteUser);

module.exports = router;