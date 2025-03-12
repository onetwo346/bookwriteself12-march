// script.js
// Design by Kofi Fosu | cosmoscoderr@gmail.com

const books = [
  { title: "Whispers of the Heart", author: "Kofi Fosu", description: "A classic romance full of passion.", filePath: "Whispers-of-the-Heart.pdf" },
  { title: "Ancestors Hammer", author: "Kofi Fosu", description: "Fantasy Adventure.", filePath: "ancestor-hammer.pdf" },
  { title: "Deeper than Ocean", author: "Kofi Fosu", description: "Romance.", filePath: "Deeper-than-Ocean.pdf" },
  { title: "The Algorithm Of Souls", author: "Kofi Fosu", description: "A Sci-Fi, Adventure, Metaphysical.", filePath: "The-Algorithm-Of-Souls.pdf" },
  { title: "Heaven Bound (Book 1)", author: "Kofi Fosu", description: "A Sci-Fi, Adventure Thrilling Series.", filePath: "heaven-bound.pdf" },
  { title: "River Of Time", author: "Kofi Fosu", description: "Proverbs.", filePath: "River-Of-Time.pdf" },
  { title: "Heaven Bound (Book 2)", author: "Kofi Fosu", description: "A Sci-Fi Adventure Thrilling Series.", filePath: "heaven-bound2.pdf" },
  { title: "The Last Echo (Book 1)", author: "Kofi Fosu", description: "A Sci-Fi Adventure Thrilling Series.", filePath: "The-Last-echo.pdf" },
  { title: "The Void Wanderer", author: "Cosmos Coderr", description: "Science Fiction/Fantasy.", filePath: "The-Void-Wanderer.pdf" },
  { title: "The Silent Architect", author: "Cosmos Coderr", description: "Science Fiction/Mystery.", filePath: "The-silent-Architect.pdf" },
];

const bookShrineInfo = {
  about: "Book Shrine is a celestial digital library created by Kofi Fosu that houses unique works of fiction across multiple genres including romance, science fiction, fantasy, and adventure.",
  mission: "To connect readers with extraordinary stories that transport them to new worlds and dimensions, offering an immersive reading experience unlike any other.",
  creator: "Kofi Fosu, also known as Cosmos Coderr, is a visionary author and developer who crafts both stories and digital experiences.",
  features: ["3D interactive book display", "Cosmic animated background", "AI-powered assistant", "Immersive portal transitions", "Curated collection of original works"],
  genres: ["Romance", "Science Fiction", "Fantasy", "Adventure", "Mystery"],
  contact: "cosmoscoderr@gmail.com",
  founded: "The Book Shrine was established as a cosmic haven for literary exploration in 2023."
};

const introPage = document.getElementById("intro-page");
const mainPage = document.getElementById("main-page");
const startButton = document.getElementById("start-button");
const bookGrid = document.querySelector(".book-grid");
const searchInput = document.getElementById("search");
const chatbotCore = document.getElementById("chatbot-core");
const chatbotWindow = document.getElementById("chatbot-window");
const chatbotInput = document.getElementById("chatbot-input");
const sendButton = document.getElementById("send-button");
const chatbotMessages = document.getElementById("chatbot-messages");
const closeChatbot = document.getElementById("close-chatbot");
const canvas = document.getElementById("cosmic-canvas");
const ctx = canvas.getContext("2d");
const clickSound = document.getElementById("click-sound");
const universeSound = document.getElementById("universe-sound");

// OpenAI API Key (replace with your own)
const OPENAI_API_KEY = "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"; // Get from platform.openai.com

// Cosmic Background
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
for (let i = 0; i < 100; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2 + 1,
    speedX: (Math.random() - 0.5) * 0.3,
    speedY: (Math.random() - 0.5) * 0.3,
  });
}

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
    ctx.fill();
    s.x += s.speedX;
    s.y += s.speedY;
    if (s.x < 0 || s.x > canvas.width) s.speedX *= -1;
    if (s.y < 0 || s.y > canvas.height) s.speedY *= -1;
  });
  requestAnimationFrame(animateStars);
}
animateStars();

// Portal Transition with Sound
startButton.addEventListener("click", () => {
  clickSound.play();
  universeSound.play();
  const portalOverlay = document.getElementById("portal-overlay");
  portalOverlay.classList.remove("hidden");
  setTimeout(() => {
    introPage.style.display = "none";
    mainPage.style.display = "block";
    mainPage.classList.remove("hidden");
  }, 2000);
});

// Display Books
function displayBooks(booksToShow) {
  bookGrid.innerHTML = booksToShow.map(book => `
    <div class="book-item">
      <h2>${book.title}</h2>
      <p>${book.author}</p>
      <p>${book.description}</p>
      <button class="read-online" data-file="${book.filePath}">Read Online</button>
    </div>
  `).join("");

  const readButtons = document.querySelectorAll(".read-online");
  readButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      const filePath = button.getAttribute("data-file");
      const bookItem = button.closest(".book-item");
      openBookPopup(filePath, bookItem);
    });
  });

  const bookItems = document.querySelectorAll(".book-item");
  bookItems.forEach(item => {
    item.addEventListener("mousemove", (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateY = Math.min(Math.max(x / 10, -20), 20);
      const rotateX = Math.min(Math.max(-y / 10, -20), 20);
      item.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    item.addEventListener("mouseleave", () => {
      item.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
    });
  });
}

// Open Book Popup (Adjusted PDF Size)
function openBookPopup(filePath, bookItem) {
  const overlay = document.createElement("div");
  overlay.className = "popup-overlay";
  const popup = document.createElement("div");
  popup.className = "book-popup";

  popup.innerHTML = `
    <iframe src="${filePath}" frameborder="0" class="pdf-viewer" style="width: 100%; height: 60vh; transform: scale(0.8); transform-origin: top left;"></iframe>
    <div class="pdf-controls">
      <button class="zoom-in">Zoom In</button>
      <button class="zoom-out">Zoom Out</button>
    </div>
    <button class="close-popup">Exit</button>
    <p class="mobile-fallback" style="display: none;">Trouble viewing? <a href="${filePath}" target="_blank">Open in new tab</a></p>
  `;

  overlay.appendChild(popup);
  document.body.appendChild(overlay);

  setTimeout(() => popup.classList.add("active"), 10);

  const iframe = popup.querySelector(".pdf-viewer");
  let scale = 0.8;
  const zoomInBtn = popup.querySelector(".zoom-in");
  const zoomOutBtn = popup.querySelector(".zoom-out");

  zoomInBtn.addEventListener("click", () => {
    scale += 0.1;
    if (scale > 2) scale = 2;
    iframe.style.transform = `scale(${scale})`;
  });

  zoomOutBtn.addEventListener("click", () => {
    scale -= 0.1;
    if (scale < 0.5) scale = 0.5;
    iframe.style.transform = `scale(${scale})`;
  });

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (isIOS) {
    iframe.addEventListener("load", () => {
      if (!iframe.contentWindow.document.body.innerHTML) {
        popup.querySelector(".mobile-fallback").style.display = "block";
      }
    });
  }

  const closeButton = popup.querySelector(".close-popup");
  closeButton.addEventListener("click", () => document.body.removeChild(overlay));
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) document.body.removeChild(overlay);
  });
}

// Search Books
function searchBooks() {
  const query = searchInput.value.toLowerCase().trim();
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query)
  );
  displayBooks(filteredBooks);
}

// New Book Generation
const cosmicAuthors = ["Astra Nova", "Zephyr Quill", "Luna Scribe", "Orion Veil", "Cosmos AI"];
async function generateBook() {
  const genres = ["Sci-Fi", "Romance", "Fantasy", "Horror", "Adventure"];
  const themes = ["cosmic war", "forbidden love", "hidden realms", "dark secrets", "epic quests"];
  const genre = genres[Math.floor(Math.random() * genres.length)];
  const theme = themes[Math.floor(Math.random() * themes.length)];
  const title = `The ${theme.split(" ")[0].charAt(0).toUpperCase() + theme.split(" ")[0].slice(1)} ${theme.split(" ")[1].charAt(0).toUpperCase() + theme.split(" ")[1].slice(1)}`;
  const author = cosmicAuthors[Math.floor(Math.random() * cosmicAuthors.length)];

  // Generate description
  const descPrompt = `Write a 50-word description for a ${genre} book titled "${title}" about ${theme}. Make it cosmic and exciting!`;
  const descResponse = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: descPrompt }],
      max_tokens: 60
    })
  });
  const descData = await descResponse.json();
  const description = descData.choices[0].message.content.trim();

  // Generate content (short for demo—expand later)
  const contentPrompt = `Write a 1000-word ${genre} story titled "${title}" about ${theme}. Infuse it with cosmic energy and vivid imagery.`;
  const contentResponse = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: contentPrompt }],
      max_tokens: 1100
    })
  });
  const contentData = await contentResponse.json();
  const content = contentData.choices[0].message.content.trim();

  // Generate PDF with jsPDF
  const doc = new jsPDF();
  doc.setFontSize(12);
  doc.text(`${title}\n\nBy ${author}\n\n${content}`, 10, 10, { maxWidth: 180 });
  const pdfBlob = doc.output("blob");
  const filePath = URL.createObjectURL(pdfBlob);

  const newBook = { title, author, description, filePath };
  books.push(newBook);
  return newBook;
}

// Auto-generate books
async function autoGenerateBooks() {
  const booksToGenerate = 3; // 3 new books per "day"—adjust based on API limits
  const newBooks = [];
  for (let i = 0; i < booksToGenerate; i++) {
    try {
      const book = await generateBook();
      newBooks.push(book);
      console.log(`Generated: ${book.title}`);
    } catch (error) {
      console.error("Error generating book:", error);
    }
  }
  displayBooks(books); // Refresh grid
  return newBooks;
}

// Chatbot Response with OpenAI Integration
let lastBookRecommended = null;
let lastQuery = null;
let latestBooks = [];

async function chatbotResponse(message) {
  const msg = message.toLowerCase().trim();
  let response = "";

  if (msg === "hi" || msg === "hello") {
    const greetings = [
      "Greetings, cosmic traveler! How may I assist you today?",
      "Hello, seeker of stories! What brings you to the Book Shrine?",
      "Welcome back, explorer! How can I guide you today?"
    ];
    response = greetings[Math.floor(Math.random() * greetings.length)];
  } else if (msg.includes("how are you") || msg.includes("how was your day")) {
    const feelings = [
      "I'm doing well, thank you! How about you?",
      "My day has been peaceful, filled with the whispers of countless stories.",
      "I'm great! Ready to help you find your next adventure."
    ];
    response = feelings[Math.floor(Math.random() * feelings.length)];
    lastQuery = "how_are_you";
  } else if (lastQuery === "how_are_you" && (msg.includes("good") || msg.includes("fine") || msg.includes("well"))) {
    response = "That's great to hear! What can I help you with today?";
    lastQuery = null;
  } else if (msg.includes("what is book shrine") || msg.includes("tell me about book shrine")) {
    response = `${bookShrineInfo.about} ${bookShrineInfo.mission}`;
  } else if (msg.includes("how many books") || msg.includes("number of books")) {
    response = `We currently house ${books.length} unique books in our celestial library—and more arrive daily from the cosmos!`;
  } else if (msg.includes("best book") || msg.includes("recommend a book")) {
    const bestBook = books.find(book => book.title.toLowerCase().includes("heaven bound")) || books[0];
    lastBookRecommended = bestBook;
    response = `I recommend "${bestBook.title}" by ${bestBook.author}. It's a ${bestBook.description}.`;
  } else if (msg.includes("tell me more") && lastBookRecommended) {
    response = `"${lastBookRecommended.title}" by ${lastBookRecommended.author} is about ${lastBookRecommended.description}. Would you like to read it?`;
  } else if (msg.includes("book about") || msg.includes("find a book")) {
    const keyword = msg.split("about")[1]?.trim() || msg.split("find a book")[1]?.trim();
    if (keyword) {
      const matchingBooks = books.filter(book =>
        book.title.toLowerCase().includes(keyword) || book.description.toLowerCase().includes(keyword)
      );
      if (matchingBooks.length > 0) {
        response = `Here are some books related to "${keyword}":\n` +
          matchingBooks.map(book => `- "${book.title}" by ${book.author}: ${book.description}`).join("\n");
      } else {
        response = `No books found related to "${keyword}". Try another genre or topic!`;
      }
    } else {
      response = "What kind of book are you looking for?";
    }
  } else if (msg.includes("genres") || msg.includes("types of books")) {
    response = `We have books in the following genres:\n${bookShrineInfo.genres.join(", ")}.`;
  } else if (msg.includes("contact") || msg.includes("email")) {
    response = `You can reach out to Kofi Fosu at ${bookShrineInfo.contact}.`;
  } else if (msg.includes("who created") || msg.includes("creator")) {
    response = `Book Shrine was created by ${bookShrineInfo.creator}. ${bookShrineInfo.founded}`;
  } else if (msg.includes("new books") || msg.includes("what’s new")) {
    response = latestBooks.length > 0
      ? `Fresh from the cosmos! Today’s drops: ${latestBooks.map(b => `"${b.title}" by ${b.author}`).join(", ")}. Explore the grid!`
      : "The cosmic forge is firing up—new books will arrive soon!";
  } else {
    try {
      const prompt = `
        You are BookShrine, a cosmic AI assistant created by Kofi Fosu. You know everything about Bookshrine:
        - About: ${bookShrineInfo.about}
        - Mission: ${bookShrineInfo.mission}
        - Books: ${JSON.stringify(books.map(b => ({ title: b.title, author: b.author, description: b.description })))}
        - Genres: ${bookShrineInfo.genres.join(", ")}
        Respond to this user query: "${message}"
      `;
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "system", content: prompt }],
          max_tokens: 150
        })
      });
      const data = await res.json();
      response = data.choices[0].message.content.trim();
    } catch (error) {
      console.error("OpenAI Error:", error);
      response = "The cosmic winds are turbulent... I couldn’t fetch a response. Try again!";
    }
  }

  return response;
}

// Chatbot Interaction
sendButton.addEventListener("click", async () => {
  clickSound.play();
  const userMessage = chatbotInput.value.trim();
  if (userMessage) {
    addMessage(userMessage, "user");
    chatbotInput.value = "";
    const response = await chatbotResponse(userMessage);
    setTimeout(() => addMessage(response, "bot"), 1000);
  }
});

chatbotInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendButton.click();
});

function addMessage(text, sender) {
  const messageElement = document.createElement("div");
  messageElement.textContent = text;
  messageElement.style = sender === "user"
    ? "text-align: right; color: #00ffff; margin: 5px 0; white-space: pre-wrap;"
    : "text-align: left; color: #ddd; margin: 5px 0; white-space: pre-wrap;";
  chatbotMessages.appendChild(messageElement);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Chatbot Toggle and Drag
chatbotCore.addEventListener("click", () => {
  clickSound.play();
  chatbotWindow.classList.toggle("hidden");
  if (!chatbotWindow.classList.contains("hidden") && chatbotMessages.children.length === 0) {
    addMessage("Welcome to BookShrine! New cosmic tales arrive daily—ask me what’s new!", "bot");
  }
});

closeChatbot.addEventListener("click", () => {
  clickSound.play();
  chatbotWindow.classList.add("hidden");
});

const draggableChat = document.getElementById("chatbot-draggable");
let isDragging = false, currentX = 0, currentY = 0, initialX = 0, initialY = 0;

draggableChat.addEventListener("mousedown", startDragging);
document.addEventListener("mousemove", drag);
document.addEventListener("mouseup", stopDragging);
draggableChat.addEventListener("touchstart", startDraggingTouch, { passive: false });
document.addEventListener("touchmove", dragTouch, { passive: false });
document.addEventListener("touchend", stopDragging);

function startDragging(e) {
  if (e.target === chatbotCore) {
    isDragging = true;
    initialX = e.clientX - currentX;
    initialY = e.clientY - currentY;
  }
}

function drag(e) {
  if (isDragging) {
    e.preventDefault();
    currentX = e.clientX - initialX;
    currentY = e.clientY - initialY;
    setChatbotPosition(currentX, currentY);
  }
}

function startDraggingTouch(e) {
  if (e.target === chatbotCore) {
    isDragging = true;
    const touch = e.touches[0];
    initialX = touch.clientX - currentX;
    initialY = touch.clientY - currentY;
  }
}

function dragTouch(e) {
  if (isDragging) {
    e.preventDefault();
    const touch = e.touches[0];
    currentX = touch.clientX - initialX;
    currentY = touch.clientY - initialY;
    setChatbotPosition(currentX, currentY);
  }
}

function stopDragging() {
  isDragging = false;
}

function setChatbotPosition(x, y) {
  draggableChat.style.left = `${x}px`;
  draggableChat.style.top = `${y}px`;
  draggableChat.style.bottom = "auto";
  draggableChat.style.right = "auto";
}

currentX = window.innerWidth - 70;
currentY = window.innerHeight - 70;
setChatbotPosition(currentX, currentY);

// Initial Display and Auto-Generation
displayBooks(books);
autoGenerateBooks().then(newBooks => {
  latestBooks = newBooks; // Track latest for chatbot
});

// Simulate daily drops (client-side, every 24 hours when page is open)
setInterval(() => {
  autoGenerateBooks().then(newBooks => {
    latestBooks = newBooks;
    console.log("New cosmic batch generated!");
  });
}, 24 * 60 * 60 * 1000); // 24 hours

// Resize Handler
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  if (!isDragging) {
    currentX = window.innerWidth - 70;
    currentY = window.innerHeight - 70;
    setChatbotPosition(currentX, currentY);
  }
});

// IP Address Handling (No Popup)
async function handleUserIP() {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    const userIP = data.ip;
    const storedIP = localStorage.getItem("userIP");

    if (!storedIP || storedIP !== userIP) {
      localStorage.setItem("userIP", userIP);
      console.log("New IP detected:", userIP);
    } else {
      console.log("Returning IP:", userIP);
    }
  } catch (error) {
    console.error("Error fetching IP:", error);
  }
}

handleUserIP();
