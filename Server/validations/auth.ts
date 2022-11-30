import { body } from 'express-validator'

export const registerValidation = [
    body('email', 'Invalid email format').isEmail(),
    body('password', 'Minimum password length must consists 5 characters').isLength({ min: 5 }),
    body('fullName', 'Mininum name must consist of 3 characters').isLength({ min: 3 }),
    body('avatarUrl', 'Invalid URL').optional().isURL(),
];
