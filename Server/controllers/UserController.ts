import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';

import UserModel from '../models/User';

export const checkHealth = (req, res) => {
    console.log("Service works!!!");
    res.send('Service works!!');
};

export const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        } // возвращает букет ошибок, если данные для регистрации не верные 

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        // шифрование пароля

        const user = await UserModel.create({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash,
        });
        // построение модели пользователя

        //const user = await doc.create// сохранение пользователя в монгошку

        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret123', // поменять
            {
                expiresIn: '30d',
            }
        ); // токенизация
        
        const { passwordHash, ...userData } = user.toObject()

        res.status(200).send({
            ...userData,
            token
        }); // успешное создание пользователя

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to register"
        }); // возвращает json с текстом ошибок
    }
}; // post запрос для регистрации

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        const isValidPass = await bcrypt.compare(req.body.password, user.toObject().passwordHash);

        if (!isValidPass) {
            return res.status(400).json({
                message: 'Wrong email or password'
            })
        }

        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret123',
            {
                expiresIn: '30d',
            }
        );

        const { passwordHash, ...userData } = user.toObject()

        res.status(200).send({
            ...userData,
            token
        }); // успешное нахождение пользователя
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to register"
        }); // неудачная авторизация 
    }
};

export const getMe = async (req: any, res: any) => {
    try {
        const user = await UserModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        const { passwordHash, ...userData } = user.toObject()

        res.status(200).json({
            ...userData
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Access forbidden'
        });
    }
};