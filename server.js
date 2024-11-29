const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Servir arquivos estáticos da pasta public
app.use(express.static('public'));  // Aqui você serve os arquivos da pasta public

// Evento quando um cliente se conecta
io.on('connection', (socket) => {
    console.log('Um usuário se conectou.');

    // Quando um usuário envia uma mensagem, o servidor transmite para todos os outros clientes
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // Envia a mensagem para todos os usuários conectados
    });

    // Quando um cliente se desconecta
    socket.on('disconnect', () => {
        console.log('Um usuário se desconectou.');
    });
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
