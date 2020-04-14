/***
 * Extension.js
 */

/**
 * If the chat input is empty we should set the send button to disabled
 * @param input
 */
inputEmpty = (input) => {
    let sendBtn = document.getElementById('sendBtn');
    input.value === '' ? sendBtn.disabled = true : sendBtn.disabled = false;
};