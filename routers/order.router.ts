import {Router} from "express";
import {OrderRecord} from "../records/order.record";
import {OrderEntity} from "../types";
import {ValidationError} from "../utils/error";
import {RelationRecord} from "../records/relation.record";
import {ElementRecord} from "../records/element.record";

export const orderRouter = Router();

orderRouter

    .get('/', async (req, res) => {
        let allOrders: OrderEntity[] = [];
        const idOfAllOrders = await OrderRecord.findIdAllOrders();
        for (const id of idOfAllOrders) {
            const order = await OrderRecord.getOneOrder(id.id);
            allOrders.push(order)
        }
        res.json(allOrders);
    })

    .post('/', async (req, res) => {
        const order = new OrderRecord(req.body);
        await order.insertNewOrder();
        res.json(order);
    })

    .patch('/update/:id', async (req, res) => {
        const order = await OrderRecord.getOneOrder(req.params.id);
        if (order === null) {
            throw new ValidationError('Nie znaleziono zamówienia o podanym id.');
        }
        const updatedMaterial = new OrderRecord(req.body);
        await updatedMaterial.updateOrder();
        res.json(order);
    })

    .delete('/:id', async (req, res) => {
        const {id} = req.params;
        const order = await OrderRecord.getOneOrder(id);
        if (!order) {
            throw new ValidationError('Nie ma takiego zamówienia.')
        }
        const elementsIds = await RelationRecord.findElementId(id);
        for (const relation of elementsIds) {
            const element = await ElementRecord.getOneElement(relation.element_id);
            await element.deleteElement();
        }
        await order.deleteOrder();
        res.end();
    })