
import express from 'express';
import userRoutes from './routes/userRoutes';
const app = express();
app.use(express.json());
app.use('/api', userRoutes);
app.listen(5000, () => console.log('Server running on port 5000'));
