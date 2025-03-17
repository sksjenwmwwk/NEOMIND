let apiURL = "https://omprakash75646357483-neo-ai.hf.space/chat";  // ✅ सही API URL

async function sendMessage() {
    let inputText = userInput.value.trim();
    if (inputText === "") return;

    chatBox.innerHTML += `<p class="user">${inputText}</p>`;
    userInput.value = "";

    try {
        let response = await fetch(apiURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                message: inputText,
                system_message: "You are a helpful AI assistant.",
                max_tokens: 512,
                temperature: 0.7,
                top_p: 0.95
            })
        });

        let data = await response.json();

        if (data && data.response) {
            chatBox.innerHTML += `<p class="bot">${data.response}</p>`;
        } else {
            chatBox.innerHTML += `<p class="bot">⚠️ Error: Invalid API Response!</p>`;
        }
    } catch (error) {
        chatBox.innerHTML += `<p class="bot">❌ Error: API Not Responding!</p>`;
        console.error("API Error:", error);
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}
