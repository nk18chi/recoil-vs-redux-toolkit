import { selector } from 'recoil';
import ToDoCategory from '@/classes/ToDo/ToDoCategory.enum';
import ToDoListState from './ToDoListState.recoil';

type TaskByCategory = { [key in ToDoCategory]: number };

const TodoListStatsState = selector({
  key: 'ToDoListStatsState',
  get: ({ get }) => {
    const todoList = get(ToDoListState);
    const totalTasks = todoList.length;
    const totalCompletedTasks = todoList.filter((todo) => todo.completed).length;
    const totalOverdueTasks = todoList.filter(
      (todo) => todo.dueDate && todo.dueDate.getTime() < new Date().getTime(),
    ).length;
    const defaultTasksByCategory: TaskByCategory = Object.values(ToDoCategory).reduce((acc, category) => {
      acc[category] = 0;
      return acc;
    }, {} as TaskByCategory);
    const tasksByCategory = todoList.reduce((acc, todo) => {
      acc[todo.category] += 1;
      return acc;
    }, defaultTasksByCategory);
    return {
      totalTasks,
      totalCompletedTasks,
      totalOverdueTasks,
      tasksByCategory,
    };
  },
});

export default TodoListStatsState;
