import {Router} from "express";
import {ElementRecord} from "../records/element.record";
import {RelationRecord} from "../records/relation.recor";

export const elementRouter = Router();

elementRouter
    .post('/', async (req, res) => {
        const element = new ElementRecord(req.body);
        await element.insertNewElement();
        res.json(element);
    })

    .post('/relation', async (req, res) => {
        const relation = new RelationRecord(req.body);
        await relation.insertNewRelationToElements();
        res.json(relation);
    })