const texts = [
    "The quick brown fox jumps over the lazy dog. This classic pangram contains every letter of the alphabet and has been used by typists for years.",
    "Learning to type efficiently is a valuable skill in our digital age. Practice regularly and focus on accuracy before speed to develop proper muscle memory.",
    "Technology continues to shape our world in unprecedented ways. The ability to communicate quickly and accurately through typing is more important than ever.",
    "Success is not final, failure is not fatal. It is the courage to continue that counts. Keep practicing and improving your typing skills every day.",
    "Programming requires attention to detail and accurate typing. Every character and space matters when writing code, making typing precision essential.",
    "The best way to predict the future is to create it. Start with small steps, like improving your typing speed, and work your way up to bigger goals.",
    "In the world of digital communication, typing has become as essential as speaking. Master this skill, and you'll find yourself more productive in countless ways.",
    "The journey of a thousand miles begins with a single keystroke. Practice makes perfect, and every typing session brings you closer to mastery.",
    "Artificial intelligence and machine learning are revolutionizing the tech industry. Stay ahead of the curve by mastering fundamental skills like touch typing.",
    "Great web developers combine creativity with technical precision. Every semicolon, bracket, and parenthesis must be typed accurately to create functional code.",
    "The art of typing quickly and accurately is a valuable skill in today's digital world. With practice and dedication, anyone can improve their typing speed and efficiency.",
    "JavaScript, Python, and other programming languages demand accuracy in syntax. Good typing skills can significantly reduce coding errors and debugging time.",
    "Cloud computing has transformed how we store and process data. Understanding modern technology starts with mastering basic computer interaction skills.",
    "User experience design focuses on creating intuitive interfaces. The ability to quickly implement and test different solutions requires efficient typing skills.",
    "Mobile development combines creative design with precise coding. Each character matters when building responsive and user-friendly applications.",
    "Data structures and algorithms form the foundation of computer science. Practice typing to implement these concepts more efficiently in your code.",
    "Version control systems like Git help manage code changes. Clear commit messages and accurate commands require both typing speed and precision.",
    "Responsive web design ensures sites work on all devices. Testing and implementing media queries requires attention to detail and accurate typing.",
    "Cybersecurity professionals must stay vigilant against threats. Quick response times and accurate command entry can make all the difference in critical situations.",
    "Full-stack development encompasses both front-end and back-end skills. Mastering typing helps developers switch between different coding contexts efficiently."
];

let startTime, endTime;
let isTyping = false;
let currentText = "";
const inputBox = document.getElementById("input-box");
const resultDisplay = document.getElementById("result");
const textDisplay = document.getElementById("text-display");

function getRandomText() {
    return texts[Math.floor(Math.random() * texts.length)];
}

function updateText() {
    currentText = getRandomText();
    textDisplay.innerText = currentText;
}

function startTyping() {
    if (!isTyping) {
        isTyping = true;
        startTime = new Date();
    }
}

function calculateAccuracy(original, typed) {
    if (typed.length === 0) return 0;
    
    let correctChars = 0;
    const minLength = Math.min(original.length, typed.length);
    
    // Check character by character
    for (let i = 0; i < minLength; i++) {
        if (typed[i] === original[i]) correctChars++;
    }
    
    // Penalize for length differences
    const lengthDiff = Math.abs(original.length - typed.length);
    const totalLength = Math.max(original.length, typed.length);
    
    return Math.round((correctChars / totalLength) * 100);
}

function submitTest() {
    if (!isTyping) return;
    
    endTime = new Date();
    let typedText = inputBox.value.trim();
    let timeTaken = (endTime - startTime) / 1000; // in seconds
    let wordCount = currentText.split(" ").length;
    let speed = Math.round((wordCount / timeTaken) * 60);
    let accuracy = calculateAccuracy(currentText, typedText);
    
    // Disable input after submission
    inputBox.disabled = true;
    
    resultDisplay.innerHTML = `
        <div class="result-details">
            <p>Speed: ${speed} WPM</p>
            <p>Accuracy: ${accuracy}%</p>
            <p>Time: ${timeTaken.toFixed(1)} seconds</p>
        </div>`;
}

// Remove the automatic result calculation from input event
inputBox.addEventListener("input", () => {
    startTyping();
});

function resetTest() {
    inputBox.value = "";
    inputBox.disabled = false;  // Re-enable the textarea
    resultDisplay.innerHTML = "";
    isTyping = false;
    updateText(); // Get new random text
}

// Initialize with random text when page loads
window.onload = updateText;
