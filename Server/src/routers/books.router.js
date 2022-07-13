import express from 'express';
import * as bookController from '../controllers/book.controller.js';


const router = new express.Router();

router.post('/add-books', bookController.CreateNewBook);

router.get('/books', bookController.getAllBooks);

router.get('/book/:bookID', bookController.getBookById);


export default router;