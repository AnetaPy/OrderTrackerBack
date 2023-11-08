import {Router} from "express";
import {MaterialRecord} from "../records/material.record";
import {ValidationError} from "../utils/error";
import {RelationRecord} from "../records/relation.record";

export const materialRouter = Router();

materialRouter

    .get('/', async (req, res) => {
        const allMaterials = await MaterialRecord.listAllMaterials();
        res.json(allMaterials);
    })

    .post('/', async (req, res) => {
        const material = new MaterialRecord(req.body);
        await material.insertNewMaterial();
        res.json(material);
    })

    .post('/relation', async (req, res) => {
        const material = new RelationRecord(req.body);
        await material.insertNewRelationToMaterials();
        res.json(material);
    })


    .patch('/:id', async (req, res) => {
        const material = await MaterialRecord.getOneMaterial(req.params.id);
        if (material === null) {
            throw new ValidationError('Nie znaleziono materiału z podanym ID.');
        }
        if (material) {
            const amountFromDatabase = await material.countMaterials();
            if (Number(req.body.amount) > amountFromDatabase) {
                throw new ValidationError(`Tego materiału jest za mało, zostało ${amountFromDatabase}.`);
            }
        }
        const updatedMaterial = {
            ...material,
            amount: material.amount - Number(req.body.amount)
        }
        const newMaterial = new MaterialRecord(updatedMaterial);
        await newMaterial.updateMaterial();
        res.json(material);
    })

    .patch('/update/:id', async (req, res) => {
        const material = await MaterialRecord.getOneMaterial(req.params.id);
        if (material === null) {
            throw new ValidationError('Nie znaleziono materiału z podanym ID.');
        }
        const updatedMaterial = new MaterialRecord(req.body);
        await updatedMaterial.updateMaterial();
        res.json(material);
    })

    .delete('/:id', async (req, res) => {
        const material = await MaterialRecord.getOneMaterial(req.params.id);
        if (!material) {
            throw new ValidationError('Nie ma takiego materiału.')
        }
        await material.deleteMaterial();
        res.end()
    })