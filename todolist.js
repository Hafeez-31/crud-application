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
        const li = e.target.parentElement;
        const editBtn = li.querySelector(".edit-btn");

        li.classList.toggle("checked");

        if (li.classList.contains("checked")) {
            editBtn.disabled = true;
            editBtn.style.opacity = "0.5";
            editBtn.style.cursor = "not-allowed";
        } else {
            editBtn.disabled = false;
            editBtn.style.opacity = "1";
            editBtn.style.cursor = "pointer";
        }

        saveData();
        return;
    }

    if (e.target.classList.contains("edit-btn")) {
        if (e.target.disabled) return; 

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

    document.querySelectorAll("#list-container li").forEach(li => {
        const editBtn = li.querySelector(".edit-btn");
        if (li.classList.contains("checked")) {
            editBtn.disabled = true;
            editBtn.style.opacity = "0.5";
            editBtn.style.cursor = "not-allowed";
        }
    });
}

showTask();
