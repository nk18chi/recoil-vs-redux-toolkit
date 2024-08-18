import _ from 'lodash';
import IToDo from '../ToDo/ToDo.interface';

interface IReorderInput {
  todo: IToDo[];
  from: number;
  to: number;
}

class ToDoList {
  public static reorder({ todo, from, to }: IReorderInput): IToDo[] {
    const cloned = _.cloneDeep(todo);
    const item = todo[from];
    cloned.splice(from, 1);
    cloned.splice(to, 0, item);
    return cloned;
  }

  public static removeItem(todo: IToDo[], index: number): IToDo[] {
    return [...todo.slice(0, index), ...todo.slice(index + 1)];
  }
}

export default ToDoList;
