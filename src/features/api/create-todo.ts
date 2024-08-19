// Create Todo API
export async function createTodo(todoText: string) {
  // Local storage is just being used as a temporary storage solution
  if (!window.localStorage) return [];
  const todosString = window.localStorage.getItem("todos");

  if (!todosString) return [];

  const todos = JSON.parse(todosString);

  const newTodo = {
    id: crypto.randomUUID(),
    text: todoText,
    completed: false,
  };

  const updatedTodos = [...todos, newTodo];

  window.localStorage.setItem("todos", JSON.stringify(updatedTodos));

  return updatedTodos;
}
