import { initializeNoya, Static, Type } from "@noya-app/react-sdk";

export const todoItemSchema = Type.Object({
  id: Type.String(),
  text: Type.String(),
  completed: Type.Boolean({ default: false }),
  createdAt: Type.Number(),
});

export const stateSchema = Type.Object({
  todos: Type.Array(todoItemSchema, { default: [] }),
});

export type TodoItem = Static<typeof todoItemSchema>;

export type State = Static<typeof stateSchema>;

export type MenuType = "undo" | "redo";

initializeNoya({
  initialState: {
    todos: [],
  },
  schema: stateSchema,
  inspector: false,
  offlineStorageKey: "todolist",
});
