const toDoItems = [
  {
    timestamp: 1,
    text: "Eat something",
    completed: true,
  },
  {
    timestamp: 2,
    text: "Practice coding",
    completed: false,
  },
  {
    timestamp: 3,
    text: "Save the world",
    completed: false,
  },
];

const toDoItemsContainer = document.querySelector(".to-do-items");
const newToDoItemInput = document.querySelector(".new-to-do input");
const addToDoItemButton = document.querySelector(".new-to-do button");

const generateToDoHtml = (toDoItem) => {
  return `
    <li class="${toDoItem.completed ? "completed" : "pending"}">
      <button>
        <img src="./icons/square.svg" alt="unchecked" />
        <img src="./icons/check-square.svg" alt="checked" />
        <span>${toDoItem.text}</span>
      </button>
    </li>
  `;
};

const renderToDoItems = () => {
  toDoItemsContainer.innerHTML = toDoItems.map(generateToDoHtml).join("");
};

renderToDoItems();

addToDoItemButton.addEventListener("click", () => {
  const newToDoItem = {
    timestamp: Date.now(),
    text: newToDoItemInput.value,
    completed: false,
  };
  toDoItems.push(newToDoItem);
});