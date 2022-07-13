import Cart from "../models/cart.model.js";

export const viewCart = async(req, res) => {

    const userID = req.user._id;
    try {

        const cart = await Cart.findOne({ userID });
        if (!cart) throw new Error();

        await cart.populate('books.bookID');

        res.send({
            status: 200,
            statusText: 'Ok',
            data: { cart },
        })
    } catch (error) {
        res.status(500).send({
            status: 500,
            statusText: 'Server Error',
        })
    }
}


export const addToCart = async(req, res) => {
    const userID = req.user._id
    const bookID = req.body.bookID;

    if (!bookID) throw new Error()

    try {

        const cart = await Cart.findOne({ userID })
        if (!cart) throw new Error()

        const books = cart.books;
        books.find((book) => book.bookID.toString() === bookID)
        if (!books) throw new Error()

        cart.books.push({ bookID });
        await cart.save();

        res.status(201).send({
            status: 201,
            statusText: 'Created',
            data: { cart },
            message: 'SUCCESS - book was added to the cart'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: 500,
            statusText: 'Server Error',
        })
    }
}


export const removeBookFromCart = async(req, res) => {
    const userID = req.user._id
    const bookID = req.body.bookID;

    try {

        const cart = await Cart.findOne({ userID })
        if (!cart) throw new Error()

        const removeBookId = (books, bookID) => {
            const indexOfBookObject = books.findIndex((bookObject) => bookObject.bookID.toString() === bookID);

            books.splice(indexOfBookObject, 1);

            return books;
        }

        cart.books = removeBookId(cart.books, bookID);

        await cart.save();
        res.status(201).send({
            status: 201,
            statusText: 'Created',
            data: { cart },
            message: 'SUCCESS - book was removed from the cart'
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: 500,
            statusText: 'Server Error',
        })
    }
}


export const checkout = async(req, res) => {

    const userID = req.user._id

    try {

        const cart = await Cart.findOne({ userID })
        if (!cart) throw new Error()

        cart.books = [];

        await cart.save();

        res.status(201).send({
            status: 201,
            statusText: 'SUCCESS - you checked out.',
            data: {}
        })
    } catch (error) {
        res.status(500).send({
            status: 500,
            statusText: 'Server Error',
        })
    }
}