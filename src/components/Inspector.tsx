import {
  Button,
  createInspector,
  Divider,
  useNoyaState,
} from "@noya-app/react-sdk";
import "@noya-app/react-sdk/index.css";
import { useCallback } from "react";
import { State, TodoItem, todoItemSchema } from "../noya";

const TodoInspector = createInspector({
  schema: todoItemSchema,
});

type InspectorProps = {
  selectedTodoId: string | null;
};

export function Inspector({ selectedTodoId }: InspectorProps) {
  const [, setTodos] = useNoyaState("todos");

  const [selectedTodo] = useNoyaState(
    useCallback(
      (state: State) => state.todos.find((t) => t.id === selectedTodoId),
      [selectedTodoId]
    )
  );

  const deleteTodo = useCallback(() => {
    setTodos((todos) => todos.filter((t) => t.id !== selectedTodoId));
  }, [selectedTodoId, setTodos]);

  const setSelectedTodo = useCallback(
    (todo: TodoItem) => {
      setTodos((todos) => todos.map((t) => (t.id === todo.id ? todo : t)));
    },
    [setTodos]
  );

  if (selectedTodo) {
    return (
      <TodoInspector.Inspector
        className="px-3 overflow-y-auto"
        value={selectedTodo}
        onChange={setSelectedTodo}
      >
        <TodoInspector.Section title="Item">
          <TodoInspector.Field path="text" />
          <TodoInspector.Field path="completed" />
        </TodoInspector.Section>
        <Divider overflow={12} />
        <TodoInspector.Section title="Metadata">
          <TodoInspector.Field path="createdAt" />
        </TodoInspector.Section>
        <Divider overflow={12} />
        <TodoInspector.Section title="Actions">
          <Button onClick={deleteTodo}>Delete</Button>
        </TodoInspector.Section>
      </TodoInspector.Inspector>
    );
  }

  return (
    <div className="p-3 text-gray-500 text-sm">
      Select a todo item to view and edit its details
    </div>
  );
}
