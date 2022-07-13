import dotenv from 'dotenv';

dotenv.config();

const environments = {
    PORT: process.env.PORT,
    MONGOD_DB: process.env.MONGOD_DB,
    TOKEN_SECRET: process.env.TOKEN_SECRET,
};

export default environments;