import { selector } from 'recoil';
import ToDoListSearch from '@/classes/ToDoList/ToDoListSearch.class';
import todoListFiltersState from './ToDoListFiltersState.recoil';
import ToDoListState from './ToDoListState.recoil';

const filteredTodoListState = selector({
  key: 'FilteredToDoListState',
  get: ({ get }) => {
    const todoList = get(ToDoListState);
    const filters = get(todoListFiltersState);

    // TODO: use functional programming to chain filters
    const newTodoList1 = ToDoListSearch.filterByStatus({ todoList, completed: filters.completed });
    const newTodoList2 = ToDoListSearch.filterByCategory({ todoList: newTodoList1, category: filters.category });
    const newTodoList3 = ToDoListSearch.searchByText({ todoList: newTodoList2, text: filters.searchText });
    const newTodoList4 = ToDoListSearch.sortBy({ todoList: newTodoList3, sortBy: filters.sortBy });
    return newTodoList4;
  },
});

export default filteredTodoListState;
