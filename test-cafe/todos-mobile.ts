import { Selector } from 'testcafe';
import { config } from './config';

const todoWorkflow = fixture('Todo Workflow Mobile');

const selectors = {
  addButton: '.create-todo',
  addTodoStart: 'app-add-todo',
  complete: '.todo-complete',
  delete: '.todo-delete',
  edit: '.todo-edit',
  newTodoDescription: '.new-todo-description',
  settings: 'app-settings',
  showCompletedToggle: '.show-completed-toggle',
  todoDescription: '.todo-description',
  todos: '.todo-body',
  updateButton: '.update-todo',
  updatedTodoDescription: '.updated-description',
};

todoWorkflow.page(config.baseUrl);

todoWorkflow.beforeEach(async (t) => {
  let todo = await Selector(selectors.todos);

  while (await todo.exists) {
    await t.click(todo);
    const deleteButton = await todo.find(selectors.delete);
    if (await deleteButton.exists) {
      await t.click(deleteButton);
      await promiseSleep(100);
      todo = await Selector(selectors.todos);
    }
  }

  // Iphone 6/7/8
  await t.resizeWindow(375, 667);
});

test('Can add todos', async (t) => {
  // Adding todos
  const todoDescription1 = 'new todo one';
  await addTodo(t, todoDescription1);
  const todo1 = await Selector(selectors.todos);
  await t.expect(await todo1.exists).eql(true, 'todo was created');
  const description1 = await todo1.find(selectors.todoDescription);
  await t.expect(await description1.innerText).eql(todoDescription1, 'todo has correct description');

  await promiseSleep(500);
  const todoDescription2 = 'new todo two';
  await addTodo(t, todoDescription2);
  const todo2 = await Selector(selectors.todos);
  await t.expect(await todo2.exists).eql(true, 'todo was created');
  const description2 = await todo1.find(selectors.todoDescription);
  await t.expect(await description2.innerText).eql(todoDescription2, 'todo has correct description');
});

test('Can mark todos as complete', async (t) => {
  await addTodo(t, 'new todo one');
  const selectedTodo = await toggleTodoComplete(t, 0);
  const selectedDescription = await selectedTodo.find(selectors.todoDescription);
  await t.expect(await selectedDescription.hasClass('completed-todo')).eql(true, 'Todo is marked completed');
});

test('Can edit todos', async (t) => {
  await addTodo(t, 'new todo one');
  const newTodoDescription = 'new todo one description';
  const editedTodo = await editTodo(t, 0, 'new todo one description');
  const editedDescription = await editedTodo.find(selectors.todoDescription);
  await t.expect(await editedDescription.innerText).eql(newTodoDescription, 'todo description was edited');
});

test('Can delete todos', async (t) => {
  await addTodo(t, 'new todo one');
  await promiseSleep(500);
  await addTodo(t, 'new todo two');
  await deleteTodo(t, 0);
  const todos = await Selector(selectors.todos);

  await t.expect(await todos.count).eql(1, 'Only one todo remains');

  const todoDescription = await todos.find(selectors.todoDescription);
  await t.expect(await todoDescription.innerText).eql('new todo one', 'The correct todo is deleted');
});

test('Can display only the incomplete todos', async (t) => {
  await addTodo(t, 'new todo one');
  await promiseSleep(500);
  await addTodo(t, 'new todo two');
  await promiseSleep(500);
  await addTodo(t, 'new todo three');
  await toggleTodoComplete(t, 1);
  await toggleTodoComplete(t, 2);

  const settings = await Selector(selectors.settings);
  await t.click(settings);

  const showCompletedToggle = await Selector(selectors.showCompletedToggle);
  await t.click(showCompletedToggle);

  const todos = await Selector(selectors.todos);

  await t.expect(todos.count).eql(1, 'Only one todo left');

  const remainingDescription = await todos.find(selectors.todoDescription);

  await t.expect(remainingDescription.innerText).eql('new todo three', 'Incomplete todo is the only one');
});

async function addTodo(t: TestController, description: string) {
  const addTodoStart = await Selector(selectors.addTodoStart);
  await t.click(addTodoStart);

  const input = await Selector(selectors.newTodoDescription);
  await t.typeText(input, description);

  const createButton = await Selector(selectors.addButton);
  await t.click(createButton);
}

async function toggleTodoComplete(t: TestController, index: number): Promise<Selector> {
  const todos = await Selector(selectors.todos);
  const selectedTodo = await todos.nth(index);
  await t.click(selectedTodo);
  await t.click(await selectedTodo.find(selectors.complete));
  return selectedTodo;
}

async function editTodo(t: TestController, index: number, newTodoDescription: string): Promise<Selector> {
  const todos = await Selector(selectors.todos);
  const selectedTodo = await todos.nth(index);
  await t.click(selectedTodo);
  await t.click(await selectedTodo.find(selectors.edit));

  const input = await Selector(selectors.updatedTodoDescription);
  await t.selectText(input).pressKey('delete');
  await t.typeText(input, newTodoDescription);

  const updateButton = await Selector(selectors.updateButton);
  await t.click(updateButton);
  return selectedTodo;
}

async function deleteTodo(t: TestController, index: number) {
  const todos = await Selector(selectors.todos);
  const selectedTodo = await todos.nth(index);
  await t.click(selectedTodo);
  await t.click(await selectedTodo.find(selectors.delete));
}

function promiseSleep(timeInMs: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeInMs);
  });
}
