import express, {json} from 'express';
import cors from 'cors';
import rateLimit from "express-rate-limit";
import 'express-async-errors';
import {handleError} from "./utils/error";
import {homeRouter} from "./routers/home.router";
import {orderRouter} from "./routers/order.router";
import {materialRouter} from "./routers/material.router";
import {elementRouter} from "./routers/element.router";

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(json());

app.use(rateLimit({
    windowMs: 5 * 60 * 1000,
    limit: 100,
}))

// Routers
app.use('/home', homeRouter);
app.use('/order', orderRouter);
app.use('/material', materialRouter);
app.use('/element', elementRouter);

app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on port http://localhost:3001')
})