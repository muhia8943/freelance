import { Router } from 'express';
import { register, login, getAllUsers, deleteUser, updateUser,getProfile } from '../controller/user.controller';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.put('/users/:id', updateUser);
router.get('/profile/:id', getProfile); // New Route for Profile Retrieval

export default router;
