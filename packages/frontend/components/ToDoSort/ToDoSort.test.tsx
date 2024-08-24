import React from 'react';
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@/test-utils';
import ToDoSort from './ToDoSort';

describe('ToDoSearch component', () => {
  it('Should show the status filter picker', () => {
    render(<ToDoSort />);
    expect(screen.getByText('Sort')).toBeInTheDocument();
  });
  it('Should change the sort', async () => {
    render(<ToDoSort />);
    expect(screen.queryByText('Sort')).toBeInTheDocument();
    expect(screen.queryByText('Priority')).not.toBeInTheDocument();
    const sortSelector = screen.getByRole('button', { name: 'Sort' });
    fireEvent.click(sortSelector);
    const priorityOption = await screen.findByText('Priority');
    fireEvent.click(priorityOption);
    expect(screen.queryByText('Sort')).not.toBeInTheDocument();
    expect(screen.queryAllByText('Priority')[0]).toBeInTheDocument();
  });
});
