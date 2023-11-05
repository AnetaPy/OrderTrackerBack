import {pool} from "../utils/db";
import {v4 as uuid} from 'uuid';
import {RelationEntity} from "../types/relation";

export class RelationRecord implements RelationEntity {
    id: string;
    order_id: string;
    item_id: string;
    amount: number;

    constructor(obj: RelationEntity) {
        this.id = obj.id;
        this.order_id = obj.order_id;
        this.item_id = obj.item_id;
        this.amount = obj.amount;
    }

    // Insert new relation to elements.
    async insertNewRelationToElements(): Promise<void> {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error('Nie można dodać elementu który już istnieje!')
        }

        await pool.execute("INSERT INTO `orders_elements`(`id`, `order_id`,`element_id`, `amount`) VALUES (:id, :order_id, :item_id, :amount)", this)
    }

    // Insert new relation to materials.
    async insertNewRelationToMaterials(): Promise<void> {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error('Nie można dodać relacji element-zamówienie które już istnieje!')
        }

        await pool.execute("INSERT INTO `orders_materials`(`id`, `order_id`,`material_id`, `amount`) VALUES (:id, :order_id, :item_id, :amount)", this)
    }
}