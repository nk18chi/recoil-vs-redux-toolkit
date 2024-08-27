import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import * as recoil from 'recoil';
import { screen, render } from '../../test-utils';
import ToDoStats from './ToDoStats';

describe('ToDoStats component', () => {
  it('Should show the total number of tasks', () => {
    render(<ToDoStats />);
    expect(screen.getByText('Total Tasks')).toBeInTheDocument();
    expect(screen.getByLabelText('Total Tasks')).toHaveTextContent('5');
  });
  it('Should show the percentage of completed tasks', () => {
    render(<ToDoStats />);
    expect(screen.getByText('Completed Tasks')).toBeInTheDocument();
    expect(screen.getByLabelText('Completed Tasks')).toHaveTextContent('1');
  });
  it('Should show the total number of over due tasks', () => {
    render(<ToDoStats />);
    expect(screen.getByText('Overdue Tasks')).toBeInTheDocument();
    expect(screen.getByLabelText('Overdue Tasks')).toHaveTextContent('1');
  });
  it('Should update the stats when useRecoilValue has changed', () => {
    vi.spyOn(recoil, 'useRecoilValue').mockImplementation(() => ({
      totalTasks: 6,
      totalCompletedTasks: 2,
      totalOverdueTasks: 3,
      tasksByCategory: { Work: 4, Personal: 2 },
    }));
    render(<ToDoStats />);
    expect(screen.getByLabelText('Total Tasks')).toHaveTextContent('6');
    expect(screen.getByLabelText('Completed Tasks')).toHaveTextContent('2');
    expect(screen.getByLabelText('Overdue Tasks')).toHaveTextContent('3');
  });
});
