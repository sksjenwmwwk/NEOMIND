const chatbox = document.getElementById("chatbox");
const userInput = document.getElementById("userInput");

async function sendMessage() {
    let userMessage = userInput.value.trim();
    if (!userMessage) return; // खाली Input Ignore करें
    userInput.value = "";

    chatbox.innerHTML += `<div><b>You:</b> ${userMessage}</div>`;

    try {
        let response = await fetch("https://huggingface.co/spaces/Omprakash75646357483/Neo_ai/api/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ inputs: userMessage })
        });

        let result = await response.json();
        let botMessage = result[0]?.generated_text || "Sorry, I couldn't understand.";

        chatbox.innerHTML += `<div><b>NEO AI:</b> ${botMessage}</div>`;
        chatbox.scrollTop = chatbox.scrollHeight; // Auto-scroll last message पर
    } catch (error) {
        chatbox.innerHTML += `<div><b>NEO AI:</b> ❌ Error fetching response.</div>`;
        console.error("API Error:", error);
    }
}
