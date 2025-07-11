import { createServer } from 'http';

const PORT = 3000;

const server = createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.end(JSON.stringify({ message: 'Halo dari metode GET!' }));
  } else {
    res.statusCode = 404;
    res.end('Endpoint tidak ditemukan!');
  }
});

server.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
