import {Router} from "express";
import {UserRecord} from "../records/user.record";
import * as bcrypt from 'bcrypt';
import {ValidationError} from "../utils/error";
import {UserEntity} from "../types/user";

export const userRouter = Router();

userRouter

    .post('/login', async (req, res) => {
        const user = await UserRecord.getOneUser(req.body.email.current);
        const result = await bcrypt.compare(req.body.password.current, user.password);
        res.json(result);
    })

    .post('/signup', async (req, res) => {
        const emails = await UserRecord.listAllEmails();
        const {name, email, passwordFirst, passwordSecond} = req.body;

       emails?.map(item => {
           if (item.email === email) {
               throw new ValidationError('Ten e-mail jest już w bazie. Zaloguj się na stronie głównej. Kliknij logo -->');
           }
       })
        const newUser: UserEntity = {
            name: name as string,
            email: email as string,
            password: ''
        }

        if (passwordFirst === passwordSecond) {
            newUser.password = await bcrypt.hash(passwordFirst, 10);
        } else {
            throw new ValidationError("Hasła nie są identyczne. Wprowadź ponownie.")
        }

        const user = new UserRecord(newUser);
        await user.insertNewUser();
        res.json(user);
    })