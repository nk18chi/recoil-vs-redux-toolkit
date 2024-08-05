import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { screen } from '../../test-utils';
import render from '../../test-utils/render';
import ToDoList from './ToDoList';

describe('ToDoList component', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });
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
