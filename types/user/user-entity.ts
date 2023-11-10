export interface SimpleUserEntity {
    email: string;
}

export interface UserEntity extends SimpleUserEntity{
    id?: string;
    name: string;
    email: string;
    password: string;
}


