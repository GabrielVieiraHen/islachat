const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Servir os arquivos estáticos (HTML, CSS, JS) da pasta public
app.use(express.static('public'));

// Configuração do WebSocket
io.on('connection', (socket) => {
    console.log('Um usuário conectou.');

    // Quando um usuário envia uma mensagem
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // Enviar mensagem para todos os clientes
    });

    // Quando um usuário se desconecta
    socket.on('disconnect', () => {
        console.log('Um usuário desconectou.');
    });
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
