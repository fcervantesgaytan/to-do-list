import { todoSpanButtonTodoElementClickHandler, displayNewItemCreationError, generateTodoId, canCreateNewItem, saveTodosToLocalStorage, readTodosFromLocalStorage, createTodoElement, getMessageTodoElement, getSpanButtonTodoElement, todoLIelementClickHandler, confirmDeleteHandler } from './utils.js';
const errorMessageSpan = document.getElementById('error-message');
const todoListUL = document.getElementById('todos');
const newItemInput = document.getElementById('new-item');
let todos = readTodosFromLocalStorage();
const confirmModal = document.getElementById('confirm-modal');
function setUp() {
    var _a, _b;
    todoListUL.append(...todos.map(createTodoElement));
    for (let todoLIItem of todoListUL.children) {
        todoLIItem.addEventListener('click', todoLIelementClickHandler);
        getSpanButtonTodoElement(todoLIItem).addEventListener('click', (e) => {
            todoSpanButtonTodoElementClickHandler(confirmModal, e);
        });
        todoLIItem.id = generateTodoId();
    }
    (_a = document.getElementById('todo-form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', (e) => {
        var _a;
        e.preventDefault();
        errorMessageSpan.classList.add('invisible');
        const { isValid, errorMessage } = canCreateNewItem(newItemInput.value, todos.length);
        if (!isValid) {
            displayNewItemCreationError(errorMessageSpan, errorMessage);
            return;
        }
        const newTodo = createTodoElement(newItemInput.value);
        todos.push(getMessageTodoElement(newTodo));
        todoListUL.append(newTodo);
        // Add click events for the new todo.
        (_a = todoListUL.lastElementChild) === null || _a === void 0 ? void 0 : _a.addEventListener('click', todoLIelementClickHandler);
        todoListUL.lastElementChild.id = generateTodoId();
        getSpanButtonTodoElement(todoListUL.lastElementChild).addEventListener('click', (e) => {
            todoSpanButtonTodoElementClickHandler(confirmModal, e);
        });
        saveTodosToLocalStorage(todoListUL, todos);
        newItemInput.value = '';
    });
    (_b = document.getElementById('confirm-delete-form')) === null || _b === void 0 ? void 0 : _b.addEventListener('submit', (e) => {
        confirmDeleteHandler(confirmModal, e, todoListUL, todos);
        todos = readTodosFromLocalStorage();
    });
}
setUp();
//# sourceMappingURL=index.js.map