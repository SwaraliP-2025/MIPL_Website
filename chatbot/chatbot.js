const toggleBtn = document.getElementById("chatbot-toggle");
const chatbot = document.getElementById("chatbot");
const closeBtn = document.getElementById("chatbot-close");
const sendBtn = document.getElementById("chatbot-send");
const input = document.getElementById("chatbot-input");
const messages = document.getElementById("chatbot-messages");

toggleBtn.onclick = () => {
  chatbot.style.display = "flex";
};

closeBtn.onclick = () => {
  chatbot.style.display = "none";
};

sendBtn.onclick = sendMessage;

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  const reply = getAnswer(text);
  setTimeout(() => addMessage(reply, "bot"), 400);
}

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = sender === "user" ? "user-msg" : "bot-msg";
  div.textContent = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function getAnswer(question) {
  const q = question.toLowerCase();

  if (q.includes("about")) return knowledgeBase.about;
  if (q.includes("service")) return knowledgeBase.services.join(", ");
  if (q.includes("parking")) return knowledgeBase.parking;
  if (q.includes("security")) return knowledgeBase.security;
  if (q.includes("contact")) return knowledgeBase.contact;

  return knowledgeBase.fallback;
}
