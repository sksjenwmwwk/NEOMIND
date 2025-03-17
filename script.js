const API_URL = "https://omprakash75646357483-neo-ai.hf.space/api/predict"; // ✅ सही API URL

document.getElementById("send").addEventListener("click", sendMessage);
document.getElementById("user-input").addEventListener("keypress", function (e) {
    if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
    let userInput = document.getElementById("user-input").value.trim();
    if (userInput === "") return;

    appendMessage("You", userInput);
    document.getElementById("user-input").value = "";
    appendMessage("NEO AI", "⏳ Thinking...");

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ inputs: userInput })
        });

        if (!response.ok) throw new Error("Server Error");

        const result = await response.json();
        document.querySelector(".message:last-child").remove();
        appendMessage("NEO AI", result[0]?.generated_text || "⚠️ No response from AI.");
    } catch (error) {
        document.querySelector(".message:last-child").remove();
        appendMessage("NEO AI", "❌ Error fetching response.");
        console.error("API Error:", error);
    }
}

function appendMessage(sender, text) {
    let chatBox = document.getElementById("chat-box");
    let messageDiv = document.createElement("div");
    messageDiv.classList.add("message");
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
                       }
