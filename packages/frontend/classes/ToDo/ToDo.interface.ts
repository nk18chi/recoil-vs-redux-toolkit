import ToDoCategory from './ToDoCategory.enum';

interface IToDo {
  id: number;
  title: string;
  category: ToDoCategory;
  completed: boolean;
  position: number;
  createdAt: Date;
  dueDate?: Date | null;
}

export default IToDo;
