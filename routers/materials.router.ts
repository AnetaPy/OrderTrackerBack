import {Router} from "express";
import {MaterialRecord} from "../records/material.record";

export const materialsRouter = Router();

materialsRouter

    .get('/', async (req, res) => {
        const allMaterials = await MaterialRecord.listAllMaterials();
        res.json(allMaterials);
    })