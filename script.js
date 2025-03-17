const API_URL = "https://omprakash75646357483-neo-ai.hf.space/chat"; // अपनी API URL डालें

async function sendMessage() {
    let userInput = document.getElementById("user-input").value;
    if (!userInput) return;

    let chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<p class="user">${userInput}</p>`;
    
    document.getElementById("user-input").value = "";
    
    // API Call
    try {
        let response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                message: userInput,
                system_message: "You are a helpful AI assistant.",
                max_tokens: 512,
                temperature: 0.7,
                top_p: 0.95
            })
        });

        let data = await response.json();
        chatBox.innerHTML += `<p class="bot">${data}</p>`;
    } catch (error) {
        chatBox.innerHTML += `<p class="bot">Error connecting to API!</p>`;
        console.error("Error:", error);
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}
