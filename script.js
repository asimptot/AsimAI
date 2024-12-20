function switchTab(index) {
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.content');

    tabs.forEach((tab, i) => {
        tab.classList.toggle('active-tab', i === index);
        contents[i].classList.toggle('active-content', i === index);
    });
}

function startChat() {
    const chatInput = document.getElementById('chatInput').value;
    const chatBox = document.getElementById('chatBox');
    
    if (chatInput.trim() === "") {
        alert("Please enter a message.");
        return;
    }

    chatBox.innerHTML += `<div>User: ${chatInput}</div>`;
    document.getElementById('chatInput').value = "";

    // Simulate a response from the assistant
    setTimeout(() => {
        chatBox.innerHTML += `<div>Assistant: This is a simulated response.</div>`;
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
    }, 1000);
}