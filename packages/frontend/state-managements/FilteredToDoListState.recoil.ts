import { selector } from 'recoil';
import ToDoListSearch from '@/classes/ToDoList/ToDoListSearch.class';
import { pipe } from 'fp-ts/function';
import todoListFiltersState from './ToDoListFiltersState.recoil';
import ToDoListState from './ToDoListState.recoil';

const filteredTodoListState = selector({
  key: 'FilteredToDoListState',
  get: ({ get }) => {
    const todoList = get(ToDoListState);
    const filters = get(todoListFiltersState);

    return pipe(
      todoList,
      (list) => ToDoListSearch.filterByStatus({ todoList: list, completed: filters.completed }),
      (list) => ToDoListSearch.filterByCategory({ todoList: list, category: filters.category }),
      (list) => ToDoListSearch.searchByText({ todoList: list, text: filters.searchText }),
      (list) => ToDoListSearch.sortBy({ todoList: list, sortBy: filters.sortBy }),
    );
  },
});

export default filteredTodoListState;
