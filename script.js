const addBtn = document.getElementById("add");
const createForm = document.getElementById("createForm");
const updateForm = document.getElementById("updateForm");
const tBody = document.getElementById("tBody");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");

function add() {
  createForm.style.display = "flex";
  addBtn.style.display = "none";
}

window.onload = () => {
  const saved = getData();

  saved.forEach((users) => {
    const tr = document.createElement("tr");

    const tdName = document.createElement("td");
    tdName.innerText = users.id;
    tr.appendChild(tdName);

    const tdId = document.createElement("td");
    tdId.innerText = users.name;
    tr.appendChild(tdId);

    const tdEmail = document.createElement("td");
    tdEmail.innerText = users.email;
    tr.appendChild(tdEmail);

    const actionBtn = document.createElement("td");
    actionBtn.innerHTML = `<div class="action-buttons">
    <button class="edit-btn" onclick="edit(${users.id})">Edit</button>
    <button class="delete-btn" onclick="delUsers(${users.id})">Delete</button> 
    </div>`;
    tr.appendChild(actionBtn);

    tBody.appendChild(tr);
  });
};

function addUsers() {
  createForm.style.display = "none";
  addBtn.style.display = "flex";

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  if (name === "" || email === "") {
    return;
  }

  const newId = Date.now();
  const tr = document.createElement("tr");

  const tdId = document.createElement("td");
  const tdName = document.createElement("td");
  const tdEmail = document.createElement("td");
  const actionBtn = document.createElement("td");

  tdId.innerText = newId;
  tdName.innerText = name;
  tdEmail.innerText = email;

  actionBtn.innerHTML = `<div class="action-buttons">
    <button class="edit-btn" onclick="edit(${newId})">Edit</button>
    <button class="delete-btn" onclick="delUsers(${newId})">Delete</button> 
    </div>`;

  tr.appendChild(tdId);
  tr.appendChild(tdName);
  tr.appendChild(tdEmail);
  tr.appendChild(actionBtn);

  tBody.appendChild(tr);
  const oldData = getData();

  const newUsers = {
    id: newId,
    name: name,
    email: email,
  };
  oldData.push(newUsers);

  setData(oldData);
  nameInput.value = "";
  emailInput.value = "";
}

function getData() {
  return JSON.parse(localStorage.getItem("allUsers")) || [];
}
function setData(oldData) {
  return localStorage.setItem("allUsers", JSON.stringify(oldData));
}

function edit(id) {
  updateForm.style.display = "flex";
  addBtn.style.display = "none";
  createForm.style.display = "none";

  const users = getData();

  const findUsers = users.find((item) => item.id === id);
  uname.value = findUsers.name;
  uemail.value = findUsers.email;
  document.getElementById("newId").value = findUsers.id;
}

function delUsers(id) {
  const users = getData();
  const delUser = users.filter((item) => item.id !== id);

  setData(delUser);
  location.reload();
}

function updateUser() {
  updateForm.style.display = "none";
  addBtn.style.display = "flex";
  const users = getData();
  const uid = parseInt(document.getElementById("newId").value);
  const unameValue = document.getElementById("uname").value.trim();
  const uemailValue = document.getElementById("uemail").value.trim();

  const updateUsers = users.map((item) => {
    if (item.id === uid) {
      return { ...item, name: unameValue, email: uemailValue };
    } else {
      return item;
    }
  });

  setData(updateUsers);
  location.reload();
}
