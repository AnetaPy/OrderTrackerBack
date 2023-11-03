import {FieldPacket} from "mysql2";
import {pool} from "../utils/db";
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

//     List all materials from database.
    static async listAllMaterials(): Promise<ItemEntity[] | null> {
        const [results] = await pool.execute("SELECT * FROM `materials`") as any as MaterialRecordResult;
        return results.map(obj => new MaterialRecord(obj));
    }

}