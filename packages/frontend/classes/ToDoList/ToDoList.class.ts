import _ from 'lodash';
import IToDo from '../ToDo/ToDo.interface';

interface IReorderInput {
  todoList: IToDo[];
  from: {
    todoId: number;
  };
  to: {
    todoId: number;
  };
}

interface SetCompletionStatusProps {
  todoList: IToDo[];
  todoId: number;
  completed: boolean;
}

class ToDoList {
  public static reorder({ todoList, from, to }: IReorderInput): IToDo[] {
    const fromTaskIndex = todoList.findIndex((task) => task.id === from.todoId);
    const toTaskIndex = todoList.findIndex((task) => task.id === to.todoId);
    if (fromTaskIndex === -1 || toTaskIndex === -1) {
      return todoList;
    }
    const cloned = _.cloneDeep(todoList);
    const item = todoList[fromTaskIndex];
    cloned.splice(fromTaskIndex, 1);
    cloned.splice(toTaskIndex, 0, item);
    return cloned;
  }

  public static removeItem(todoList: IToDo[], todoId: number): IToDo[] {
    const index = todoList.findIndex((todo) => todo.id === todoId);
    if (index === -1) {
      return todoList;
    }
    return [...todoList.slice(0, index), ...todoList.slice(index + 1)];
  }

  public static setCompletionStatus({ todoList, todoId, completed }: SetCompletionStatusProps): IToDo[] {
    const index = todoList.findIndex((todo) => todo.id === todoId);
    if (index === -1) {
      return todoList;
    }
    const cloned = _.cloneDeep(todoList);
    cloned[index].completed = completed;
    return cloned;
  }
}

export default ToDoList;
