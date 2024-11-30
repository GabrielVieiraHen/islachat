const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve arquivos estáticos da pasta 'public'
app.use(express.static('public'));

// Conectar no socket
io.on('connection', (socket) => {
    console.log('Usuário conectado');

    socket.on('sendMessage', (message) => {
        console.log('Mensagem recebida:', message);
        io.emit('newMessage', message); // Envia a mensagem para todos os clientes conectados
    });

    socket.on('disconnect', () => {
        console.log('Usuário desconectado');
    });
});

// Iniciar o servidor na porta 3000
server.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
