async function sendMessage() {
  const userInput = document.getElementById("userInput").value;
  if (!userInput) return;

  // Add user's message to the chat history
  addMessageToHistory("You", userInput);

  // Send the message to the API
  try {
    const response = await fetch("https://your-backend-api-url.com/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userInput }),
    });

    const data = await response.json();
    const botResponse = data.response || "No response from server";

    // Add the API's response to the chat history
    addMessageToHistory("Bot", botResponse);
  } catch (error) {
    addMessageToHistory("Bot", "Error: Unable to connect to server");
  }

  // Clear the input field
  document.getElementById("userInput").value = "";
}

function addMessageToHistory(sender, message) {
  const chatHistory = document.getElementById("chatHistory");
  const messageElement = document.createElement("div");
  messageElement.className = "message";
  messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatHistory.appendChild(messageElement);

  // Scroll to the bottom of chat history
  chatHistory.scrollTop = chatHistory.scrollHeight;
}
