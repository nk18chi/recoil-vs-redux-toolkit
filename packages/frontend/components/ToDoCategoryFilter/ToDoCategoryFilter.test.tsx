import React from 'react';
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@/test-utils';
import ToDoCategoryFilter from './ToDoCategoryFilter';
import ToDoCategoryFilterEnum from './ToDoCategoryFilterEnum';

describe('ToDoSearch component', () => {
  it('Should show the status filter picker', () => {
    render(<ToDoCategoryFilter />);
    expect(screen.getByText('Category')).toBeInTheDocument();
  });
  it.each(Object.values(ToDoCategoryFilterEnum))('Should change the status to %s', async (category) => {
    render(<ToDoCategoryFilter />);
    expect(screen.queryByText('Category')).toBeInTheDocument();
    expect(screen.queryByText(category)).not.toBeInTheDocument();
    const categorySelector = screen.getByRole('button', { name: 'Category' });
    fireEvent.click(categorySelector);
    const personalOption = await screen.findByText(category);
    fireEvent.click(personalOption);
    expect(screen.queryByText('Category')).not.toBeInTheDocument();
    expect(screen.queryAllByText(category)[0]).toBeInTheDocument();
  });
  it.todo('Should show no result message');
});
