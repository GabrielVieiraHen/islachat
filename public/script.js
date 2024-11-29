document.addEventListener('DOMContentLoaded', () => {
    // Gerar nome aleatório
    const randomName = `Usuário-${Math.floor(Math.random() * 1000)}`;
    document.getElementById('welcome-message').textContent = `Bem-vindo, ${randomName}!`;

    // Simulação de chat básico
    const chatBox = document.getElementById('chat-box');
    const chatForm = document.getElementById('chat-form');
    const messageInput = document.getElementById('message-input');

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const message = messageInput.value.trim();
        if (message) {
            const newMessage = document.createElement('p');
            newMessage.textContent = `${randomName}: ${message}`;
            chatBox.appendChild(newMessage);

            chatBox.scrollTop = chatBox.scrollHeight; // Rolagem automática
            messageInput.value = '';
        }
    });
});
