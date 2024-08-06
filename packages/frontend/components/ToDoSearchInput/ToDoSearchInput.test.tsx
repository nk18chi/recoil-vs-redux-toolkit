import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test-utils';
import ToDoSearchInput from './ToDoSearchInput';

describe('ToDoSearchInput component', () => {
  it('Should show the text search box', () => {
    render(<ToDoSearchInput />);
    expect(screen.getByPlaceholderText('Search Tasks')).toBeInTheDocument();
  });
  it.todo('Should search by the task title');
  it.todo('Should show no result message');
});
