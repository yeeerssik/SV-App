"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerValidation = void 0;
const express_validator_1 = require("express-validator");
exports.registerValidation = [
    (0, express_validator_1.body)('email', 'Invalid email format').isEmail(),
    (0, express_validator_1.body)('password', 'Minimum password length must consists 5 characters').isLength({ min: 5 }),
    (0, express_validator_1.body)('fullName', 'Mininum name must consist of 3 characters').isLength({ min: 3 }),
    (0, express_validator_1.body)('avatarUrl', 'Invalid URL').optional().isURL(),
];
//# sourceMappingURL=auth.js.map