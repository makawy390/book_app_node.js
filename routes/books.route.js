const express = require("express");

const router = express.Router();

const {addBook , getAllBooks , get_single_book , update_book , delete_book} = require('../controller/books.controller');

router.route('/new_book')
.post(addBook);

router.route('/get_all_books')
.get(getAllBooks);

router.route('/:id')
.get(get_single_book)

.patch(update_book)

.delete(delete_book)

module.exports = router;