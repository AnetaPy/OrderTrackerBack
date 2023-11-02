import {Router} from "express";
import {OrderRecord} from "../records/order.record";
import {OrderEntity} from "../types";

export const ordersRouter = Router();

ordersRouter

    .get('/', async (req, res) => {
        let allOrders: OrderEntity[] = [];
        const idOfAllOrders = await OrderRecord.findIdAllOrders();
        for (const id of idOfAllOrders) {
            const order = await OrderRecord.getOne(id.id);
            allOrders.push(order)
        }
        res.json(allOrders);
    })