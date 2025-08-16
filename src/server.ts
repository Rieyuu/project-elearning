// inisialisasi
import 'dotenv/config';
import express from 'express';
import path from 'path';
import apiRoutes from './routes';

const app = express();
const PORT = process.env.PORT || 3000;

// middleware request body, jika diperlukan
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public folder
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// handle seluruh request /api/* ke route API
app.use('/api', apiRoutes);

// event loop
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

export default app;
