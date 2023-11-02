import {Router} from "express";
import {OrderRecord} from "../records/order.record";

export const homeRouter = Router();

homeRouter

    .get('/', async (req, res) => {
        const order = await OrderRecord.getOne((await OrderRecord.findOrderInProgress()).id);
        res.json(order);
    })