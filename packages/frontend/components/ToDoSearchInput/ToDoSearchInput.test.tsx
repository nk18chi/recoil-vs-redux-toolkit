import React from 'react';
import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen } from '../../test-utils';
import ToDoSearchInput from './ToDoSearchInput';

describe('ToDoSearchInput component', () => {
  it('Should show the text search box', () => {
    render(<ToDoSearchInput />);
    expect(screen.getByPlaceholderText('Search Tasks')).toBeInTheDocument();
  });
  it('Should type the text in the textbox', async () => {
    render(<ToDoSearchInput />);
    const inputBox = screen.getByPlaceholderText('Search Tasks');
    fireEvent.change(inputBox, { target: { value: 'Finish' } });
    expect(inputBox).toHaveValue('Finish');
  });
});
