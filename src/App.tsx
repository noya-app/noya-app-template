import { uuid } from "@noya-app/noya-utils";
import { Button, Divider, MenuItem, Workspace } from "@noya-app/react-sdk";
import "@noya-app/react-sdk/index.css";
import { useCallback, useRef, useState } from "react";
import {
  Provider,
  TodoItemField,
  TodoItemInspector,
  TodoItemSection,
  useNoyaManager,
  useSetValue,
  useValue,
  useValueState,
  type MenuType,
  type TodoItem,
} from "./state";

function TodoListItems({
  selectedTodoId,
  onSelectTodo,
}: {
  selectedTodoId: string | null;
  onSelectTodo: (id: string | null) => void;
}) {
  const [todos, setTodos] = useValueState("todos");
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
          <TodoItem
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

function Inspector({ selectedTodoId }: { selectedTodoId: string | null }) {
  const setTodos = useSetValue("todos");
  const selectedTodo = useValue(
    useCallback(
      (state) => state.todos.find((t) => t.id === selectedTodoId),
      [selectedTodoId]
    )
  );

  const deleteTodo = useCallback(() => {
    setTodos((todos) => todos.filter((t) => t.id !== selectedTodoId));
  }, [selectedTodoId, setTodos]);

  if (selectedTodo) {
    return (
      <TodoItemInspector className="px-3 overflow-y-auto" value={selectedTodo}>
        <TodoItemSection title="Item">
          <TodoItemField path="text" />
          <TodoItemField path="completed" />
        </TodoItemSection>
        <Divider overflow={12} />
        <TodoItemSection title="Metadata">
          <TodoItemField path="createdAt" />
        </TodoItemSection>
        <Divider overflow={12} />
        <TodoItemSection title="Actions">
          <Button onClick={deleteTodo}>Delete</Button>
        </TodoItemSection>
      </TodoItemInspector>
    );
  }

  return (
    <div className="p-3 text-gray-500 text-sm">
      Select a todo item to view and edit its details
    </div>
  );
}

function TodoList() {
  const noyaManager = useNoyaManager();
  const [selectedTodoId, setSelectedTodoId] = useState<string | null>(null);

  const leftMenuItems: MenuItem<MenuType>[] = [
    {
      title: "Edit",
      items: [
        { title: "Undo", value: "undo", shortcut: "Mod-z", role: "undo" },
        { title: "Redo", value: "redo", shortcut: "Mod-Shift-z", role: "redo" },
      ],
    },
  ];

  const handleMenuItem = useCallback(
    (value: MenuType) => {
      switch (value) {
        case "undo":
          if (noyaManager.multiplayerStateManager.canUndo()) {
            noyaManager.multiplayerStateManager.undo();
          }
          break;
        case "redo":
          if (noyaManager.multiplayerStateManager.canRedo()) {
            noyaManager.multiplayerStateManager.redo();
          }
          break;
      }
    },
    [noyaManager.multiplayerStateManager]
  );

  return (
    <Workspace
      toolbarTitle="Todo List"
      className="flex-1"
      leftMenuItems={leftMenuItems}
      onSelectMenuItem={handleMenuItem}
      right={<Inspector selectedTodoId={selectedTodoId} />}
    >
      <div className="flex-1 overflow-auto flex justify-center">
        <div className="w-full max-w-md p-8">
          <TodoListItems
            selectedTodoId={selectedTodoId}
            onSelectTodo={setSelectedTodoId}
          />
        </div>
      </div>
    </Workspace>
  );
}

interface TodoItemProps {
  todo: TodoItem;
  onToggle: (id: string) => void;
  isSelected: boolean;
  onSelect: () => void;
}

function TodoItem({ todo, onToggle, isSelected, onSelect }: TodoItemProps) {
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
        onChange={(e) => {
          e.stopPropagation();
          onToggle(todo.id);
        }}
        className="h-4 w-4"
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

export default function App() {
  return (
    <Provider
      offlineStorageKey="todo-mvc"
      inspector={{
        anchor: "bottom right",
      }}
    >
      <TodoList />
    </Provider>
  );
}
