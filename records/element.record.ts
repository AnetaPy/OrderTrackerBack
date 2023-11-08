import {pool} from "../utils/db";
import {v4 as uuid} from 'uuid';
import {ItemEntity} from "../types";
import {FieldPacket} from "mysql2";

type ElementRecordResult = [ItemEntity[], FieldPacket];

export class ElementRecord implements ItemEntity {
    id: string;
    name: string;
    amount: number;

    constructor(obj: ItemEntity) {
        this.id = obj.id;
        this.name = obj.name;
        this.amount = obj.amount;
    }

    // Find one element.
    static async getOneElement(id: string): Promise<ElementRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `elements` WHERE `id` = :id", {
            id,
        }) as any as ElementRecordResult;
        return results.length === 0 ? null : new ElementRecord(results[0]);
    }

    // Insert new element.
    async insertNewElement(): Promise<void> {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error('Nie można dodać elementu który już istnieje!')
        }

        await pool.execute("INSERT INTO `elements`(`id`, `name`, `amount`) VALUES (:id, :name, :amount)", this)
    }

    // Delete element.
    async deleteElement(): Promise<void> {
        await pool.execute("DELETE FROM `elements` WHERE `id` = :id", {
            id: this.id,
        })
    }
}