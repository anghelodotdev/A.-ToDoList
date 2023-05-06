
const ADDED_ITEM = document.getElementById('added-item');
const ADD_ITEM = document.getElementById('add-item');
const ADD_BUTTON = document.getElementById('add-btn');

let item = getItems();

function getItems() 
{
  const value = localStorage.getItem('A.D-ToDoList') || '[]';

  return JSON.parse(value);
}

function setItems(item) 
{
  const itemsJson = JSON.stringify(item);

  localStorage.setItem('A.D-ToDoList', itemsJson);
}

function addItem() 
{
  item.unshift ({
    description: '',
    completed: false
  });

  setItems(item);
  refresh();
}

function updateItem(items, key, value)
{
  items[key] = value;
  setItems(item);
  refresh();
}

function refresh()
{
  item.sort ((a, b) => {
    if (a.completed) {
      return 1;
    }

    if (b.completed) {
      return -1;
    }

    return a.description < b.description ? -1 : 1;
  });

  ADDED_ITEM.innerHTML = '';
  
  for (const items of item) {
    const itemElement = ADD_ITEM.content.cloneNode(true);
    const descriptionInput = itemElement.querySelector('.to-do');
    const completedInput = itemElement.querySelector('.completed');

    descriptionInput.value = items.description;
    completedInput.checked = items.completed;

    descriptionInput.addEventListener('change', () => {
      updateItem(items, 'description', descriptionInput.value);
    });

    completedInput.addEventListener('change', () => {
      updateItem(items, 'completed', completedInput.checked);
    });

    ADDED_ITEM.append(itemElement);
  }
}

ADD_BUTTON.addEventListener('click', () => {
  addItem();
});

refresh();