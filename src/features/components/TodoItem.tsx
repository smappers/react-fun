interface TodoItemProps {
  text: string;
  completed: boolean;
  onChange: () => void;
  deleteItem: () => void;
}

function TodoItem({ text, completed, onChange, deleteItem }: TodoItemProps) {
  return (
    <div>
      <label>
        <input type="checkbox" checked={completed} onChange={onChange} />
        <span>{text}</span>
      </label>
      <button onClick={deleteItem}>Delete</button>
    </div>
  );
}

export default TodoItem;
