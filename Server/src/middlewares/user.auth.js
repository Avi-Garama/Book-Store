import jwt from 'jsonwebtoken';
import environments from '../../config/environments.js';
import User from '../models/user.model.js'

const userAuth = async(req, res, next) => {

    try {
        const authorization = req.header('Authorization');
        if (!authorization) return res.status(401).send('Access Denied!');

        const token = authorization.replace('Bearer ', '');
        if (!token) return res.status(401).send('Access Denied!');

        const verifyData = jwt.verify(token, environments.TOKEN_SECRET);

        const user = await User.findOne({ _id: verifyData.id, 'tokens.token': token })

        if (!user) return res.status(401).send('Access Denied!');

        req.user = user
        req.token = token;

        next()
    } catch (error) {
        console.log(error)
        res.status(401).send({
            status: 401,
            statusMessage: 'Unauthorized'
        })
    }
}

export default userAuth;