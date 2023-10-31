import {Router} from "express";
import {OrderRecord} from "../records/order.record";

export const homeRouter = Router();

homeRouter
    .get('/:id', async (req, res) => {
        const order = await OrderRecord.getOne(req.params.id);
        res.json(order);
    })