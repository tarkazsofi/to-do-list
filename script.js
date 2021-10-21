let toDoItems = [];

const toDoItemsContainer = document.querySelector(".to-do-items");
const newToDoItemInput = document.querySelector(".new-to-do input");
const addToDoItemButton = document.querySelector(".new-to-do button");
const toDoItemsList = document.querySelector(".to-do-items");

const generateToDoHtml = (toDoItem) => {
  return `
    <li class="${toDoItem.completed ? "completed" : "pending"}">
      <button data-toggle="${toDoItem.timestamp}">
        <img src="./icons/square.svg" alt="unchecked" />
        <img src="./icons/check-square.svg" alt="checked" />
        <span>${toDoItem.text}</span>
      </button>
    </li>
  `;
};
const isCompleted = (toDoItem) => {
  return toDoItem.completed;
};
const isPending = (toDoItem) => {
  return !toDoItem.completed;
};
const renderToDoItems = () => {
  const pendingToDoItems = toDoItems.filter(isPending);
  const completedToDoItems = toDoItems.filter(isCompleted);
  const pendingToDoItemsHtml = pendingToDoItems.map(generateToDoHtml).join("");
  const completedToDoItemsHtml = completedToDoItems
    .map(generateToDoHtml)
    .join("");
  toDoItemsContainer.innerHTML = `${pendingToDoItemsHtml}${completedToDoItemsHtml}`;
};

const addToDoItem = () => {
  const newToDoItem = {
    timestamp: Date.now(),
    text: newToDoItemInput.value,
    completed: false,
  };
  toDoItems.push(newToDoItem);
  renderToDoItems();
  newToDoItemInput.value = "";
};

renderToDoItems();

addToDoItemButton.addEventListener("click", addToDoItem);
newToDoItemInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    addToDoItem();
  }
});
toDoItemsList.addEventListener("click", (event) => {
  const clickedButton = event.path.find(
    (element) => element.nodeName === "BUTTON"
  );
  if (clickedButton !== undefined) {
    const clickedTimestamp = Number(clickedButton.dataset.toggle);
    toDoItems = toDoItems.map((toDoItem) => {
      if (toDoItem.timestamp === clickedTimestamp) {
        return {
          timestamp: toDoItem.timestamp,
          text: toDoItem.text,
          completed: !toDoItem.completed,
        };
      } else {
        return toDoItem;
      }
    });
    renderToDoItems();
  }
});
