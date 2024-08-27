import _ from 'lodash';
import IToDo from '../ToDo/ToDo.interface';

interface IReorderInput {
  todo: IToDo[];
  from: number;
  to: number;
}

interface SetCompletionStatusProps {
  todoList: IToDo[];
  index: number;
  completed: boolean;
}

class ToDoList {
  public static reorder({ todo, from, to }: IReorderInput): IToDo[] {
    if (from < 0 || from >= todo.length) {
      return todo;
    }
    if (to < 0 || to >= todo.length) {
      return todo;
    }
    if (from >= to) {
      return todo;
    }
    const cloned = _.cloneDeep(todo);
    const item = todo[from];
    cloned.splice(from, 1);
    cloned.splice(to, 0, item);
    return cloned;
  }

  public static removeItem(todo: IToDo[], index: number): IToDo[] {
    if (index < 0 || index >= todo.length) {
      return todo;
    }
    return [...todo.slice(0, index), ...todo.slice(index + 1)];
  }

  public static setCompletionStatus({ todoList, index, completed }: SetCompletionStatusProps): IToDo[] {
    if (index < 0 || index >= todoList.length) {
      return todoList;
    }
    const cloned = _.cloneDeep(todoList);
    cloned[index].completed = completed;
    return cloned;
  }
}

export default ToDoList;
