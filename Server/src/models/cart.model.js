import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userID: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'User',

    },
    books: [{
        bookID: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
            ref: 'Book',
        }
    }],
}, );

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;