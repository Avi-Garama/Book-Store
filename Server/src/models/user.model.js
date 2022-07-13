import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';
import isStrongPassword from 'validator/lib/isStrongPassword.js';
import environments from '../../config/environments.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,

    },

    lastName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },


    email: {
        type: String,
        required: [true, 'email must be unique'],
        trim: true,
        unique: true,
        validate(value) {
            if (!isEmail(value)) {
                throw new Error('email is not valid');
            }
        }
    },

    password: {
        type: String,
        trim: true,
        required: true,
        minlength: [8, 'password must be at least 8 characters'],
        select: false,
        validate(value) {
            if (!isStrongPassword(value, {
                    minLength: 8
                })) {
                throw new Error('password must be strong');
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }],
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

userSchema.pre('save', async function(next) {

    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 12)
    }
    next();
})


userSchema.methods.generateUserToken = async function() {

    const user = this;
    const token = jwt.sign({ id: user._id }, environments.TOKEN_SECRET);

    user.tokens.push({ token });
    await user.save();

    return token;
};


userSchema.statics.findUserByEmailAndComparePassword = async(email, password) => {

    const user = await User.findOne({ email }).select('+password');
    const isMatchPassword = await bcrypt.compare(password, user.password);

    if (!user || !isMatchPassword) throw new Error('Please enter email or password!')

    return user;
}

userSchema.virtual('cart', {
    ref: 'Cart',
    localField: '_id',
    foreignField: 'userID',
});

const User = mongoose.model('User', userSchema);

export default User;