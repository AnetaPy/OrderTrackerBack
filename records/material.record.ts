import {FieldPacket} from "mysql2";
import {pool} from "../utils/db";
import {v4 as uuid} from 'uuid';
import {ItemEntity} from "../types";

type MaterialRecordResult = [ItemEntity[], FieldPacket];

export class MaterialRecord implements ItemEntity {
    id: string;
    name: string;
    amount: number;

    constructor(obj: ItemEntity) {
        this.id = obj.id;
        this.name = obj.name;
        this.amount = obj.amount;
    }

    // Find one material.
    static async getOneMaterial(id: string): Promise<MaterialRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `materials` WHERE `id` = :id", {
            id,
        }) as any as MaterialRecordResult;
        return results.length === 0 ? null : new MaterialRecord(results[0]);
    }

    // List all materials from database.
    static async listAllMaterials(): Promise<ItemEntity[] | null> {
        const [results] = await pool.execute("SELECT * FROM `materials`") as any as MaterialRecordResult;
        return results.map(obj => new MaterialRecord(obj));
    }

    // Insert new material.
    async insertNewMaterial(): Promise<void> {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error('Nie można dodać materiału który już istnieje!')
        }

        await pool.execute("INSERT INTO `materials`(`id`, `name`, `amount`) VALUES (:id, :name, :amount)", this)
    }

    // Delete material.
    async deleteMaterial(): Promise<void> {
        await pool.execute("DELETE FROM `materials` WHERE `id` = :id", {
            id: this.id,
        })
    }

    async update(): Promise<void> {
        await pool.execute("UPDATE `materials` SET `name` = :name, `amount` = :amount WHERE `id` = :id", {
            id: this.id,
            name: this.name,
            amount: this.amount,
        });
    }

    async countMaterials(): Promise<number> {
        const [[{amount}]] /* answer[0][0].count */ = await pool.execute("SELECT `amount` FROM `materials` WHERE `id` = :id", {
            id: this.id,
        })as any as MaterialRecordResult;
        return amount;
       }

}