import Book from "../models/book.model.js";


export const getAllBooks = async(req, res) => {

    const books = await Book.find();

    try {
        res.send({
            status: 200,
            statusText: 'Ok',
            data: { books },
        })
    } catch (error) {
        res.status(500).send({
            status: 500,
            statusText: 'Server Error',
        })
    }
}


export const CreateNewBook = async(req, res) => {

    const bookData = req.body;
    const book = new Book(bookData);

    try {
        await book.save();

        res.status(201).send({
            status: 201,
            statusText: 'Created',
            data: { book },
            message: 'Book was created!'
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            status: 400,
            statusTest: 'Bad Request',
        })
    }
}


export const getBookById = async(req, res) => {

    const bookID = req.params.bookID;

    try {
        const book = await Book.findById(bookID)
        res.send({
            status: 200,
            statusText: 'ok',
            data: book,
        })
    } catch (error) {
        res.status(500).send({
            status: 500,
            statusText: 'Server Error',
        })
    }
}