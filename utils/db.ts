import {createPool} from "mysql2/promise";

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    database: 'order_tracker',
    namedPlaceholders: true,
    decimalNumbers: true,
});