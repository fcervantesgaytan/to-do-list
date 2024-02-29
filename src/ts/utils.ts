import ValidationStatus from './ValidatonStatus.js';

import { MAX_TODO_ITEMS, MIN_LENGTH_TODOS } from './constants.js';

let nextId = 1;
let todoIdToDelete = '';

export function canCreateNewItem(newItemDescription: string, todosLength: number): ValidationStatus {
    let validationStatus: ValidationStatus = { isValid: true, errorMessage: '' };

    if (todosLength >= MAX_TODO_ITEMS) {
        validationStatus.isValid = false;
        validationStatus.errorMessage = 'Maximum 8 items are allowed to add in the list.';
    } else if (newItemDescription.length === 0) {
        validationStatus.isValid = false;
        validationStatus.errorMessage = 'An empty todo item cannot be created';
    } else if (newItemDescription.length <= MIN_LENGTH_TODOS) {
        validationStatus.isValid = false;
        validationStatus.errorMessage = 'The todo item must be longer than 3 characters';
    }

    return validationStatus;
}

export function saveTodosToLocalStorage(todoListUL: HTMLUListElement, todos: string[]): void {
    const newTodos: string[] = [];
    
    for (let HTMLLIElement of todoListUL.children) {
        newTodos.push((HTMLLIElement.firstElementChild!.firstElementChild as HTMLSpanElement).innerText);
    }
    todos = newTodos;

    localStorage.setItem('todos', JSON.stringify(todos));
}

export function readTodosFromLocalStorage(): string[] {
    let stringTodos = localStorage.getItem('todos');
    stringTodos = stringTodos ? stringTodos : '[]';

    return JSON.parse(stringTodos);
}

export function setMessageTodoElement(element: HTMLLIElement, description: string): void {
    // check template for html structuring details. This is accessing the span that holds the message.
    (element.firstElementChild?.firstElementChild?.firstElementChild as HTMLSpanElement).innerText = description; 
}

export function createTodoElement(description: string): HTMLLIElement {
    const liTemplate = document.getElementById('li-todo-template')! as HTMLTemplateElement;
    const element = liTemplate.content.cloneNode(true) as HTMLLIElement;

    setMessageTodoElement(element, description);
    
    return element;
}

export function getMessageTodoElement(element: HTMLLIElement): string {
    // check template for html structuring details. This is accessing the span that holds the message.
    return (element.firstElementChild?.firstElementChild?.firstElementChild as HTMLSpanElement).innerText; 
}

export function getSpanButtonTodoElement(element: HTMLLIElement): HTMLSpanElement {
    return element?.lastElementChild?.lastElementChild as HTMLSpanElement;
}

export function todoLIelementClickHandler(e: Event): void {
    (e.target as HTMLDivElement).classList.toggle('completed');
}

export function displayNewItemCreationError(errorMessageSpan: HTMLSpanElement, errorMessage: string): void {
    errorMessageSpan.innerText = errorMessage;
    errorMessageSpan.classList.remove('invisible');
}

export function todoSpanButtonTodoElementClickHandler(confirmModal: HTMLDialogElement, e: Event): void {
    // Prevents ancestors click event from being called.
    e.stopPropagation();
    
    todoIdToDelete = ((e.target as HTMLElement).parentNode!.parentNode!.parentNode! as HTMLLIElement).id;
    confirmModal.showModal();
}

export function generateTodoId(): string {
    return "todo-" + (nextId++);
}

export function confirmDeleteHandler(confirmModal: HTMLDialogElement, e: SubmitEvent, todoListUL: HTMLUListElement, todos: string[]): void {
    e.preventDefault();
    
    if ((e.submitter as HTMLButtonElement).value === 'ok') {
        document.getElementById(todoIdToDelete)!.remove();
        saveTodosToLocalStorage(todoListUL, todos);            
    }

    confirmModal.close();
}
