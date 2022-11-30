"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.login = exports.register = exports.checkHealth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_validator_1 = require("express-validator");
const User_1 = __importDefault(require("../models/User"));
const checkHealth = (req, res) => {
    console.log("Service works!!!");
    res.send('Service works!!');
};
exports.checkHealth = checkHealth;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        } // возвращает букет ошибок, если данные для регистрации не верные 
        const password = req.body.password;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(password, salt);
        // шифрование пароля
        const user = yield User_1.default.create({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash,
        });
        // построение модели пользователя
        //const user = await doc.create// сохранение пользователя в монгошку
        const token = jsonwebtoken_1.default.sign({
            _id: user._id,
        }, 'secret123', // поменять
        {
            expiresIn: '30d',
        }); // токенизация
        const _a = user.toObject(), { passwordHash } = _a, userData = __rest(_a, ["passwordHash"]);
        res.status(200).send(Object.assign(Object.assign({}, userData), { token })); // успешное создание пользователя
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to register"
        }); // возвращает json с текстом ошибок
    }
}); // post запрос для регистрации
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }
        const isValidPass = yield bcrypt_1.default.compare(req.body.password, user.toObject().passwordHash);
        if (!isValidPass) {
            return res.status(400).json({
                message: 'Wrong email or password'
            });
        }
        const token = jsonwebtoken_1.default.sign({
            _id: user._id,
        }, 'secret123', {
            expiresIn: '30d',
        });
        const _b = user.toObject(), { passwordHash } = _b, userData = __rest(_b, ["passwordHash"]);
        res.status(200).send(Object.assign(Object.assign({}, userData), { token })); // успешное нахождение пользователя
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to register"
        }); // неудачная авторизация 
    }
});
exports.login = login;
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.userId);
        console.log(user);
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        const _c = user.toObject(), { passwordHash } = _c, userData = __rest(_c, ["passwordHash"]);
        res.status(200).json(Object.assign({}, userData));
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Access forbidden'
        });
    }
});
exports.getMe = getMe;
//# sourceMappingURL=UserController.js.map