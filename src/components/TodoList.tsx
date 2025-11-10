import { uuid } from "@noya-app/noya-utils";
import { useNoyaState } from "@noya-app/react-sdk";
import "@noya-app/react-sdk/index.css";
import { useCallback, useRef } from "react";
import { Todo } from "./Todo";

type TodoListProps = {
  selectedTodoId: string | null;
  onSelectTodo: (id: string | null) => void;
};

export function TodoList({ selectedTodoId, onSelectTodo }: TodoListProps) {
  const [todos, setTodos] = useNoyaState("todos");
  const inputRef = useRef<HTMLInputElement>(null);

  const addTodo = useCallback(() => {
    const input = inputRef.current;

    if (input?.value.trim()) {
      setTodos((todos) => [
        ...todos,
        {
          id: uuid(),
          text: input.value.trim(),
          completed: false,
          createdAt: Date.now(),
        },
      ]);
      input.value = "";
    }
  }, [setTodos]);

  const toggleTodo = useCallback(
    (todoId: string) => {
      setTodos((todos) =>
        todos.map((todo) =>
          todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
        )
      );
    },
    [setTodos]
  );

  return (
    <>
      <div className="mb-4 flex gap-2">
        <input
          ref={inputRef}
          type="text"
          placeholder="What needs to be done?"
          className="flex-1 px-2 py-1 border border-gray-300 rounded"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTodo();
            }
          }}
        />
        <button
          onClick={addTodo}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            isSelected={selectedTodoId === todo.id}
            onSelect={() => onSelectTodo(todo.id)}
          />
        ))}
      </div>
    </>
  );
}
