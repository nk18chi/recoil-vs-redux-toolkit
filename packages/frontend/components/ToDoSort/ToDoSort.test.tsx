import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@/test-utils';
import ToDoSort from './ToDoSort';

describe('ToDoSearch component', () => {
  it('Should show the status filter picker', () => {
    render(<ToDoSort />);
    expect(screen.getByText('Sort')).toBeInTheDocument();
  });
  it.todo('Should Sort by'); // use each with sort enum
});
