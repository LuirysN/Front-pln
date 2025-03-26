document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("messageInput");
    const sendButton = document.getElementById("sendButton");
    const chatContainer = document.getElementById("chatContainer");

    function sendMessage() {
        const message = input.value.trim();
        if (message === "") return;

        // Criar e exibir a mensagem do usuário
        const userMessage = document.createElement("div");
        userMessage.classList.add("message", "user");
        userMessage.textContent = message;
        chatContainer.appendChild(userMessage);

        // Limpar a caixa de entrada
        input.value = "";
        input.style.height = "40px"; // Resetar altura do textarea

        // Criar e exibir a animação de "digitando..."
        const typingMessage = document.createElement("div");
        typingMessage.classList.add("message");
        typingMessage.innerHTML = '<span class="typing"><span>.</span><span>.</span><span>.</span></span>';
        chatContainer.appendChild(typingMessage);

        // Auto-scroll para a última mensagem
        chatContainer.scrollTop = chatContainer.scrollHeight;

        // Simular resposta
        setTimeout(() => {
            typingMessage.remove(); // Remove a animação

            // Criar e exibir a resposta
            const botMessage = document.createElement("div");
            botMessage.classList.add("message");
            botMessage.textContent = "Esta é uma resposta automática sobre a LAI.";
            chatContainer.appendChild(botMessage);

            // Auto-scroll novamente
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }, 2000);
    }

    // Ajustar altura do textarea dinamicamente
    input.addEventListener("input", function () {
        this.style.height = "40px";
        this.style.height = this.scrollHeight + "px";
    });

    // Enviar mensagem ao clicar no botão
    sendButton.addEventListener("click", sendMessage);

    // Enviar mensagem ao pressionar Enter
    input.addEventListener("keydown", function (event) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    });
});
