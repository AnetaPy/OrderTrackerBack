export interface RelationEntity {
    id: string;
    order_id: string;
    item_id?: string;
    amount: number;
}

export interface RelationElementEntity extends RelationEntity{
    element_id: string;
}