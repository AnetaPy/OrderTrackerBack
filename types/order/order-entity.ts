import {ItemEntity} from "../item";

export interface OrderEntity {
    id: string;
    name: string;
    status:string;
    date: Date;
    elements: (ItemEntity)[];
    materials: (ItemEntity)[];
    comment: string;
}