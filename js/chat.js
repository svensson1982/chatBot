"use strict";

import ChatClient from './chatClient.js';

class Chat {

    constructor() {
        this.socket = io('http://35.157.80.184:8080/');
        this.chatMsg = document.getElementById('chatMsg');
        this.sendBtn = document.getElementById('sendBtn');
        this.nickName = document.getElementById('nickName');
        this.chatWall = document.getElementById('chatWall');
        this.createChat();
    }

    /**
     * Create a new client
     */
    createChat() {
        new ChatClient(this.nickName, this.chatMsg, this.sendBtn, this.chatWall, this.socket);
        console.log('start chat')
    }

}

window.onload = () => {
    new Chat();
    console.log('new chat');
};

