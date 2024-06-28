// Get references to the DOM elements
const ITEMS_CONTAINER = document.getElementById("items");
const ITEMS_TEMPLATE = document.getElementById("itemTemplate");
const ADD_BUTTON = document.getElementById("add");

let items = getItems();
// Function to get items from local storage
function getItems() {
  const value = localStorage.getItem("todo-test") || "[]";

  return JSON.parse(value);
}
// Function to set items to local storage
function setItems(items) {
  const itemsJson = JSON.stringify(items);

  localStorage.setItem("todo-test", itemsJson);
}
// Function to add a new item
function addItem() {
  items.unshift({
    description: "",
    completed: false,
  });

  setItems(items);
  refreshList();
}
// Function to update an item
function updateItem(item, key, value) {
  item[key] = value;
  setItems(items);
  refreshList();
}
// Function to delete an item
function deleteItem(item) {
  items = items.filter((i) => i !== item);
  setItems(items);
  refreshList();
}
// Function to refresh the list
function refreshList() {
  items.sort((a, b) => {
    if (a.completed) {
      return 1;
    }

    if (b.completed) {
      return -1;
    }

    return a.description < b.description ? -1 : 1;
  });

  ITEMS_CONTAINER.innerHTML = "";

  for (const item of items) {
    const itemElement = ITEMS_TEMPLATE.content.cloneNode(true);
    const descriptionInput = itemElement.querySelector(".item-description");
    const completedInput = itemElement.querySelector(".item-completed");
    const deleteButton = itemElement.querySelector(".delete-button");

    descriptionInput.value = item.description;
    completedInput.checked = item.completed;

    descriptionInput.addEventListener("change", () => {
      updateItem(item, "description", descriptionInput.value);
    });

    completedInput.addEventListener("change", () => {
      updateItem(item, "completed", completedInput.checked);
    });

    deleteButton.addEventListener("click", () => {
      deleteItem(item);
    });

    ITEMS_CONTAINER.append(itemElement);
  }
}
// Add event listener for the add button
ADD_BUTTON.addEventListener("click", () => {
  addItem();
});
// Initial refresh of the list
refreshList();
