import { useNoyaMenu, useNoyaUndoManager } from "@noya-app/react-sdk";

export function useMenu() {
  const noyaUndoManager = useNoyaUndoManager();

  useNoyaMenu({
    left: [
      {
        id: "edit",
        type: "submenu",
        title: "Edit",
        items: [
          {
            title: "Undo",
            value: "undo",
            shortcut: "Mod-z",
            role: "undo",
            disabled: !noyaUndoManager.canUndo,
          },
          {
            title: "Redo",
            value: "redo",
            shortcut: "Mod-Shift-z",
            role: "redo",
            disabled: !noyaUndoManager.canRedo,
          },
        ],
      },
    ],
    onSelect: (type) => {
      switch (type) {
        case "undo":
          noyaUndoManager.undo();
          break;
        case "redo":
          noyaUndoManager.redo();
          break;
      }
    },
  });
}
