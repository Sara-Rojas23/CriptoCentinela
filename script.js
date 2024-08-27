document.getElementById('encryptBtn').addEventListener('click', function() {
    let inputText = document.getElementById('inputText').value.trim().toLowerCase();
    if (validateInput(inputText)) {
        let encryptedText = btoa(inputText); // Codifica el texto en Base64
        document.getElementById('outputText').value = encryptedText;
        addToHistory('Encriptado', inputText, encryptedText);
    }
});

document.getElementById('decryptBtn').addEventListener('click', function() {
    let inputText = document.getElementById('inputText').value.trim();
    let decryptedText;
    if (validateInput(inputText, true)) {
        try {
            decryptedText = atob(inputText); // Decodifica el texto de Base64
            document.getElementById('outputText').value = decryptedText;
            addToHistory('Desencriptado', inputText, decryptedText);
        } catch (e) {
            document.getElementById('outputText').value = "Texto encriptado no válido.";
        }
    }
});

document.getElementById('copyBtn').addEventListener('click', function() {
    let outputText = document.getElementById('outputText');
    outputText.select();
    document.execCommand('copy');
});

function validateInput(text, isDecryption = false) {
    let errorMessage = '';
    if (!text) {
        errorMessage = 'El campo no puede estar vacío.';
    } else if (!isDecryption && !/^[a-z\s]+$/.test(text)) {
        errorMessage = 'Solo se permiten letras y espacios.';
    }

    const errorElement = document.querySelector('.error-message');
    if (errorMessage) {
        if (!errorElement) {
            const newErrorElement = document.createElement('div');
            newErrorElement.classList.add('error-message');
            newErrorElement.textContent = errorMessage;
            document.querySelector('.input-section').appendChild(newErrorElement);
        } else {
            errorElement.textContent = errorMessage;
        }
        return false;
    }

    if (errorElement) {
        errorElement.remove();
    }
    return true;
}

function addToHistory(type, originalText, resultText) {
    let historyList = document.getElementById('historyList');
    let listItem = document.createElement('li');
    listItem.textContent = `${type}: ${originalText} -> ${resultText}`;
    historyList.appendChild(listItem);
}
