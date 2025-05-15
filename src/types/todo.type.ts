export type TodoType = {
  id: string;
  title: string;
  completed: boolean;
};

export type TodoListType = TodoType[];

export type updateType = {
  editId: string;
  editTitle?: string;
  editCompleted?: boolean;
};
