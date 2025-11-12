import { Workspace } from "@noya-app/react-sdk";
import "@noya-app/react-sdk/index.css";
import { useState } from "react";
import { TodoInspector } from "./components/TodoInspector";
import { TodoList } from "./components/TodoList";
import { useMenu } from "./hooks/useMenu";

export default function App() {
  useMenu();

  const [selectedTodoId, setSelectedTodoId] = useState<string | null>(null);

  return (
    <Workspace
      toolbarTitle="Todo List"
      className="flex-1"
      right={<TodoInspector selectedTodoId={selectedTodoId} />}
    >
      <div className="flex-1 overflow-auto flex justify-center">
        <div className="w-full max-w-md p-8">
          <TodoList
            selectedTodoId={selectedTodoId}
            onSelectTodo={setSelectedTodoId}
          />
        </div>
      </div>
    </Workspace>
  );
}
