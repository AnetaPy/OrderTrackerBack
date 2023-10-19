import express, {json} from 'express';
import cors from 'cors';
import 'express-async-errors';
import {handleError} from "./utils/error";
import {adRouter} from "./routers/ad.router";

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(json());

// Routers
app.use('/', adRouter);

app.use(handleError);

app.listen(3001, '0.0.0.0', ()=> {
    console.log('Listening on port http://localhost:3001')
})