import {Router} from "express";

export const adRouter = Router();

adRouter
.get('/', (req, res) => {
    res.send('Hi')
})