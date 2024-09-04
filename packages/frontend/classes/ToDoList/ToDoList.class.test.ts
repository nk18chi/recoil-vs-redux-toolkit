import { describe, expect, it } from 'vitest';
import _ from 'lodash';
import ToDoList from './ToDoList.class';
import defaultToDoList from './ToDoList.defaultData';

describe('ToDoList class', () => {
  describe('reorder', () => {
    it('Should return the reordered todo list', () => {
      const todoList = _.cloneDeep(defaultToDoList);
      expect(ToDoList.reorder({ todoList: defaultToDoList, from: { todoId: 1 }, to: { todoId: 2 } })).toEqual([
        defaultToDoList[1],
        defaultToDoList[0],
        ...defaultToDoList.slice(2),
      ]);
      expect(todoList).toEqual(defaultToDoList); // check if there is no side effect
    });
    it('Should return the todo list as it is when the id of from task does not match', () => {
      expect(ToDoList.reorder({ todoList: defaultToDoList, from: { todoId: 1000 }, to: { todoId: 1 } })).toEqual(
        defaultToDoList,
      );
    });
    it('Should return the todo list as it is when the id of to task does not match', () => {
      expect(ToDoList.reorder({ todoList: defaultToDoList, from: { todoId: 1 }, to: { todoId: 1000 } })).toEqual(
        defaultToDoList,
      );
    });
    it('Should return the todo list as it is when the id of from and to task does not match', () => {
      expect(ToDoList.reorder({ todoList: defaultToDoList, from: { todoId: 1000 }, to: { todoId: 1001 } })).toEqual(
        defaultToDoList,
      );
    });
  });
  describe('removeItem', () => {
    it('Should return the todo list after removing an item at the index', () => {
      const todoList = _.cloneDeep(defaultToDoList);
      expect(ToDoList.removeItem(todoList, 2)).toEqual([defaultToDoList[0], ...defaultToDoList.slice(2)]);
      expect(todoList).toEqual(defaultToDoList); // check if there is no side effect
    });
    it('Should return the todo list as it is when the id does not match', () => {
      expect(ToDoList.removeItem(defaultToDoList, 100)).toEqual(defaultToDoList);
    });
  });
  describe('setCompletionStatus', () => {
    it('Should mark as completed', () => {
      const todoList = _.cloneDeep(defaultToDoList);
      expect(ToDoList.setCompletionStatus({ todoList, todoId: 2, completed: true })).toEqual([
        defaultToDoList[0],
        { ...defaultToDoList[1], completed: true },
        ...defaultToDoList.slice(2),
      ]);
      expect(todoList).toEqual(defaultToDoList); // check if there is no side effect
    });
    it('Should mark as incomplete', () => {
      const todoList = _.cloneDeep(defaultToDoList);
      expect(ToDoList.setCompletionStatus({ todoList, todoId: 2, completed: false })).toEqual([
        defaultToDoList[0],
        { ...defaultToDoList[1], completed: false },
        ...defaultToDoList.slice(2),
      ]);
      expect(todoList).toEqual(defaultToDoList); // check if there is no side effect
    });
    it('Should return the todo list as it is when todoId does not match', () => {
      expect(ToDoList.setCompletionStatus({ todoList: defaultToDoList, todoId: 1000, completed: true })).toEqual(
        defaultToDoList,
      );
    });
  });
});
