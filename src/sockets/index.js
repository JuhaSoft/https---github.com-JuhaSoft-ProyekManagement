module.exports = (io) => {
    io.on('connection', (socket) => {
      console.log('🟢 Socket client connected: ', socket.id);
  
      // Contoh: Client join ke room proyek
      socket.on('joinProjectRoom', (projectId) => {
        socket.join(`project-${projectId}`);
        console.log(`Socket ${socket.id} joined room project-${projectId}`);
      });
  
      // Contoh: Notifikasi saat input belanja
      socket.on('expenseAdded', ({ projectId, data }) => {
        io.to(`project-${projectId}`).emit('expenseUpdate', data);
        console.log(`Expense update emitted to project-${projectId}`);
      });
  
      // Contoh emit umum ke dashboard
      socket.on('updateDashboard', (data) => {
        io.emit('dashboardUpdate', data); // broadcast ke semua
      });
  
      socket.on('disconnect', () => {
        console.log('🔴 Socket disconnected: ', socket.id);
      });
    });
  };
  