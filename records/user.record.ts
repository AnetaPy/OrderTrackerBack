import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from 'uuid'
import {SimpleUserEntity, UserEntity} from "../types/user";

type UserRecordResult = [UserEntity[], FieldPacket];

export class UserRecord implements UserEntity {
    id: string;
    name: string;
    email: string;
    password: string;

    constructor(obj: UserEntity) {
        this.id = obj.id;
        this.name = obj.name;
        this.email = obj.email
        this.password = obj.password;
    }

    // Find one element.
    static async getOneUser(email: string): Promise<UserRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `users` WHERE `email` = :email", {
            email,
        }) as any as UserRecordResult;
        return results.length === 0 ? null : new UserRecord(results[0]);
    }

    // Get e-mail all users.
    static async listAllEmails(): Promise<SimpleUserEntity[] | null> {
        const [results] = await pool.execute("SELECT `email` FROM `users`") as any;
        return results.length > 0 ? results : null;
    }

    // Insert new element.
    async insertNewUser(): Promise<void> {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error('Nie można dodać użytkownika który już istnieje!')
        }

        await pool.execute("INSERT INTO `users`(`id`, `name`, `email`, `password`) VALUES (:id, :name, :email, :password)", this)
    }
}