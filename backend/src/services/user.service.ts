import { poolPromise } from '../config/sql.config';
import { user } from '../interfaces/user.interface';
import * as sql from 'mssql';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendMail } from '../helpers/emailHelpers';
import ejs from 'ejs';
import path from 'path';

export class AuthService {
    public async register(user: user): Promise<void> {
        console.log("Received user data:", user); // Debugging log
    
        const pool = await poolPromise;
        const hashedPassword = await bcrypt.hash(user.password, 10);
    
        // Extract role correctly
        const role = user.role || user.role; // Handle lowercase & uppercase property names
    
        console.log("Extracted role from request:", role); // Debugging log
    
        if (!role) {
            console.log("Role not provided, setting default role: user");
        }
    
        const finalRole = ['admin', 'client', 'user'].includes(role) ? role : 'user';
    
        console.log("Final assigned role:", finalRole); // Debugging log
    
        await pool.request()
            .input('username', sql.NVarChar, user.username)
            .input('password', sql.NVarChar, hashedPassword)
            .input('email', sql.NVarChar, user.email)
            .input('role', sql.NVarChar, finalRole) 
            .execute('spRegisterUser');

        // Send welcome email
        // const templatePath = path.resolve(__dirname, '../templates/welcomeUser.ejs');
        // const emailContent = await ejs.renderFile(templatePath, { UserName: user.username });
        
        // const mailOptions = {
        //     from: process.env.EMAIL as string,
        //     to: user.email,
        //     subject: "Welcome to plana",
        //     html: emailContent
        // };

        // await sendMail(mailOptions);
    }

    public async login(email: string, password: string): Promise<{ token: string, Role: string, userID: number } | null> {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('email', sql.NVarChar, email)
            .execute('spLoginUser');
        
        if (result.recordset.length > 0) {
            const user = result.recordset[0];
            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                const token = jwt.sign({ id: user.id, Role: user.Role }, process.env.JWT_SECRET as string, {
                    expiresIn: '1h'
                });
                return { token, Role: user.Role, userID: user.id }; // Return the token, role, and userID
            }
        }
        return null;
    }


    public async getAllUsers(): Promise<user[]> {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM Users');
        return result.recordset;
    }

    public async deleteUser(id: number): Promise<void> {
        const pool = await poolPromise;
        await pool.request().input('id', sql.Int, id).execute('spDeleteUser');
    }
    public async updateUser(id: number, updateUser: Partial<user>): Promise<void> {
        const pool = await poolPromise;
    
        console.log("Updating user with ID:", id);  // Debugging log
        console.log("Update data:", updateUser);    // Debugging log
    
        await pool.request()
            .input('id', sql.Int, id)  // Use 'id' parameter instead of updateUser.UserID
            .input('username', sql.NVarChar, updateUser.username)
            .input('email', sql.NVarChar, updateUser.email)
            .input('role', sql.NVarChar, updateUser.role)
            .input('phoneNumber', sql.NVarChar, updateUser.phonenumber)
            .input('profilePicture', sql.NVarChar, updateUser.profile_picture)
            .input('skills', sql.Text, updateUser.skills)
            .input('bio', sql.Text, updateUser.bio)
            .execute('spUpdateUser');
    }
    public async getProfile(id: number): Promise<user | null> {
        const pool = await poolPromise;
        
        console.log("Fetching profile for user ID:", id); // Debugging log
    
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM Users WHERE  UserID = @id');
    
        if (result.recordset.length > 0) {
            return result.recordset[0];
        }
    
        return null;
    }
    
}
