import { atom } from 'recoil';
import IToDo from '@/classes/ToDo/ToDo.interface';
import defaultToDoList from '@/classes/ToDoList/ToDoList.defaultData';

const todoListState = atom<IToDo[]>({
  key: 'ToDoListState',
  default: defaultToDoList,
});

export default todoListState;
