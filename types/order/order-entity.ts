import {ItemEntity} from "../item";

export interface SimpleOrderEntity {
    id: string;
}

export interface OrderEntity extends SimpleOrderEntity{
    name: string;
    status: string;
    date: Date;
    elements: (ItemEntity)[];
    materials: (ItemEntity)[];
    comment: string;
}