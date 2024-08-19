export type Todo = {
  id: string;
  text: string;
  effort: "xs" | "s" | "m" | "l" | "xl";
  completed: boolean;
};
