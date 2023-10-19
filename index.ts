import express, {json} from 'express';
import cors from 'cors';
import 'express-async-errors';
import {adRouter} from "./routers/ad.router";

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(json());

// app.get('/', async (req, res) => {
//     res.send('Hi')
// })
app.use('/', adRouter)




app.listen(3001, '0.0.0.0', ()=> {
    console.log('Listening on port http://localhost:3001')
})