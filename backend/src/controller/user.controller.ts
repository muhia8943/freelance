import { Request, Response } from 'express';
import { AuthService } from '../services/user.service';

const authService = new AuthService();

export const register = async (req: Request, res: Response) => {
    try {
        await authService.register(req.body);
        res.status(201).json({ message: 'User registered successfully' });

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
            res.status(401).json({ error: 'Invalid credentials' });
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
        res.status(200).json({ message: 'User updated successfully.' }); // ✅ Ensure JSON response
    } catch (error: any) {
        console.error("Update User Error:", error); // 🔍 Log error
        res.status(500).json({ error: error.message }); // ✅ Send error as JSON
    }
};

export const getProfile = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.id);
        
        if (isNaN(userId)) {
            res.status(400).json({ message: "Invalid user ID" });
            return;
        }

        const userProfile = await authService.getProfile(userId);
        if (!userProfile) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.status(200).json(userProfile);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
};