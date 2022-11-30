"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    if (token) {
        try {
            const { _id } = jsonwebtoken_1.default.verify(token, 'secret123');
            // console.log(_id);
            req.userId = _id;
            next();
        }
        catch (err) {
            return res.status(403).json({
                message: "Access forbidden"
            });
        }
    }
    else {
        return res.status(403).json({
            message: "Access forbidden"
        });
    }
    // next();
};
//# sourceMappingURL=checkAuth.js.map