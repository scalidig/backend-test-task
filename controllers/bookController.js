const db = require('../models')

const Books = db.books

exports.createBook = async (req, res) => {
    try {
        const { title, isbn } = req.body

        if (!title || !isbn) {
            return res.status(400).send({ error: 'title and isbn fields are required!' })
        }

        const bookExists = await Books.findOne({
            where: {
                isbn
            }
        })

        if (bookExists) {
            return res.status(400).send({ error: 'Book already exists with isbn!' })
        }

        const book = await Books.create({
            title, isbn
        })

        return res.status(200).send({
            result: book
        })
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Books.findAll()

        return res.status(200).send({
            result: books
        })
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

exports.getOneBookById = async (req, res) => {
    try {
        const { id } = req.params

        const book = await Books.findByPk(id)

        return res.status(200).send({
            result: book
        })
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

exports.updateBook = async (req, res) => {
    try {
        const { id } = req.params
        const { title } = req.body

        if (!title) {
            return res.status(400).send({ error: 'title is required!' })
        }

        const book = await Books.findByPk(id)

        if (!book) {
            return res.status(404).json({ error: 'Book not found!' })
        }

        await book.update({
            title
        })

        return res.status(200).send({
            result: book
        })
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

exports.deleteBook = async (req, res) => {
    try {
        const { id } = req.params

        const book = await Books.findByPk(id)

        if (!book) {
            return res.status(404).json({ error: 'Book not found!' })
        }

        await book.destroy()

        return res.status(200).send({
            result: 'Deleted!'
        })
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}