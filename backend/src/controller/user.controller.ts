import { Request, Response } from 'express';
import { AuthService } from '../services/user.service';

const authService = new AuthService();

export const register = async (req: Request, res: Response) => {
    try {
        await authService.register(req.body);
        res.status(201).send('User registered successfully');
    } catch (error: any) {
        res.status(500).send(error.message);
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const result = await authService.login(email, password);
        
        if (result) {
            res.json(result); // Respond with token and role
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error: any) {
        res.status(500).send(error.message);
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await authService.getAllUsers();
        res.json(users);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        await authService.deleteUser(Number(req.params.id));
        res.status(200).send('User deleted successfully.');
    } catch (error: any) {
        res.status(500).send(error.message);
    }
};
export const updateUser = async (req: Request, res: Response) => {
    try {
        await authService.updateUser(Number(req.params.id), req.body);
        res.status(200).send('User updated successfully.');
    } catch (error: any) {
        res.status(500).send(error.message);
    }
};