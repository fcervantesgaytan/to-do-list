import { todoSpanButtonTodoElementClickHandler, displayNewItemCreationError, generateTodoId, canCreateNewItem, saveTodosToLocalStorage, readTodosFromLocalStorage, createTodoElement, getMessageTodoElement, getSpanButtonTodoElement, todoLIelementClickHandler, confirmDeleteHandler } from './utils.js';

const errorMessageSpan = document.getElementById('error-message') as HTMLSpanElement;
const todoListUL = document.getElementById('todos') as HTMLUListElement;
const newItemInput = document.getElementById('new-item') as HTMLInputElement;

let todos: string[] = readTodosFromLocalStorage();
const confirmModal = document.getElementById('confirm-modal') as HTMLDialogElement;

function setUp(): void {
    todoListUL.append(...todos.map(createTodoElement));
    
    for (let todoLIItem of todoListUL.children) {
        todoLIItem.addEventListener('click', todoLIelementClickHandler);
        getSpanButtonTodoElement(todoLIItem as HTMLLIElement).addEventListener('click', (e) => {
            todoSpanButtonTodoElementClickHandler(confirmModal, e);
        });
        todoLIItem.id = generateTodoId();
    }

    document.getElementById('todo-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        errorMessageSpan.classList.add('invisible');

        const { isValid, errorMessage } = canCreateNewItem(newItemInput.value, todos.length);
        
        if (! isValid) {
            displayNewItemCreationError(errorMessageSpan, errorMessage);
            return;
        }

        const newTodo = createTodoElement(newItemInput.value);
        todos.push(getMessageTodoElement(newTodo));
        todoListUL.append(newTodo);
        // Add click events for the new todo.
        todoListUL.lastElementChild?.addEventListener('click', todoLIelementClickHandler);
        todoListUL.lastElementChild!.id = generateTodoId();
        getSpanButtonTodoElement(todoListUL.lastElementChild as HTMLLIElement).addEventListener('click', (e) => {
            todoSpanButtonTodoElementClickHandler(confirmModal, e);
        });
        saveTodosToLocalStorage(todoListUL, todos);

        newItemInput.value = '';
    });

    
    document.getElementById('confirm-delete-form')?.addEventListener('submit', (e) => {
        confirmDeleteHandler(confirmModal, e, todoListUL, todos);
        todos = readTodosFromLocalStorage();
    });
}

setUp();
