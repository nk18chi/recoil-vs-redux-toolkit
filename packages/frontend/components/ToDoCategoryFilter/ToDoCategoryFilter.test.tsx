import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@/test-utils';
import ToDoCategoryFilter from './ToDoCategoryFilter';

describe('ToDoSearch component', () => {
  it('Should show the status filter picker', () => {
    render(<ToDoCategoryFilter />);
    expect(screen.getByText('Category')).toBeInTheDocument();
  });
  it.todo('Should filter by category'); // use each with category enum
  it.todo('Should show no result message');
});
