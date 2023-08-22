const express = require('express')
const { createBook, getAllBooks, getOneBookById, updateBook, deleteBook } = require('../controllers/bookController')

const router = express.Router()

router.post('/books', createBook)
router.get('/books', getAllBooks)
router.get('/books/:id', getOneBookById)
router.patch('/books/:id', updateBook)
router.delete('/books/:id', deleteBook)

module.exports = router