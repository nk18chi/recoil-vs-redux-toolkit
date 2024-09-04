import ToDoCategory from '../ToDo/ToDoCategory.enum';

const defaultToDoList = [
  {
    id: 1,
    title: 'Finish the Project',
    category: ToDoCategory.Work,
    dueDate: new Date('2024-08-15'),
    createdAt: new Date('2024-08-01'),
    completed: true,
    position: 0,
  },
  {
    id: 2,
    title: 'Send the Report',
    category: ToDoCategory.Work,
    dueDate: new Date('2030-08-27'),
    createdAt: new Date('2024-08-02'),
    completed: false,
    position: 1,
  },
  {
    id: 3,
    title: 'Buy Groceries',
    category: ToDoCategory.Personal,
    dueDate: new Date('2030-08-21'),
    createdAt: new Date('2024-08-03'),
    completed: false,
    position: 2,
  },
  {
    id: 4,
    title: 'Read a Book',
    category: ToDoCategory.Personal,
    createdAt: new Date('2024-08-04'),
    completed: false,
    position: 3,
  },
  {
    id: 5,
    title: 'Clean the House',
    category: ToDoCategory.Personal,
    dueDate: new Date('2024-08-17'),
    createdAt: new Date('2024-08-05'),
    completed: false,
    position: 4,
  },
];
export default defaultToDoList;
