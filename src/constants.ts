export enum EventType {
  FOCUS = "focus",
  BLUR = "blur",
}

export enum KeyType {
  Up = "ArrowUp",
  Down = "ArrowDown",
  Enter = "Enter",
  Escape = "Escape",
}

export interface SelectItem {
  id: number;
  label: string;
  value: string;
}

export const optionsData: SelectItem[] = [
  {
    id: 1,
    label: "apple",
    value: "apple",
  },
  {
    id: 2,
    label: "banana",
    value: "banana",
  },
  {
    id: 3,
    label: "orange",
    value: "orange",
  },
  {
    id: 4,
    label: "grape",
    value: "grape",
  },
  {
    id: 5,
    label: "mango",
    value: "mango",
  },
  {
    id: 6,
    label: "strawberry",
    value: "strawberry",
  },
  {
    id: 7,
    label: "blueberry",
    value: "blueberry",
  },
  {
    id: 8,
    label: "watermelon",
    value: "watermelon",
  },
  {
    id: 9,
    label: "pineapple",
    value: "pineapple",
  },
  {
    id: 10,
    label: "kiwi",
    value: "kiwi",
  },
];
