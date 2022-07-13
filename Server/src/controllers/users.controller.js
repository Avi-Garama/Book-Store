import User from "../models/user.model.js";
import Cart from "../models/cart.model.js";

export const getUsers = async(req, res) => {

    const data = await User.find();

    try {

        res.send({
            status: 200,
            statusText: 'Ok',
            data: data,
        })
    } catch (error) {
        res.status(500).send({
            status: 500,
            statusText: 'Server Error',
        })
    }
}


export const CreateNewUser = async(req, res) => {

    const userData = req.body;
    const user = new User(userData);

    const userID = user._id
    const cart = new Cart({ userID });


    try {
        const token = await user.generateUserToken();

        await user.save();
        await cart.save();


        res.status(201).send({
            status: 201,
            statusText: 'Created',
            data: { user, token },
            message: 'User was created!'
        })
    } catch (error) {
        res.status(400).send({
            status: 400,
            statusTest: 'Bad Request',
        })
    }
}


export const login = async(req, res) => {

    const { email, password } = req.body;

    try {

        const user = await User.findUserByEmailAndComparePassword(email, password);
        const token = await user.generateUserToken();

        res.send({
            status: 200,
            statusText: 'ok',
            data: { token },
            message: 'User Login!'
        })
    } catch (error) {
        res.status(400).send({
            status: 400,
            statusText: 'Bad Request',
        })
    }
}


export const logout = async(req, res) => {

    const { user, token } = req

    try {
        user.tokens = user.tokens.filter((tokens) => tokens.token !== token);

        await user.save();

        res.send({
            status: 200,
            statusText: 'ok',
            data: {},
            message: 'User Logout!'
        })

    } catch (error) {
        res.status(500).send({
            status: 500,
            statusText: 'Server Error',
        })
    }
}