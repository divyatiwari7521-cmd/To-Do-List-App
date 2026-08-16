const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const filterBtns = document.querySelectorAll(".filters button");
let filter = "all";

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;

        let editSpan = document.createElement("span");
        editSpan.innerHTML = "✎";
        editSpan.classList.add("edit");
        li.appendChild(editSpan);

        
        let deletespan = document.createElement("span");
        deletespan.innerHTML = "\u00d7";
        deletespan.classList.add("delete");
        li.appendChild(deletespan);

        listContainer.appendChild(li);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        if (e.target.classList.contains("edit")) {
            //Edit functionality
            let newText = prompt("Edit your task:", e.target.parentElement.firstChild.textContent);
            if (newText !== null && newText.trim() !== "") {
                e.target.parentElement.firstChild.textContent = newText.trim();
                saveData();
            }
        } else {e.target.parentElement.remove();
        saveData();
        }
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();

filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        filter = btn.dataset.filter;
        const tasks = listContainer.querySelectorAll("li");
        tasks.forEach(task => {
            if (filter === "all") {
                task.style.display = "block";
            } else if (filter === "active") {
                task.style.display = task.classList.contains("checked") ? "none" : "block";
            } else if (filter === "completed") {
                task.style.display = task.classList.contains("checked") ? "block" : "none";
            }
        });
    });
});
