// Conectar ao servidor WebSocket
const socket = io();

// Referências dos elementos HTML
const form = document.getElementById('form');
const messageInput = document.getElementById('messageInput');
const messagesDiv = document.getElementById('messages');

// Enviar mensagem para o servidor
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Previne o envio padrão do formulário
    
    const message = messageInput.value; // Pega a mensagem do input
    socket.emit('chat message', message); // Envia a mensagem para o servidor

    messageInput.value = ''; // Limpar o campo de entrada
});

// Receber mensagens do servidor e exibir
socket.on('chat message', (msg) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = msg; // Exibe a mensagem
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Rola para a última mensagem
});
