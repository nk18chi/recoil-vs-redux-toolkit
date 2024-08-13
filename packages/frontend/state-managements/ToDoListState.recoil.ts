import { atom } from 'recoil';
import IToDo from '@/classes/ToDo/ToDo.interface';
import ToDoCategory from '../classes/ToDo/ToDoCategory.enum';

const todoListState = atom<IToDo[]>({
  key: 'ToDoListState',
  default: [
    {
      id: 1,
      title: 'Finish the Project',
      category: ToDoCategory.Work,
      dueDate: new Date('2024-12-15'),
      createdAt: new Date(),
      completed: true,
      position: 0,
    },
    {
      id: 2,
      title: 'Send the Report',
      category: ToDoCategory.Work,
      dueDate: new Date('2024-12-20'),
      createdAt: new Date(),
      completed: false,
      position: 1,
    },
    {
      id: 3,
      title: 'Buy Groceries',
      category: ToDoCategory.Personal,
      dueDate: new Date('2024-12-23'),
      createdAt: new Date(),
      completed: false,
      position: 2,
    },
    {
      id: 4,
      title: 'Read a Book',
      category: ToDoCategory.Personal,
      createdAt: new Date(),
      completed: false,
      position: 3,
    },
    {
      id: 5,
      title: 'Clean the House',
      category: ToDoCategory.Personal,
      dueDate: new Date('2022-12-31'),
      createdAt: new Date(),
      completed: false,
      position: 4,
    },
  ],
});

export default todoListState;
