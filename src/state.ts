import {
  createInspector,
  createNoyaContext,
  Static,
  Type,
} from "@noya-app/react-sdk";

export type MenuType = "undo" | "redo";

const todoItemSchema = Type.Object({
  id: Type.String({ format: "uuid" }),
  text: Type.String(),
  completed: Type.Boolean({ default: false }),
  createdAt: Type.Number(),
});

const stateSchema = Type.Object({
  todos: Type.Array(todoItemSchema, { default: [] }),
});

export type TodoItem = Static<typeof todoItemSchema>;
export type State = Static<typeof stateSchema>;

export const {
  Provider,
  useValue,
  useSetValue,
  useValueState,
  useNoyaManager,
  useHandleMenuItem,
} = createNoyaContext<typeof stateSchema, object, object, MenuType>({
  schema: stateSchema,
});

export const {
  Inspector: TodoItemInspector,
  Field: TodoItemField,
  Section: TodoItemSection,
} = createInspector({
  schema: todoItemSchema,
});
