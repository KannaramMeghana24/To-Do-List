const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value.trim() === '') {
        alert("You must write something!");
        return;
    }

    const li = document.createElement("li");
    li.textContent = inputBox.value.trim();

    const span = document.createElement("span");
    span.innerHTML = "\u00D7"; // Unicode for '×'
    span.onclick = () => li.remove();

    li.appendChild(span);
    li.onclick = (e) => {
        if (e.target.tagName === "LI") {
            e.target.classList.toggle("checked");
        }
    };

    listContainer.appendChild(li);
    inputBox.value = "";
    saveData();
}

function saveData() {
    localStorage.setItem("tasks", listContainer.innerHTML);
}

function showTasks() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        listContainer.innerHTML = savedTasks;

        // Re-attach event listeners to recreated elements
        Array.from(listContainer.children).forEach((li) => {
            li.onclick = (e) => {
                if (e.target.tagName === "LI") {
                    e.target.classList.toggle("checked");
                }
            };

            li.querySelector("span").onclick = () => li.remove();
        });
    }
}

showTasks();
