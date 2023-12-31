export interface Item {
  id: string;
  content: string;
  input: string | boolean;
  type: "text" | "checkbox" | "select";
  options?: string[];
}

export interface Props {
  items: Item[];
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    id: string
  ) => void;
}
