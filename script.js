// =============================== Functions with Asthetic Purposes & Etc ===============================

function toggleDarkMode() {
    if (document.fullscreenElement) {
        document.exitFullscreen().then(() => console.log("test")).catch((err) => console.error(err));
    }
    document.getElementById("fullscreen").classList.toggle("fullscreen")
    document.getElementById("fullscreen").classList.toggle("exitfullscreen")

    document.body.classList.toggle("light-mode");
    const button = document.getElementById("lightModeButton");

    button.classList.toggle("dark-mode-img");
    button.classList.toggle("light-mode-img");
};

function login() {
    throwError("notDeveloped");
}

// get current date
function fetchDate() {
        const d = new Date();
        const day = d.getDate();
        const month = d.toLocaleString("default", { month: "long" });
        const year = d.getFullYear();

        let hours = d.getHours();
        let minutes = d.getMinutes(); 
        let seconds = d.getSeconds();
        
        if (parseInt(hours) < 10) hours = "0" + hours;
        if (parseInt(minutes) < 10) minutes = "0" + minutes;
        if (parseInt(seconds) < 10) seconds = "0" + seconds;
    
        const time = document.getElementById("time");
    
        const text = `${hours}:${minutes}`;
        time.innerText = text;

        const date = document.getElementById("date");
        date.innerText = `${month} ${day}, ${year}`;
}
fetchDate();

// fullscreen
function fullScreen() {
    if (document.fullscreenElement) {
        document
        .exitFullscreen()
        .then(() => console.log())
        .catch((err) => console.error(err));
    }
    else {
        document.body.requestFullscreen();
    }
    document.getElementById("fullscreen").classList.toggle("fullscreen")
    document.getElementById("fullscreen").classList.toggle("exitfullscreen")
}
function detectExitFullscreen() {
    if (document.fullscreenElement) {
        document.getElementById("fullscreen").classList.remove("fullscreen")
        document.getElementById("fullscreen").classList.add("exitfullscreen")
    }
    else {
        document.getElementById("fullscreen").classList.add("fullscreen")
        document.getElementById("fullscreen").classList.remove("exitfullscreen")
    }
}

// error messages
const throwError = function (type) {
    if (type == "notDeveloped") {
        $("#notDeveloped").dialog({
            show: {
                effect: "blind",
                duration: 100,
            },
            hide: {
                effect: "clip",
                duration: 100,
            },
        });  
        document.getElementById("NDMessage").style.display = "block";
    }
    else if (type == "noInput") {
        $("#noInput").dialog({
            show: {
                effect: "blind",
                duration: 100,
            },
            hide: {
                effect: "clip",
                duration: 100,
            },
        });  
        document.getElementById("NIMessage").style.display = "block";
    }
}

// =========================================== Main Functions ===========================================

document.addEventListener("DOMContentLoaded", loadTodoItems); // Listen for page load

// adding new entries for todo
function add() {
    const input = document.getElementById("inputTitle");
    if (input.value.trim() == "") {
        throwError("noInput");
        return; // exit function, because no need to continue
    }

    const newElement = createTodoItem(input.value);
    document.getElementById("todo").appendChild(newElement);

    saveTodoItems(); // Update localStorage

    input.value = ""; // clear input field
    input.focus();
}

function createTodoItem(text) {
    const newElement = document.createElement("li");
    
    // Create text node for the to-do item text
    const textNode = document.createElement("span");
    textNode.textContent = text;

    // Create a container for the buttons
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    // Remove button
    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    removeButton.textContent = "Remove";
    removeButton.onclick = function () {
        let confirmation = confirm("Are you sure?");
        if (confirmation) {
            newElement.remove();
            saveTodoItems(); // Update localStorage after removing an item
        }
    };

    // Edit button
    const editButton = document.createElement("button");
    editButton.classList.add("edit-button");
    editButton.textContent = "Edit";
    editButton.onclick = function () {
        const newText = prompt("Edit your item:", textNode.textContent);
        if (newText != null && newText.trim() != "") {
            textNode.textContent = newText;
            saveTodoItems(); // Update localStorage after editing an item
        }
    };

    // Append buttons to the button container
    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(removeButton);

    // Append the text and button container to the list item
    newElement.appendChild(textNode);
    newElement.appendChild(buttonContainer);

    return newElement;
};//

// Load to-do list items from localStorage
function loadTodoItems() {
    const savedItems = localStorage.getItem("todoItems");
    if (savedItems) {
        const items = JSON.parse(savedItems);
        items.forEach(itemText => {
            const newElement = createTodoItem(itemText);
            document.getElementById("todo").appendChild(newElement);
        });
    }
}

// Save current to-do list items into localStorage
function saveTodoItems() {
    const items = [];
    document.querySelectorAll("#todo li").forEach(item => {
        items.push(item.childNodes[0].textContent); // Only save the text, not the button
    });
    localStorage.setItem("todoItems", JSON.stringify(items));
}

// key detection
let keysPressed = {};

document.body.addEventListener("keydown", (event) => {
    //alert(event.key);
    //console.log(keysPressed, event.key);

    keysPressed[event.key] = true;
    // submit with enter
    if (event.key == "Enter") {
        console.log("test");
        if (document.activeElement == document.getElementById("inputTitle")) {
            add();
        }
    }
    if (event.key == "v" && keysPressed["Control"]) {
        window.location.href = "version_history.html";
    }
})

document.addEventListener('keyup', (event) => {
    delete keysPressed[event.key];
});

setInterval(detectExitFullscreen, 100);
setInterval(fetchDate, 100);