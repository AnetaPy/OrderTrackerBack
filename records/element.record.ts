import {pool} from "../utils/db";
import {v4 as uuid} from 'uuid';
import {ItemEntity} from "../types";

export class ElementRecord implements ItemEntity {
    id: string;
    name: string;
    amount: number;

    constructor(obj: ItemEntity) {
        this.id = obj.id;
        this.name = obj.name;
        this.amount = obj.amount;
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
}