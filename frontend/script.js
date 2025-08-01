// async function sendMessage() {
//     const userInputField = document.getElementById('user-input');
//     const customerIdField = document.getElementById('customer-id');
//     const chatBox = document.getElementById('chat-box');

//     const userInput = userInputField.value.trim();
//     const customerId = customerIdField.value.trim();

//     // Validate input
//     if (!userInput || !customerId) {
//         chatBox.innerHTML += `<div><b>Bot:</b> Please enter both a message and a customer ID.</div>`;
//         return;
//     }

//     // Display user's message
//     chatBox.innerHTML += `<div><b>You:</b> ${userInput}</div>`;
//     chatBox.scrollTop = chatBox.scrollHeight;

//     // Disable input while waiting for response
//     userInputField.disabled = true;
//     customerIdField.disabled = true;

//     try {
//         const response = await fetch('/chat', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ message: userInput, customer_id: customerId })
//         });

//         if (!response.ok) throw new Error("Server error");

//         const data = await response.json();
//         chatBox.innerHTML += `<div><b>Bot:</b> ${data.response}</div>`;
//     } catch (err) {
//         chatBox.innerHTML += `<div><b>Bot:</b> Oops! Something went wrong. Please try again later.</div>`;
//         console.error("Fetch error:", err);
//     } finally {
//         // Re-enable input and clear user input field
//         userInputField.disabled = false;
//         customerIdField.disabled = false;
//         userInputField.value = '';
//         chatBox.scrollTop = chatBox.scrollHeight;
//     }
// }




function startChat() {
    const customerId = document.getElementById('customerIdInput').value.trim();

    if (!customerId) {
        alert('Please enter your Customer ID');
        return;
    }

    // Hide login form and show chat
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('customerInfo').classList.add('show');
    document.getElementById('chatContainer').classList.add('show');

    // Update customer info
    document.getElementById('displayCustomerId').textContent = customerId;
    document.getElementById('customerAvatar').textContent = customerId.substring(0, 2).toUpperCase();
    document.getElementById('customerName').textContent = `Customer ${customerId}`;

    // Focus on message input
    setTimeout(() => {
        document.getElementById('messageInput').focus();
    }, 500);
}

function sendMessage(event) {
    event.preventDefault();

    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();

    if (!message) return;

    // Add user message
    addMessage(message, 'user');
    messageInput.value = '';

    // Show typing indicator
    showTypingIndicator();

    // Send message to backend and display response
    fetch('/chat', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            message: message,
            customer_id: document.getElementById('displayCustomerId').textContent
        })
    })
    .then(response => response.json())
    .then(data => {
        hideTypingIndicator();
        addMessage(data.response, 'bot');
    })
    .catch(error => {
        hideTypingIndicator();
        addMessage("Sorry, there was an error contacting the server.", 'bot');
    });
}

function addMessage(text, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;

    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = 'message-bubble';
    bubbleDiv.textContent = text;

    messageDiv.appendChild(bubbleDiv);
    chatMessages.appendChild(messageDiv);

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
    document.getElementById('typingIndicator').classList.add('show');
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTypingIndicator() {
    document.getElementById('typingIndicator').classList.remove('show');
}

// Handle Enter key in customer ID input
document.getElementById('customerIdInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        startChat();
    }
});

// Auto-resize chat messages on window resize
window.addEventListener('resize', function() {
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});





