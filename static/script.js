document.addEventListener('DOMContentLoaded', () => {
    const dropArea = document.getElementById('drop-area');
    const fileInput = document.getElementById('file-input');
    const chooseFileBtn = document.getElementById('choose-file-btn');
    const imagePreview = document.getElementById('image-preview');
    const uploadPrompt = document.getElementById('upload-prompt');
    const resultsSection = document.getElementById('results-section');
    const resultsContainer = document.getElementById('results-container');
    const resultMessage = document.getElementById('result-message');
    const tryAnotherBtn = document.getElementById('try-another-btn');
    const tryAgainSection = document.getElementById('try-again-section');
    const tipHeaders = document.querySelectorAll('.tip-header');

    // Event listeners for drag and drop
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => dropArea.classList.add('highlight'), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => dropArea.classList.remove('highlight'), false);
    });

    dropArea.addEventListener('drop', handleDrop, false);
    
    // Event listener for file selection button
    chooseFileBtn.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', handleFiles);

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles({ target: { files: files } });
    }

    function handleFiles(e) {
        const files = e.target.files;
        if (files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                imagePreview.style.backgroundImage = `url(${event.target.result})`;
                imagePreview.style.display = 'block';
                uploadPrompt.style.display = 'none';

                // Simulate API call to Flask backend
                // In a real app, you would use fetch() here
                // Example: fetch('/predict', { method: 'POST', body: formData })
                // This is a placeholder to show the results section
                setTimeout(() => {
                    displayResults('rotten');
                }, 1000);
            };
            reader.readAsDataURL(file);
        }
    }

    function displayResults(quality) {
        let messageHTML = '';
        if (quality === 'rotten') {
            messageHTML = `
                <div class="emoji-bubble">💀 Rotting Fast...</div>
                <h3>Rotten Banana</h3>
                <p>This banana has gone bad. It's no longer safe to eat.</p>
                <div class="progress-bar-container">
                    <div class="progress-bar" style="width: 100%;"></div>
                </div>
            `;
            resultMessage.classList.add('rotten');
        }
        // Add more conditions for 'ripe' or 'unripe'
        
        resultMessage.innerHTML = messageHTML;
        resultsSection.style.display = 'block';
        tryAgainSection.style.display = 'block';
    }

    // Toggle helpful tips sections
    tipHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const tipItem = header.closest('.tip-item');
            tipItem.classList.toggle('active');
        });
    });

    // Reset the form for another prediction
    tryAnotherBtn.addEventListener('click', () => {
        imagePreview.style.display = 'none';
        uploadPrompt.style.display = 'flex';
        resultsSection.style.display = 'none';
        tryAgainSection.style.display = 'none';
        resultMessage.classList.remove('rotten');
    });
});