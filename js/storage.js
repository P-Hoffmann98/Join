const STORAGE_TOKEN = "ZE2UHDN0ZNZ1NK5SZMO83CGMAD73WG0SLNIZYU6W";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";

let users = [];
/*
let tasks = [];
let contacts = [];
*/

async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}

async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return fetch(url)
    .then((res) => res.json())
    .then((res) => {
      if (res.data) {
        return res.data.value;
      }
      throw `Could not find data with key "${key}".`;
    });
}

/*array structure on server:
users = [
  {
    id: "",
    name: "",
    email: "",
    password: "",
    initials: "",
    tasks: [
      {
        id: "",
        autor: "",
        title: "",
        description: "",
        assignedTo: "",
        dueDate: "",
        prio: "",
        category: "",
        subtasks: "",
        contacts: "",
        status: "",
      },
    ],
    contacts: [
      {
        id: "",
        name: "",
        email: "",
        phone: "",
        color: "",
      },
    ],
  },
];
*/
async function loadUsers() {
  try {
    users = JSON.parse(await getItem("users"));
  } catch (e) {
    console.error("Loading error:", e);
  }
}

async function loadTasks() {
  try {
    tasks = JSON.parse(await getItem("tasks"));
  } catch (e) {
    console.error("Loading error:", e);
  }
}

async function loadContacts() {
  try {
    contacts = JSON.parse(await getItem("contacts"));
  } catch (e) {
    console.error("Loading error:", e);
  }
}
