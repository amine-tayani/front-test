import { v4 as uuidv4 } from "uuid";

interface Item {
  id: string;
  content: string;
  input: string;
  type: "text" | "select" | "checkbox";
  options?: string[];
}

export interface Columns {
  [key: string]: {
    title: string;
    items: Item[];
  };
}

export const data: Item[] = [
  {
    id: "1",
    content: "Item 1",
    input: "",
    type: "text",
  },
  {
    id: "2",
    content: "Item 2",
    input: "",
    type: "checkbox",
  },
  {
    id: "3",
    content: "Item 3",
    input: "",
    type: "select",
    options: ["Option 1", "Option 2", "Option 3"],
  },
];

export const columnsFromBackend = {
  [uuidv4()]: {
    title: "Left column",
    items: data,
  },
  [uuidv4()]: {
    title: "Right column",
    items: [],
  },
};
