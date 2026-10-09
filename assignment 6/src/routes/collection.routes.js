const express = require('express');

const {createBooksCollection,createAuthor,createLogsCollection,createBooksTitleIndex} = require('../controllers/collection.controller');

const router = express.Router();

router.post('/books', createBooksCollection);
router.post('/logs/capped', createLogsCollection);
router.post('/authors', createAuthor);
router.post("/books/index", createBooksTitleIndex);

module.exports = router;

