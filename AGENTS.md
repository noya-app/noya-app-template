# AGENTS.md

## Noya Documentation

See: https://www.noya.io/docs/llms.txt

## Noya React SDK

You are building with `@noya-app/react-sdk`, which is a library for building multiplayer apps that run both standalone and embedded as a child iframe of a cloud-hosted service. In standalone mode, data saves to localstorage, indexeddb, etc, while in embedded mode it saves to the cloud. Both modes are powered by a single set of React hooks and components.

Standalone mode supports only a single "file" (Noya state) while the cloud-hosted version lets users create multiple "files" (separate Noya state with its own file name and multiplayer room).

## State Management

State is typically stored in 3 places:

- Multiplayer state should be stored with `useNoyaState`. `useNoyaState` is a state management solution similar to jotai/zustand/redux. State set this way will be synced between all users of a given Noya state/room/file.
- Persistent local state should be stored in localstorage, indexeddb, etc. Things like a user's preferences or if you save some UI state like layout arrangement or current tab.
- UI state should generally be saved with React's useState.
