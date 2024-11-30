// Conectar ao servidor usando Socket.IO
const socket = io();

// Referências aos elementos HTML
const sendButton = document.getElementById('sendButton');
const messageInput = document.getElementById('messageInput');
const chatContainer = document.getElementById('chatContainer');

// Função para enviar uma mensagem
function sendMessage() {
    const message = messageInput.value;
    if (message.trim() !== "") {
        // Enviar a mensagem para o servidor
        socket.emit('sendMessage', message);

        // Adicionar a mensagem localmente para o usuário
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'user'); // Estilo de mensagem do usuário
        messageElement.textContent = message;
        chatContainer.appendChild(messageElement);

        // Rola até o final para a nova mensagem
        chatContainer.scrollTop = chatContainer.scrollHeight;

        // Limpa o campo de entrada
        messageInput.value = "";
    }
}

// Adicionar o ouvinte de evento para o botão "Enviar"
sendButton.addEventListener('click', sendMessage);

// Permitir o envio de mensagem pressionando a tecla Enter
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Escutando as mensagens de outros usuários (emitidas pelo servidor)
socket.on('newMessage', (message) => {
    // Adicionar a mensagem enviada por outro usuário
    const messageElement = document.createElement('div');
    messageElement.classList.add('message'); // Estilo de mensagem do outro usuário
    messageElement.textContent = message;
    chatContainer.appendChild(messageElement);

    // Rola até o final para a nova mensagem
    chatContainer.scrollTop = chatContainer.scrollHeight;
});
