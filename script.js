document.addEventListener("DOMContentLoaded", function () {
    const projectId = "bef1944a-9499-4d8f-988f-ad3314037515"; // Your ChatEngine Project ID
    const privateKey = "a6b7fe8e-1d85-45e3-9424-8e2f129a9aea"; // Your ChatEngine Private Key
    let userName = ""; // Initialize variable to hold username

    const chatBox = document.getElementById('chat-box');
    const statusMessage = document.getElementById('status-message');

    // Initialize ChatEngine
    const chatEngine = new ChatEngine.ChatEngine({
        publishKey: "YOUR_PUBLISH_KEY", // Replace with your Publish Key
        subscribeKey: "YOUR_SUBSCRIBE_KEY", // Replace with your Subscribe Key
    });

    // Show terms modal
    $('#terms-modal').modal('show');

    // Agree to terms
    document.getElementById('agree-btn').onclick = function () {
        $('#terms-modal').modal('hide');
        document.getElementById('chat-room').classList.remove('d-none');
        showMessage("You have agreed to the terms.", "success");
    };

    // Toggle dark mode
    document.getElementById('theme-toggle').onclick = function () {
        document.body.classList.toggle('dark-mode');
    };

    // Join room
    document.getElementById('join-room').onclick = function () {
        const roomId = document.getElementById('room-id').value;
        userName = document.getElementById('username').value;

        if (roomId && userName) {
            chatEngine.connect(userName, privateKey, { username: userName });

            chatEngine.onChat(roomId, (chat) => {
                chat.onMessage((message) => {
                    chatBox.innerHTML += `<div><strong>${message.sender.username}</strong>: ${message.text}</div>`;
                    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
                });

                showMessage("Joined successfully!", "success");
            });
        }
    };

    // Send message
    document.getElementById('send-message').onclick = function () {
        const message = document.getElementById('message-input').value;
        const roomId = document.getElementById('room-id').value;

        if (message) {
            chatEngine.emitEvent('chat', { text: message });
            document.getElementById('message-input').value = ''; // Clear input
        }
    };

    // Disconnect button
    document.getElementById('disconnect-btn').onclick = function () {
        chatEngine.disconnect();
        showMessage("Disconnected successfully!", "warning");
    };

    // Show messages like joined, disconnected, etc.
    function showMessage(message, type) {
        statusMessage.textContent = message;
        statusMessage.classList.remove('d-none', 'alert-success', 'alert-warning', 'alert-info');
        statusMessage.classList.add(`alert-${type}`);
        setTimeout(() => {
            statusMessage.classList.add('d-none');
        }, 30000);
    }
});
