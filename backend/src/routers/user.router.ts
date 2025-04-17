import { Router } from 'express';
import { register, login, getAllUsers, deleteUser, updateUser,getProfile } from '../controller/user.controller';
import { AuthController } from '../controller/user.controller';

const router = Router();
const authController = new AuthController();

router.post('/register', register);
router.post('/login', login);
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.put('/users/:id', updateUser);
router.get('/profile/:id', getProfile); // New Route for Profile Retrieval
router.get('/clients', authController.getClients);
router.get('/freelancers', authController.getRegularUsers);
router.get('/total-clients', authController.getTotalClients);
router.get('/total-freelancers', authController.getTotalFreelancers);

export default router;
