const express = require('express');

const {insertBook,insertManyBooks,updateFutureBook,findBookByTitle,findBooksByYearRange,findBooksByGenre,getBookSkipLimit,findBooksWithIntegerYear,findBooksExcludingGenres,aggregateBooksAfter2000,aggregateBooksProjection, aggregateBooksUnwindGenres,aggregateBooksWithLogs} = require('../controllers/collection.controller');

const router = express.Router();

router.post('/', insertBook);
router.post('/batch', insertManyBooks);
router.patch('/future', updateFutureBook);
router.get('/title', findBookByTitle);
router.get('/year', findBooksByYearRange);
router.get('/genre', findBooksByGenre);
router.get('/skip-limit', getBookSkipLimit);
router.get('/year-integer', findBooksWithIntegerYear);
router.get('/exclude-genres', findBooksExcludingGenres);
router.get('/aggregate1', aggregateBooksAfter2000);
router.get('/aggregate2', aggregateBooksProjection);
router.get('/aggregate3', aggregateBooksUnwindGenres);
router.get('/aggregate4', aggregateBooksWithLogs);  
module.exports = router;