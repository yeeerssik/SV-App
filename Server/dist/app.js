"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_1 = require("./validations/auth"); // компилить
const checkAuth_1 = __importDefault(require("./utils/checkAuth"));
const UserController = __importStar(require("./controllers/UserController"));
mongoose_1.default
    .connect('mongodb+srv://yers:Vem_100802@diploma-project-cluster.sozejqp.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.log('DB error: ', err));
const app = (0, express_1.default)();
app.use(express_1.default.json()); // подключение json
app.get('/checkHealth', UserController.checkHealth);
app.post('/auth/login', UserController.login);
app.post('/auth/register', auth_1.registerValidation, UserController.register);
app.post('/auth/me', checkAuth_1.default, UserController.getMe);
app.on('error', (err) => {
    if (err) {
        return console.log(err);
    }
});
app.listen(3000, () => {
    console.log('OK');
}); // запуск сервера на порту 
//# sourceMappingURL=app.js.map