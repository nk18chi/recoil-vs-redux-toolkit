import React from 'react';
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@/test-utils';
import ToDoListSort from '@/classes/ToDoList/ToDoListSort.enum';
import ToDoSort from './ToDoSort';

describe('ToDoSearch component', () => {
  it('Should show the status filter picker', () => {
    render(<ToDoSort />);
    expect(screen.getByText('Sort')).toBeInTheDocument();
  });
  it.each(Object.values(ToDoListSort))('Should change the sort to %s', async (sort) => {
    render(<ToDoSort />);
    expect(screen.queryByText('Sort')).toBeInTheDocument();
    expect(screen.queryByText(sort)).not.toBeInTheDocument();
    const sortSelector = screen.getByRole('button', { name: 'Sort' });
    fireEvent.click(sortSelector);
    const priorityOption = await screen.findByText(sort);
    fireEvent.click(priorityOption);
    expect(screen.queryByText('Sort')).not.toBeInTheDocument();
    expect(screen.queryAllByText(sort)[0]).toBeInTheDocument();
  });
});
