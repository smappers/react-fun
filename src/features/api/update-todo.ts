import { Todo } from "../../types/Todo";

// Update Todo API
export async function updateTodo(id: string, todoItem: Todo) {
  // Local storage is just being used as a temporary storage solution
  if (!window.localStorage) return [];
  const todosString = window.localStorage.getItem("todos");

  if (!todosString) return [];

  const todos: Todo[] = JSON.parse(todosString);

  const updatedTodos = todos.map((todo) => {
    if (todo.id === id) {
      return { ...todoItem };
    }
    return todo;
  });

  window.localStorage.setItem("todos", JSON.stringify(updatedTodos));

  return updatedTodos;
}
