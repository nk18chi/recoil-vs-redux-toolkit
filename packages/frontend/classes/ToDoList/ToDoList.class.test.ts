import { describe, expect, it } from 'vitest';
import _ from 'lodash';
import ToDoList from './ToDoList.class';
import defaultToDoList from './ToDoList.defaultData';

describe('ToDoList class', () => {
  describe('reorder', () => {
    it('Should return the reordered todo list', () => {
      const todoList = _.cloneDeep(defaultToDoList);
      expect(ToDoList.reorder({ todo: defaultToDoList, from: 0, to: 1 })).toEqual([
        defaultToDoList[1],
        defaultToDoList[0],
        ...defaultToDoList.slice(2),
      ]);
      expect(todoList).toEqual(defaultToDoList); // check if there is no side effect
    });
    it('Should return the todo list as it is when from is negative', () => {
      expect(ToDoList.reorder({ todo: defaultToDoList, from: -100, to: 1 })).toEqual(defaultToDoList);
    });
    it('Should return the todo list as it is when from is greater than the todo size', () => {
      expect(ToDoList.reorder({ todo: defaultToDoList, from: 100, to: 1 })).toEqual(defaultToDoList);
    });
    it('Should return the todo list as it is when to is negative', () => {
      expect(ToDoList.reorder({ todo: defaultToDoList, from: 0, to: -100 })).toEqual(defaultToDoList);
    });
    it('Should return the todo list as it is when to is greater than the todo size', () => {
      expect(ToDoList.reorder({ todo: defaultToDoList, from: 0, to: -100 })).toEqual(defaultToDoList);
    });
    it('Should return the todo list as it is when from is greater than to', () => {
      expect(ToDoList.reorder({ todo: defaultToDoList, from: 1, to: 0 })).toEqual(defaultToDoList);
    });
  });
  describe('removeItem', () => {
    it('Should return the todo list after removing an item at the index', () => {
      const todoList = _.cloneDeep(defaultToDoList);
      expect(ToDoList.removeItem(todoList, 1)).toEqual([defaultToDoList[0], ...defaultToDoList.slice(2)]);
      expect(todoList).toEqual(defaultToDoList); // check if there is no side effect
    });
    it('Should return the todo list as it is when index is negative', () => {
      expect(ToDoList.removeItem(defaultToDoList, -1)).toEqual(defaultToDoList);
    });
    it('Should return the todo list as it is when index is greater than the todo size', () => {
      expect(ToDoList.removeItem(defaultToDoList, 100)).toEqual(defaultToDoList);
    });
  });
});
