import React from 'react';
import { describe, expect, it } from 'vitest';
import { screen } from '../../../test-utils';
import render from '../../../test-utils/render';
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
});
