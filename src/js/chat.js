"use strict";
const socket = io();
const sendButton = document.querySelector(".send-button");
const chatInput = document.querySelector(".chatting-input");
const chatList = document.querySelector(".chatting-list");
const nickname = document.querySelector("#nickname");
const displayContainer = document.querySelector(".display-container");

chatInput.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    send();
  }
});

sendButton.addEventListener("click", send);
function send() {
  const param = {
    name: nickname.value,
    msg: chatInput.value,
  };
  socket.emit("chatting", param);
  chatInput.value = "";
  chatInput.focus();
  console.log();
  displayContainer.scrollTo(0, displayContainer.scrollHeight);
}

socket.on("chatting", (data) => {
  const { name, msg, time } = data;
  const item = new LiModel(name, msg, time);
  item.makeLi();
});

function LiModel(name, msg, time) {
  this.name = name;
  this.msg = msg;
  this.time = time;

  this.makeLi = () => {
    const li = document.createElement("li");
    li.classList.add(nickname.value === this.name ? "sent" : "received");
    // const profileSpan = document.createElement("span");
    // const messageSpan = document.createElement('span')
    // const timeSpan = document.createElement("span");

    const dom = `<span class="profile">
              <span class="user">${this.name}</span>
              <img
                src="https://placeimg.com/200/60/any"
                alt="any"
                class="image"
              />
            </span>
            <span class="message">${this.msg}</span>
            <span class="time">${this.time}</span>`;
    li.innerHTML = dom;
    chatList.appendChild(li);
  };
}