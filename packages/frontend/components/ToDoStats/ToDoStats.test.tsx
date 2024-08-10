import React from 'react';
import { describe, expect, it } from 'vitest';
import { screen, render } from '../../test-utils';
import ToDoStats from './ToDoStats';

describe('ToDoStats component', () => {
  it('Should show the total number of tasks', () => {
    render(<ToDoStats />);
    expect(screen.getByText('Total Tasks')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeDefined();
  });
  it('Should show the percentage of completed tasks', () => {
    render(<ToDoStats />);
    expect(screen.getByText('Completed Tasks')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeDefined();
  });
  it('Should show the total number of over due tasks', () => {
    render(<ToDoStats />);
    expect(screen.getByText('Overdue Tasks')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeDefined();
  });
  it.todo('Should update the stats when adding a task');
  it.todo('Should update the stats when removing a task');
  it.todo('Should not update the stats even when filtering tasks');
});
