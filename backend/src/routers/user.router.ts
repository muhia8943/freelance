import { Router } from 'express';
import { register, login, getAllUsers, deleteUser, updateUser } from '../controller/user.controller';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.put('/users/:id', updateUser);

export default router;
