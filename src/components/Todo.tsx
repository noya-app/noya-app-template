import { TodoItem } from "../noya";

interface TodoItemProps {
  todo: TodoItem;
  onToggle: (id: string) => void;
  isSelected: boolean;
  onSelect: () => void;
}

export function Todo({ todo, onToggle, isSelected, onSelect }: TodoItemProps) {
  return (
    <div
      className={`flex items-center gap-2 px-2 py-1 border border-gray-300 rounded cursor-pointer ${
        isSelected ? "bg-blue-50 border-blue-300" : ""
      }`}
      onClick={onSelect}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        className="h-4 w-4"
        onChange={(e) => {
          e.stopPropagation();
          onToggle(todo.id);
        }}
      />
      <span
        className={`flex-1 ${
          todo.completed ? "line-through text-gray-500" : ""
        }`}
      >
        {todo.text}
      </span>
    </div>
  );
}
