let toDoItems = [];

const toDoItemsContainer = document.querySelector(".to-do-items");
const newToDoItemInput = document.querySelector(".new-to-do input");
const addToDoItemButton = document.querySelector(".new-to-do button");
const toDoItemsList = document.querySelector(".to-do-items");

const generateToDoHtml = (toDoItem) => {
  const isSomethingEdited = toDoItems.some((toDoItem) => {
    return toDoItem.editing;
  });
  if (!toDoItem.editing) {
    return `
      <li class="${toDoItem.completed ? "completed" : "pending"}">
        <button
          data-toggle="${toDoItem.timestamp}"
          ${isSomethingEdited ? "disabled" : ""}
        >
          <img class="unchecked" src="./icons/square.svg" alt="unchecked" />
          <img class="checked" src="./icons/check-square.svg" alt="checked" />
          <span>${toDoItem.text}</span>
        </button>
        <div class="tools">
          <button
            data-edit="${toDoItem.timestamp}" 
            ${isSomethingEdited ? "disabled" : ""}
          >
            <img src="./icons/pencil.svg" alt="edit" />
          </button>
          <button
            data-delete="${toDoItem.timestamp}"
            ${isSomethingEdited ? "disabled" : ""}
          >
            <img src="./icons/trash.svg" alt="delete" />
          </button>
        </div>
      </li>
    `;
  } else {
    return `
      <li>
        <input value="${toDoItem.text}" data-input="${toDoItem.timestamp}" />
        <div class="tools">
          <button data-save="${toDoItem.timestamp}">
            <img src="./icons/check.svg" alt="save" />
          </button>
          <button data-cancel="${toDoItem.timestamp}">
            <img src="./icons/x.svg" alt="cancel" />
          </button>
        </div>
      </li>
    `;
  }
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
    editing: false,
  };
  toDoItems.push(newToDoItem);
  renderToDoItems();
  newToDoItemInput.value = "";
};

renderToDoItems();

addToDoItemButton.addEventListener("click", addToDoItem);
newToDoItemInput.addEventListener("keyup", (event) => {
  const isSomethingEdited = toDoItems.some((toDoItem) => {
    return toDoItem.editing;
  });
  if (event.key === "Enter" && !isSomethingEdited) {
    addToDoItem();
  }
});
toDoItemsList.addEventListener("click", (event) => {
  const clickedButton = event.path.find(
    (element) => element.nodeName === "BUTTON"
  );
  if (clickedButton !== undefined && !clickedButton.disabled) {
    if (clickedButton.dataset.toggle) {
      const clickedToggleTimestamp = Number(clickedButton.dataset.toggle);
      toDoItems = toDoItems.map((toDoItem) => {
        if (toDoItem.timestamp === clickedToggleTimestamp) {
          return {
            timestamp: toDoItem.timestamp,
            text: toDoItem.text,
            completed: !toDoItem.completed,
            editing: toDoItem.editing,
          };
        } else {
          return toDoItem;
        }
      });
    }
    if (clickedButton.dataset.delete) {
      const clickedDeleteTimestamp = Number(clickedButton.dataset.delete);
      toDoItems = toDoItems.filter((toDoItem) => {
        return toDoItem.timestamp !== clickedDeleteTimestamp;
      });
    }
    if (clickedButton.dataset.edit) {
      addToDoItemButton.disabled = true;
      const clickedEditTimestamp = Number(clickedButton.dataset.edit);
      toDoItems = toDoItems.map((toDoItem) => {
        if (toDoItem.timestamp === clickedEditTimestamp) {
          return {
            timestamp: toDoItem.timestamp,
            text: toDoItem.text,
            completed: toDoItem.completed,
            editing: true,
          };
        } else {
          return toDoItem;
        }
      });
    }
    if (clickedButton.dataset.cancel) {
      addToDoItemButton.disabled = false;
      const clickedCancelTimestamp = Number(clickedButton.dataset.cancel);
      toDoItems = toDoItems.map((toDoItem) => {
        if (toDoItem.timestamp === clickedCancelTimestamp) {
          return {
            timestamp: toDoItem.timestamp,
            text: toDoItem.text,
            completed: toDoItem.completed,
            editing: false,
          };
        } else {
          return toDoItem;
        }
      });
    }
    if (clickedButton.dataset.save) {
      addToDoItemButton.disabled = false;
      const clickedSaveTimestamp = Number(clickedButton.dataset.save);
      const editingInput = document.querySelector(
        `input[data-input="${clickedSaveTimestamp}"]`
      );
      toDoItems = toDoItems.map((toDoItem) => {
        if (toDoItem.timestamp === clickedSaveTimestamp) {
          return {
            timestamp: toDoItem.timestamp,
            text: editingInput.value,
            completed: toDoItem.completed,
            editing: false,
          };
        } else {
          return toDoItem;
        }
      });
    }

    renderToDoItems();
  }
});
