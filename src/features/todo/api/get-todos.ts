export async function getTodos() {
  // Local storage is just being used as a temporary storage solution
  if (!window.localStorage) return [];
  const todos = window.localStorage.getItem("todos");

  if (!todos) return [];

  return JSON.parse(todos);
}
