/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it } from 'vitest';
import _ from 'lodash';
import ToDoListSearch from './ToDoListSearch.class';
import defaultToDoList from './ToDoList.defaultData';
import ToDoCategory from '../ToDo/ToDoCategory.enum';
import ToDoListSort from './ToDoListSort.enum';

describe('ToDoListSearch class', () => {
  describe('filterByStatus', () => {
    it('Should filter todo list by incomplete', () => {
      const todoList = _.cloneDeep(defaultToDoList);
      expect(ToDoListSearch.filterByStatus({ todoList: defaultToDoList, completed: false })).toEqual(
        defaultToDoList.filter((todo) => !todo.completed),
      );
      expect(todoList).toEqual(defaultToDoList); // check if there is no side effect
    });
    it('Should filter todo list by completed', () => {
      expect(ToDoListSearch.filterByStatus({ todoList: defaultToDoList, completed: true })).toEqual(
        defaultToDoList.filter((todo) => todo.completed),
      );
    });
    it('Should filter todo list by all', () => {
      expect(ToDoListSearch.filterByStatus({ todoList: defaultToDoList })).toEqual(defaultToDoList);
    });
  });

  describe('filterByCategory', () => {
    it('Should return all todo list if no category is provided', () => {
      const todoList = _.cloneDeep(defaultToDoList);
      expect(ToDoListSearch.filterByCategory({ todoList })).toEqual(defaultToDoList);
      expect(todoList).toEqual(defaultToDoList); // check if there is no side effect
    });
    it.each(Object.values(ToDoCategory))('Should filter todo list by %s', (category) => {
      expect(ToDoListSearch.filterByCategory({ todoList: defaultToDoList, category })).toEqual(
        defaultToDoList.filter((todo) => todo.category === category),
      );
    });
  });

  describe('searchByText', () => {
    it('Should return all todo list if no text is provided', () => {
      const todoList = _.cloneDeep(defaultToDoList);
      expect(ToDoListSearch.searchByText({ todoList })).toEqual(defaultToDoList);
      expect(todoList).toEqual(defaultToDoList); // check if there is no side effect
    });
    it('Should filter todo list by text', () => {
      const text = defaultToDoList[0].title.slice(0, 5);
      expect(ToDoListSearch.searchByText({ todoList: defaultToDoList, text })).toEqual([defaultToDoList[0]]);
    });
    it('Should filter todo list by text with uppercase', () => {
      const text = defaultToDoList[0].title.slice(0, 5).toUpperCase();
      expect(ToDoListSearch.searchByText({ todoList: defaultToDoList, text })).toEqual([defaultToDoList[0]]);
    });
  });

  describe('sortBy', () => {
    it('Should sort todo list by priority', () => {
      const todoList: any = [{ position: 1 }, { position: 0 }, { position: 2 }];
      expect(ToDoListSearch.sortBy({ todoList, sortBy: ToDoListSort.Priority })).toEqual([
        { position: 0 },
        { position: 1 },
        { position: 2 },
      ]);
      expect(todoList).toEqual([{ position: 1 }, { position: 0 }, { position: 2 }]); // check if there is no side effect
    });
    it('Should sort todo list by newest', () => {
      const todoList: any = [
        { createdAt: new Date('2024-01-02') },
        { createdAt: new Date('2024-01-03') },
        { createdAt: new Date('2024-01-01') },
      ];
      expect(ToDoListSearch.sortBy({ todoList, sortBy: ToDoListSort.Newest })).toEqual([
        { createdAt: new Date('2024-01-03') },
        { createdAt: new Date('2024-01-02') },
        { createdAt: new Date('2024-01-01') },
      ]);
    });
    it('Should sort todo list by oldest', () => {
      const todoList: any = [
        { createdAt: new Date('2024-01-02') },
        { createdAt: new Date('2024-01-03') },
        { createdAt: new Date('2024-01-01') },
      ];
      expect(ToDoListSearch.sortBy({ todoList, sortBy: ToDoListSort.Oldest })).toEqual([
        { createdAt: new Date('2024-01-01') },
        { createdAt: new Date('2024-01-02') },
        { createdAt: new Date('2024-01-03') },
      ]);
    });
    it('Should sort todo list by overdue', () => {
      const todoList: any = [
        { dueDate: new Date('2024-01-02') },
        { dueDate: new Date('2024-01-03') },
        { dueDate: new Date('2024-01-01') },
        {},
      ];
      expect(ToDoListSearch.sortBy({ todoList, sortBy: ToDoListSort.Overdue })).toEqual([
        { dueDate: new Date('2024-01-01') },
        { dueDate: new Date('2024-01-02') },
        { dueDate: new Date('2024-01-03') },
        {},
      ]);
    });
    it('Should return todo list as is if no sort by provided', () => {
      const todoList = _.cloneDeep(defaultToDoList);
      expect(ToDoListSearch.sortBy({ todoList })).toEqual(defaultToDoList);
      expect(todoList).toEqual(defaultToDoList); // check if there is no side effect
    });
  });
});
