import React from 'react';
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@/test-utils';
import ToDoCategoryFilter from './ToDoCategoryFilter';

describe('ToDoSearch component', () => {
  it('Should show the status filter picker', () => {
    render(<ToDoCategoryFilter />);
    expect(screen.getByText('Category')).toBeInTheDocument();
  });
  it('Should change the status', async () => {
    render(<ToDoCategoryFilter />);
    expect(screen.queryByText('Category')).toBeInTheDocument();
    expect(screen.queryByText('Personal')).not.toBeInTheDocument();
    const categorySelector = screen.getByRole('button', { name: 'Category' });
    fireEvent.click(categorySelector);
    const personalOption = await screen.findByText('Personal');
    fireEvent.click(personalOption);
    expect(screen.queryByText('Category')).not.toBeInTheDocument();
    expect(screen.queryAllByText('Personal')[0]).toBeInTheDocument();
  });
  it.todo('Should filter by category'); // use each with category enum
  it.todo('Should show no result message');
});
