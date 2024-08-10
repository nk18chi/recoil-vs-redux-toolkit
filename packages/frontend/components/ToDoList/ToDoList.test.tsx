import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { screen, render } from '../../test-utils';
import ToDoList from './ToDoList';

describe('ToDoList component', () => {
  it('Should show default todo list', () => {
    render(<ToDoList />);
    expect(screen.getByText('Finish the Project')).toBeInTheDocument();
    expect(screen.findByText(/Work/)).toBeDefined();
    expect(screen.getByText(/2024-12-15/)).toBeInTheDocument();
  });
  it.todo('Should add a new todo task');
  it.todo('Should mark as complete when clicking the checkbox');
  it.todo('Should remove the task when clicking the delete icon');
  it.todo('Should filter tasks by uncompleted');
  it.todo('Should filter tasks by completed');
  it.todo('Should sort tasks by due data');
});
