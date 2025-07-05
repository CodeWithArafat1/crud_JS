const addBtn = document.getElementById("add");
const createForm = document.getElementById("createForm");
const updateForm = document.getElementById("updateForm");
const tr = document.getElementById("tr");
const deleteBtn = document.getElementById("btn-delete");
const editBtn = document.getElementById("btn-edit");
const newId = document.getElementById("newId");

function add() {
  createForm.style.display = "block";
  addBtn.style.display = "none";
}

function updateUser() {
  updateForm.style.display = "none";
  addBtn.style.display = "block";
}

editBtn.addEventListener("click", () => {
  updateForm.style.display = "block";
  addBtn.style.display = "none";
});

function addUsers() {
  createForm.style.display = "none";
  addBtn.style.display = "block";
}
