const text = document.getElementById("text");
const listcontainer = document.getElementById("list-container");

let editLi = null; 

function addTask() {
    if (text.value.trim() === "") {
        alert("You must write something!");
        return;
    }

    if (editLi !== null) {
        editLi.querySelector(".task-text").innerText = text.value;
        editLi = null;
        text.value = "";
        saveData();
        return;
    }

    const li = document.createElement("li");

    li.innerHTML = `
        <span class="checkbox"></span>
        <span class="task-text">${text.value}</span>
        <button class="edit-btn">Edit</button>
        <span class="delete-btn">&times;</span>
    `;

    listcontainer.appendChild(li);
    text.value = "";
    saveData();
}

listcontainer.addEventListener("click", function (e) {

    if (e.target.classList.contains("checkbox")) {
        e.target.parentElement.classList.toggle("checked");
        saveData();
        return;
    }

    if (e.target.classList.contains("edit-btn")) {
        editLi = e.target.parentElement;
        text.value = editLi.querySelector(".task-text").innerText;
        text.focus();
        return;
    }

    if (e.target.classList.contains("delete-btn")) {
        e.target.parentElement.remove();
        saveData();
        return;
    }
});

text.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

function saveData() {
    localStorage.setItem("data", listcontainer.innerHTML);
}

function showTask() {
    listcontainer.innerHTML = localStorage.getItem("data") || "";
}

showTask();
