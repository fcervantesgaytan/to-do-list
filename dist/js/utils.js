import { MAX_TODO_ITEMS, MIN_LENGTH_TODOS } from './constants.js';
let nextId = 1;
let todoIdToDelete = '';
export function canCreateNewItem(newItemDescription, todosLength) {
    let validationStatus = { isValid: true, errorMessage: '' };
    if (todosLength >= MAX_TODO_ITEMS) {
        validationStatus.isValid = false;
        validationStatus.errorMessage = 'Maximum 8 items are allowed to add in the list.';
    }
    else if (newItemDescription.length === 0) {
        validationStatus.isValid = false;
        validationStatus.errorMessage = 'An empty todo item cannot be created';
    }
    else if (newItemDescription.length <= MIN_LENGTH_TODOS) {
        validationStatus.isValid = false;
        validationStatus.errorMessage = 'The todo item must be longer than 3 characters';
    }
    return validationStatus;
}
export function saveTodosToLocalStorage(todoListUL, todos) {
    const newTodos = [];
    for (let HTMLLIElement of todoListUL.children) {
        newTodos.push(HTMLLIElement.firstElementChild.firstElementChild.innerText);
    }
    todos = newTodos;
    localStorage.setItem('todos', JSON.stringify(todos));
}
export function readTodosFromLocalStorage() {
    let stringTodos = localStorage.getItem('todos');
    stringTodos = stringTodos ? stringTodos : '[]';
    return JSON.parse(stringTodos);
}
export function setMessageTodoElement(element, description) {
    var _a, _b;
    // check template for html structuring details. This is accessing the span that holds the message.
    ((_b = (_a = element.firstElementChild) === null || _a === void 0 ? void 0 : _a.firstElementChild) === null || _b === void 0 ? void 0 : _b.firstElementChild).innerText = description;
}
export function createTodoElement(description) {
    const liTemplate = document.getElementById('li-todo-template');
    const element = liTemplate.content.cloneNode(true);
    setMessageTodoElement(element, description);
    return element;
}
export function getMessageTodoElement(element) {
    var _a, _b;
    // check template for html structuring details. This is accessing the span that holds the message.
    return ((_b = (_a = element.firstElementChild) === null || _a === void 0 ? void 0 : _a.firstElementChild) === null || _b === void 0 ? void 0 : _b.firstElementChild).innerText;
}
export function getSpanButtonTodoElement(element) {
    var _a;
    return (_a = element === null || element === void 0 ? void 0 : element.lastElementChild) === null || _a === void 0 ? void 0 : _a.lastElementChild;
}
export function todoLIelementClickHandler(e) {
    e.target.classList.toggle('completed');
}
export function displayNewItemCreationError(errorMessageSpan, errorMessage) {
    errorMessageSpan.innerText = errorMessage;
    errorMessageSpan.classList.remove('invisible');
}
export function todoSpanButtonTodoElementClickHandler(confirmModal, e) {
    // Prevents ancestors click event from being called.
    e.stopPropagation();
    todoIdToDelete = e.target.parentNode.parentNode.parentNode.id;
    confirmModal.showModal();
}
export function generateTodoId() {
    return "todo-" + (nextId++);
}
export function confirmDeleteHandler(confirmModal, e, todoListUL, todos) {
    e.preventDefault();
    if (e.submitter.value === 'ok') {
        document.getElementById(todoIdToDelete).remove();
        saveTodosToLocalStorage(todoListUL, todos);
    }
    confirmModal.close();
}
//# sourceMappingURL=utils.js.map