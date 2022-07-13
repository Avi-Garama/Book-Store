import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
    },
    bookCover: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    page: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

const Book = mongoose.model('Book', bookSchema);

export default Book;