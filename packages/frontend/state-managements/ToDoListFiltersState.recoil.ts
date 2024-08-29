import ToDoCategory from '@/classes/ToDo/ToDoCategory.enum';
import ToDoListSort from '@/classes/ToDoList/ToDoListSort.enum';
import { atom } from 'recoil';

interface ToDoListFiltersStateProps {
  completed?: boolean;
  category?: ToDoCategory;
  searchText?: string;
  sortBy?: ToDoListSort;
}

const todoListFiltersState = atom<ToDoListFiltersStateProps>({
  key: 'ToDoListFiltersState',
  default: {},
});

export default todoListFiltersState;
