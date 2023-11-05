import express, {json} from 'express';
import cors from 'cors';
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

// Routers
app.use('/home', homeRouter);
app.use('/order', orderRouter);
app.use('/material', materialRouter);
app.use('/element', elementRouter);


app.use(handleError);

app.listen(3001, '0.0.0.0', ()=> {
    console.log('Listening on port http://localhost:3001')
})