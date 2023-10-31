import {ElementEntity} from "../element";
import {MaterialEntity} from "../material";

export interface OrderEntity {
    id: string;
    name: string;
    status:string;
    date: Date;
    elements: (ElementEntity)[];
    materials: (MaterialEntity)[];
    comment: string;
}