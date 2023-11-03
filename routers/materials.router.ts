import {Router} from "express";
import {MaterialRecord} from "../records/material.record";
import {ValidationError} from "../utils/error";

export const materialsRouter = Router();

materialsRouter

    .get('/', async (req, res) => {
        const allMaterials = await MaterialRecord.listAllMaterials();
        res.json(allMaterials);
    })

    .post('/', async (req, res) => {
        const material = new MaterialRecord(req.body);
        await material.insertNewMaterial();
        res.json(material);
    })

    .delete('/:id', async (req, res) => {
        const material = await MaterialRecord.getOne(req.params.id);

        if (!material) {
            throw new ValidationError('Nie ma takiego materiału.')
        }

        await material.deleteMaterial();
        res.end()
    })