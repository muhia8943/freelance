import express from 'express';
import userRouter from './routers/user.router';
import jobRoutes from './routers/job.router';
import jobApplicationRoutes from './routers/jobApplication.router'; // Import job application routes
import jobCompletionRoutes from './routers/jobCompletion.router';
import chatRoutes from './routers/chatRoutes';
import dotenv from 'dotenv';
import cors from 'cors';


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:4200' // Allow only this origin
}));

app.use(express.json());
app.use('/api/auth', userRouter);
app.use('/api/jobs', jobRoutes);
app.use('/api/job-applications', jobApplicationRoutes); // Use job application routes
app.use('/api/job-completion', jobCompletionRoutes);
app.use("/api/chat", chatRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
