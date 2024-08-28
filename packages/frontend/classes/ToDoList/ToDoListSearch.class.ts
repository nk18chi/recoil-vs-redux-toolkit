import IToDo from '../ToDo/ToDo.interface';
import ToDoCategory from '../ToDo/ToDoCategory.enum';
import ToDoListSort from './ToDoListSort.enum';

interface FilterByStatusProps {
  todoList: IToDo[];
  completed?: boolean;
}

interface FilterByCategoryProps {
  todoList: IToDo[];
  category?: ToDoCategory;
}

interface SearchByTextProps {
  todoList: IToDo[];
  text?: string;
}

interface SortByProps {
  todoList: IToDo[];
  sortBy?: ToDoListSort;
}

class ToDoListSearch {
  public static filterByStatus({ todoList, completed }: FilterByStatusProps): IToDo[] {
    if (completed === undefined) return todoList;
    return todoList.filter((todo) => todo.completed === completed);
  }

  public static filterByCategory({ todoList, category }: FilterByCategoryProps): IToDo[] {
    if (!category) return todoList;
    return todoList.filter((todo) => todo.category === category);
  }

  public static searchByText({ todoList, text }: SearchByTextProps): IToDo[] {
    if (!text) return todoList;
    return todoList.filter((todo) => todo.title.toLowerCase().includes(text.toLowerCase()));
  }

  public static sortBy({ todoList, sortBy }: SortByProps): IToDo[] {
    switch (sortBy) {
      case ToDoListSort.Priority:
        return todoList.toSorted((a, b) => a.position - b.position);
      case ToDoListSort.Newest:
        return todoList.toSorted((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case ToDoListSort.Oldest:
        return todoList.toSorted((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      case ToDoListSort.Overdue:
        return todoList.toSorted((a, b) => {
          if (a.dueDate && b.dueDate) {
            return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
          }
          return 0;
        });
      default:
        return todoList;
    }
  }
}

export default ToDoListSearch;
