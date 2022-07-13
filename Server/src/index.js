import express from "express";
import environments from '../config/environments.js';
import bookRouter from "./routers/books.router.js";
import userRouter from "./routers/users.router.js";
import cartRouter from "./routers/cart.router.js";
import cors from 'cors';
import connectToMongoDB from "./databases/mongoose.db.js";

const PORT = environments.PORT;
const app = express();

app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(bookRouter);
app.use(cartRouter);

app.listen(PORT, async() => {
    console.log(`Server is running on port ${PORT}`);
    await connectToMongoDB();
})