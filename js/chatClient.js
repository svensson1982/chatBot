"use strict";

export default class ChatClient {

    constructor(nickName, chatMsg, sendBtn, chatWall, socket) {
        this.socket = socket;
        this.chatMsg = chatMsg;
        this.sendBtn = sendBtn;
        this.chatWall = chatWall;
        this.nickName = nickName;
        this.eventSetup();
        this.receiveMessage();
    }

    /**
     * Setup events enterKey/click/esc
     */
    eventSetup() {
        this.chatMsg.addEventListener('keydown', (key) => {
            key = key.which || key.keyCode;
            if (key === 13) {
                this.sendMessage();
            }
        });

        this.sendBtn.onclick = () => {
            this.sendMessage();
        };

        this.chatMsg.addEventListener('keyup', (key) => {
            key = key.which || key.keyCode;
            if (key === 27) {
                this.chatMsg.value = '';
            }
        });
    }

    /**
     * Send/emit message
     */
    sendMessage() {
        if (!this.nullOrWhiteSpace(this.chatMsg.value)) {
            this.socket.emit('message', {message: this.chatMsg.value, user: this.nickName.value});
            this.chatWall.innerHTML += `<div class="chat-bubble-user"><p>${this.chatMsg.value}</p></div>`;
            this.chatMsg.value = '';
            this.scrollToBottom();
            this.sendBtn.disabled = true
        }
    }

    /**
     * Listen on message
     */
    receiveMessage() {
        this.socket.on('message', (msg) => {
            if (msg.user !== this.nickName.value) {
                this.chatWall.innerHTML += `<div class="chat-bubble-system"><small>${msg.user}</small><p>${msg.message}</p></div>`;
                this.scrollToBottom();
            }
        });
    }

    /**
     * Scroll to the last element in #chatWall
     */
    scrollToBottom() {
        setTimeout(() => {
            let element = document.getElementById('chatWall');
            element.lastElementChild.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
        }, 400);
    }


    /**
     * If the given message is null or whiteSpaces
     * @param msg
     * @returns {boolean}
     */
    nullOrWhiteSpace(msg) {
        return (!msg || msg.length === 0 || /^\s*$/.test(msg));
    }

}
