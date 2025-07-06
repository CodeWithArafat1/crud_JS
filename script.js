const createForm = document.getElementById("createForm");
const updateForm = document.getElementById("updateForm");
const addBtn = document.getElementById("add");

const tBody = document.getElementById("tBody");

const newId = document.getElementById("newId");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");

function add() {
  createForm.style.display = "flex";
  addBtn.style.display = "none";
}

window.onload = () => {
  renderTable();
};

function addUsers() {
  createForm.style.display = "none";
  addBtn.style.display = "flex";

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  if (name === "" || email === "") return;

  const id = getData().id;
  newId.value = id;

  const tr = document.createElement("tr");

  const tdId = document.createElement("td");
  tdId.innerText = id;
  tr.appendChild(tdId);

  const tdName = document.createElement("td");
  tdName.innerText = name;
  tr.appendChild(tdName);

  const tdEmail = document.createElement("td");
  tdEmail.innerText = email;
  tr.appendChild(tdEmail);

  const actionBtn = document.createElement("td");
  actionBtn.innerHTML = `
  <div class="action-buttons">
              <button class="edit-btn" onclick="edit(${id})">Edit</button>
              <button class="delete-btn" onclick="delUser(${id})">delete</button>
</div>`;
  tr.appendChild(actionBtn);

  tBody.appendChild(tr);

  const getFromLocal = getData();
  getFromLocal.push({ id: id, name, email });
  setData(getFromLocal);

  nameInput.value = "";
  emailInput.value = "";
  renderTable();
}

function getData() {
  const users = JSON.parse(localStorage.getItem("userData")) || [];
  return users.map((user, index) => {
    return { ...user, id: index + 1 };
  });
}

function setData(data) {
  return localStorage.setItem("userData", JSON.stringify(data));
}

function edit(id) {
  const getUsers = getData();

  const findUsers = getUsers.find((item) => item.id === id);

  const newId = document.getElementById("newId");
  const uname = document.getElementById("uname");
  const uemail = document.getElementById("uemail");

  newId.value = findUsers.id;
  uname.value = findUsers.name;
  uemail.value = findUsers.email;

  updateForm.style.display = "flex";
  addBtn.style.display = "none";
}

function updateUser() {
  const getUsers = getData();
  const uid = parseInt(document.getElementById("newId").value);
  const uname = document.getElementById("uname").value.trim();
  const uemail = document.getElementById("uemail").value.trim();

  const filterUsers = getUsers.map((data) => {
    if (data.id === uid) {
      return { ...data, name: uname, email: uemail };
    } else {
      return data;
    }
  });

  setData(filterUsers);
  renderTable();

  updateForm.style.display = "none";
  addBtn.style.display = "block";
}

function renderTable() {
  const getUsers = getData();
  tBody.innerHTML = "";

  getUsers.forEach((data) => {
    const tr = document.createElement("tr");

    const tdId = document.createElement("td");
    tdId.innerText = data.id;
    tr.appendChild(tdId);

    const tdName = document.createElement("td");
    tdName.innerText = data.name;
    tr.appendChild(tdName);

    const tdEmail = document.createElement("td");
    tdEmail.innerText = data.email;
    tr.appendChild(tdEmail);

    const actionBtn = document.createElement("td");
    actionBtn.innerHTML = `
  <div class="action-buttons">
              <button class="edit-btn" onclick="edit(${data.id})">Edit</button>
              <button class="delete-btn" onclick="delUser(${data.id})">delete</button>
</div>`;
    tr.appendChild(actionBtn);

    tBody.appendChild(tr);
  });
}

function delUser(id) {
  const getUsers = getData();

  const filteredUsers = getUsers.filter((data) => data.id !== id);

  setData(filteredUsers);

  renderTable();
}
