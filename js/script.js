let activeTab = 0;

function switchTab(tabIndex) {
    activeTab = tabIndex;
    document.querySelectorAll(".tab").forEach((tab, index) => {
        tab.classList.remove("active-tab");
        if (index === activeTab) {
            tab.classList.add("active-tab");
        }
    });

    document.querySelectorAll(".content").forEach((content, index) => {
        content.classList.remove("active-content");
        if (index === activeTab) {
            content.classList.add("active-content");
        }
    });
}

function showLoading() {
    document.querySelector(".loading").style.display = "block";
}

function hideLoading() {
    document.querySelector(".loading").style.display = "none";
}

function copyToClipboard(elementId) {
    const textToCopy = document.getElementById(elementId).innerText;
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = textToCopy;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand("copy");
    document.body.removeChild(tempTextArea);
    showCopyAlert();
}

function showCopyAlert() {
    const alertBox = document.createElement("div");
    alertBox.innerText = "Copied!";
    alertBox.style.position = "fixed";
    alertBox.style.bottom = "20px";
    alertBox.style.right = "20px";
    alertBox.style.backgroundColor = "#4caf50";
    alertBox.style.color = "white";
    alertBox.style.padding = "10px";
    alertBox.style.borderRadius = "5px";
    alertBox.style.zIndex = "1000";
    alertBox.style.transition = "opacity 0.5s ease-in-out";
    alertBox.style.opacity = "1";
 document.body.appendChild(alertBox);
    setTimeout(() => {
        alertBox.style.opacity = "0";
        setTimeout(() => {
            document.body.removeChild(alertBox);
        }, 500);
    }, 2000);
}

async function checkGrammar() {
    showLoading();
    const inputText = document.getElementById("grammarInput").value;
    const response = await fetch("/check-grammar", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ text: inputText }),
    });
    hideLoading();
    if (response.ok) {
        const data = await response.json();
        document.getElementById("grammarOutput").innerText = data.corrected_text || "Error";
    } else {
        document.getElementById("grammarOutput").innerText = "An error occurred.";
    }
}