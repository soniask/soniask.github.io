/*
 * This file contains code for the following tasks:
 * 1. Display the list of chat messages.
 * 2. Send a new message.
 * 3. Allow a user to edit and delete their own messages.
 * 4. Allow a user to log out.
 * 5. Redirect a user to index.html if they are not logged in.
 */

document.getElementById("logout").addEventListener("click", function (e) {
    firebase.auth().signOut();
});

var messagesList = document.getElementById("messages");

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // Connect to firebase
        var database = firebase.database();
        var messagesFull = database.ref('channels/general');

        // Clear any messages before reloading from the server to avoid repeating messages
        messagesList.innerHTML = "";

        // Make sure only last 100 messages are displayed
        var messages = messagesFull.limitToLast(100);

        // This event listener will be called for each item that has been added to the list.
        messages.on('child_added', (data) => {
            addMessage(data, user, messagesFull);
        });

        // This event listener will be called whenever an item in the list is edited.
        messages.on('child_changed', function(data) {
            changeMessage(data);
        });

        // This event listener will be called whenever an item in the list is deleted.
        // Use this to remove the HTML of the message that was deleted.
        messages.on('child_removed', function(data) {
            var id = data.key;
            var toRemove = document.getElementById(id);
            messagesList.removeChild(toRemove);
        });

    } else {
        // If the user is not logged in, redirect to index.html
        window.location.href = "index.html";
    }
});

// Use this to generate each chat message, both on initial page load and whenver someone creates a new message.
function addMessage(data, user, messagesFull){
    var id = data.key;
    var message = data.val();

    // Extract the message's key information
    var photoUrl = message.photoUrl;
    var text = message.text;
    var displayName = message.displayName;
    var timestamp = message.timestamp;
    var lastEdited = message.lastEdit;

    // Build up the message list item from the retrieved information
    var messageLi = document.createElement("li");
    messageLi.id = id;
    messageLi.classList.add("list-group-item");

    messageContent = document.createElement("div");
    messageContent.classList.add("pad");
    
    messagePhoto = document.createElement("img");
    messagePhoto.src = photoUrl;
    messagePhoto.classList.add("pull-left");

    messageText = document.createElement("pre");
    messageText.innerText = text;

    messageName = document.createElement("h2");
    messageName.innerText = displayName;

    messageDate = document.createElement("p");
    var date = new Date(timestamp);
    messageDate.innerText = "" + date.getMonth() + "-" + date.getDate() + "-" + date.getFullYear();

    messageEdited = document.createElement("p");
    if(lastEdited){
        var editDate = new Date(lastEdited);
        messageEdited.innerText = "Last edited: " + editDate.getMonth() + "-" + editDate.getDate() + "-" + editDate.getFullYear();               
    }else{
        messageEdited.classList.add("hidden");
    }

    var form = createEditingForm(messagesFull, id, messageText);
    
    messageContent.appendChild(messageName);
    messageContent.appendChild(messageText);
    messageContent.appendChild(form);
    messageContent.appendChild(messageDate);
    messageContent.appendChild(messageEdited);

    // add edit and delete buttons to messages posted by the user
    if(message.uid == user.uid){
        addUserControls(messageContent, form, messagesFull, id)
    }
    messageLi.appendChild(messagePhoto);
    messageLi.appendChild(messageContent);
    messagesList.appendChild(messageLi);
}

// Adds edit and delete buttons to the message content element
function addUserControls(messageContent, form, messagesFull, id){

    var editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.classList.add("btn");
    editButton.classList.add("btn-default");
    editButton.onclick = function(){
        form.classList.remove("hidden");
    };

    var deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.classList.add("btn");
    deleteButton.classList.add("btn-default");
    deleteButton.onclick = function(){
        var answer = confirm("Delete this message?");
        if(answer){
            messagesFull.child(id).remove();
        }
    }

    messageContent.appendChild(editButton);
    messageContent.appendChild(deleteButton);
}

// Create form for editing message and hide it
function createEditingForm(messagesFull, id){
    var form = document.createElement("form");
    var textArea = document.createElement("textarea");
    textArea.innerText = messageText.innerText;
    var saveButton = document.createElement("button");
    saveButton.type = "submit";
    saveButton.innerText = "Save";
    saveButton.classList.add("btn");
    saveButton.classList.add("btn-primary");
    form.addEventListener('submit', function(e){
        e.preventDefault();
        var editedText = textArea.value;
        messagesFull.child(id).update({text: editedText, lastEdit: new Date().getTime()});
        form.classList.add("hidden");
    });

    var cancelButton = document.createElement("button");
    cancelButton.innerText = "Cancel";
    saveButton.classList.add("btn");
    cancelButton.classList.add("btn-default");
    cancelButton.type = "button";
    cancelButton.onclick = function(){
        form.classList.add("hidden");
    };
    
    form.appendChild(textArea);
    form.appendChild(saveButton);
    form.appendChild(cancelButton);
    form.classList.add("hidden");
    return form;
}

// Use this to update the HTML of the message that was edited.
function changeMessage(data){
    var id = data.key;
    var message = data.val();
    var messageContent = document.getElementById(id).getElementsByTagName("div")[0];
    var messageText = messageContent.getElementsByTagName("pre")[0];
    messageText.innerText = message.text;

    var editDate = new Date(message.lastEdit);
    var messageEdited = messageContent.getElementsByTagName("p")[1];
    messageEdited.innerText = "Last edited: " + editDate.getMonth() + "-" + editDate.getDate() + "-" + editDate.getFullYear();
    messageEdited.classList.remove("hidden");
}

var messageForm = document.getElementById("message-form");
var messageInput = document.getElementById("message-input");
var messageError = document.getElementById("message-error");

// When the user submits the form to send a message,
// add the message to the list of messages.
messageForm.addEventListener("submit", function (e) {
    e.preventDefault();

    messageError.classList.remove("active");

    var user = firebase.auth().currentUser;

    if (user.emailVerified) {
        // Connect to the firebase data
        var database = firebase.database();

        // Get the ref for your messages list
        var messages = database.ref('channels/general');

        // Get the message the user entered
        var message = messageInput.value;

        // Create a new message and add it to the list.
        messages.push({
            text: message,
            displayName: user.displayName,
            photoUrl: user.photoURL,
            uid: user.uid,
            timestamp: new Date().getTime() // unix timestamp in milliseconds

        })
        .then(function () {
            // message created succesfully
            messageInput.value = "";
            messageInput.focus();
        })
        .catch(function(error) {  
            // message not created succesfully
            messageError.textContent = "Message not sent";
            messageError.classList.add("active");
        });
    }
    else {
        messageError.textContent = "Please verify your email before posting";
        messageError.classList.add("active");
    }
});
