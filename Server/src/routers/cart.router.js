import express from 'express';
import * as cartController from '../controllers/cart.controller.js';
import userAuth from '../middlewares/user.auth.js';

const router = new express.Router();

router.get('/cart', userAuth, cartController.viewCart);

router.delete('/cart', userAuth, cartController.removeBookFromCart);

router.post('/cart/checkout', userAuth, cartController.checkout);

router.post('/cart/add-to-cart', userAuth, cartController.addToCart);

export default router;