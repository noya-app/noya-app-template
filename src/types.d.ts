import type { MenuType, State } from "./noya";

declare module "@noya-app/react-sdk" {
  interface Noya {
    state: State;
    menu: MenuType;
  }
}
