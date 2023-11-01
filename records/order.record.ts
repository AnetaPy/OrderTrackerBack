import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {ElementEntity, MaterialEntity, OrderEntity} from "../types";
import {ValidationError} from "../utils/error";

type OrderRecordResult = [OrderEntity[], FieldPacket];
type ElementRecordResult = [ElementEntity[], FieldPacket];
type MaterialRecordResult = [MaterialEntity[], FieldPacket];

export class OrderRecord implements OrderEntity {
    id: string;
    name: string;
    status: string;
    date: Date;
    elements: (ElementEntity)[];
    materials: (MaterialEntity)[];
    comment: string;

    constructor(obj: OrderEntity) {
        if (!obj.name || obj.name.length > 40) {
            throw new ValidationError('Nazwa zamówienia nie może być pusta ani przekraczać 40 znaków.')
        }
        if (obj.comment.length > 300) {
            throw new ValidationError('Treść ogłoszenia nie może przekraczać 1000 znaków.')
        }
        this.id = obj.id;
        this.name = obj.name;
        this.status = obj.status;
        this.date = obj.date;
        this.elements = obj.elements;
        this.materials = obj.materials;
        this.comment = obj.comment;
    }

    static async getOne(id: string): Promise<OrderRecord | null> {

        const [result] = await pool.execute("SELECT * FROM `orders`WHERE id = :id", {
            id
        }) as any as OrderRecordResult;
        const [resultElements] = await pool.execute("SELECT elements.id, elements.name, orders_elements.amount FROM `elements` INNER JOIN `orders_elements` ON orders_elements.element_id = elements.id WHERE orders_elements.order_id = :id", {
            id
        }) as any as ElementRecordResult;
        const [resultMaterials] = await pool.execute("SELECT materials.id, materials.name, orders_materials.amount FROM `materials` INNER JOIN `orders_materials` ON orders_materials.material_id = materials.id WHERE orders_materials.order_id = :id", {
            id
        }) as any as MaterialRecordResult;

        const SingleOrder:OrderEntity = new OrderRecord(result[0]);
        SingleOrder.elements = resultElements;
        SingleOrder.materials = resultMaterials;

        return result.length === 0 ? null : SingleOrder;
    }


}