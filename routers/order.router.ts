import {Router} from "express";
import {OrderRecord} from "../records/order.record";
import {OrderEntity} from "../types";

export const orderRouter = Router();

orderRouter

    .get('/', async (req, res) => {
        let allOrders: OrderEntity[] = [];
        const idOfAllOrders = await OrderRecord.findIdAllOrders();
        for (const id of idOfAllOrders) {
            const order = await OrderRecord.getOne(id.id);
            allOrders.push(order)
        }
        res.json(allOrders);
    })

    .post('/', async (req, res) => {
        const order = new OrderRecord(req.body);
        await order.insertNewOrder();
        res.json(order);
    })