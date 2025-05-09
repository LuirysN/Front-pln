document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("messageInput");
    const sendButton = document.getElementById("sendButton");
    const chatContainer = document.getElementById("chatContainer");

    async function sendMessage() {
        const message = input.value.trim();
        if (message === "") return;

        // Criar e exibir a mensagem do usuário
        const userMessage = document.createElement("div");
        userMessage.classList.add("message", "user");
        userMessage.textContent = message;
        chatContainer.appendChild(userMessage);

        // Limpar a caixa de entrada
        input.value = "";
        input.style.height = "40px";

        // Criar e exibir a animação de "digitando..."
        const typingMessage = document.createElement("div");
        typingMessage.classList.add("message");
        typingMessage.innerHTML = '<span class="typing"><span>.</span><span>.</span><span>.</span></span>';
        chatContainer.appendChild(typingMessage);

        chatContainer.scrollTop = chatContainer.scrollHeight;

        try {
            const response = await fetch("http://localhost:8000/perguntar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ pergunta: message })
            });

            const data = await response.json();

            typingMessage.remove(); // Remove a animação

            const botMessage = document.createElement("div");
            botMessage.classList.add("message");
            botMessage.textContent = data.resposta || "Desculpe, não consegui entender.";
            chatContainer.appendChild(botMessage);
        } catch (error) {
            typingMessage.remove();

            const errorMessage = document.createElement("div");
            errorMessage.classList.add("message");
            errorMessage.textContent = "Erro ao se comunicar com o servidor.";
            chatContainer.appendChild(errorMessage);
            console.error("Erro:", error);
        }

        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    input.addEventListener("input", function () {
        this.style.height = "40px";
        this.style.height = this.scrollHeight + "px";
    });

    sendButton.addEventListener("click", sendMessage);

    input.addEventListener("keydown", function (event) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    });
});
