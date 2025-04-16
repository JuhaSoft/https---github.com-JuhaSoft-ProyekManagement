const app = require('./app');
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*', // Izinkan semua origin
  },
});

const PORT = process.env.PORT || 5000;

// Socket handler (untuk komunikasi real-time)
io.on('connection', (socket) => {
  console.log('🟢 Client connected');

  socket.on('disconnect', () => {
    console.log('🔴 Client disconnected');
  });
});

// Menjalankan server
http.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
