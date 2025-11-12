import { Button, Inspector, useNoyaState } from "@noya-app/react-sdk";
import "@noya-app/react-sdk/index.css";
import { useCallback } from "react";
import { State, TodoItem, todoItemSchema } from "../noya";

type InspectorProps = {
  selectedTodoId: string | null;
};

export function TodoInspector({ selectedTodoId }: InspectorProps) {
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
      <div className="flex flex-col gap-2 px-3 overflow-y-auto">
        <Inspector
          schema={todoItemSchema}
          value={selectedTodo}
          onChange={setSelectedTodo}
          fieldProps={{
            id: { visible: false },
            text: { as: "textarea" },
          }}
        />
        <Button onClick={deleteTodo}>Delete</Button>
      </div>
    );
  }

  return (
    <div className="p-3 text-gray-500 text-sm">
      Select a todo item to view and edit its details
    </div>
  );
}
