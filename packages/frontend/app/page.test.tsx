import React from 'react';
import { describe, expect, it } from 'vitest';
import { act, fireEvent, render, screen, waitFor } from '../test-utils';
import Page from './page';

describe('Page component', () => {
  it('Should match the snapshot', () => {
    const { asFragment } = render(<Page />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('Should add a new todo task', async () => {
    render(<Page />);
    const dialogButton = screen.getByRole('button', { name: 'Add Task' });
    act(() => {
      dialogButton.click();
    });

    const titleInput = await screen.findByPlaceholderText('What is your next task?');
    fireEvent.change(titleInput, { target: { value: 'Sample Test Task' } });
    const categorySelector = await screen.findByRole('combobox', { name: 'ToDo Category' });
    fireEvent.change(categorySelector, { target: { value: 'Personal' } });
    const dueDateInput = await screen.findByRole('textbox', { name: 'ToDo Due Date' });
    fireEvent.change(dueDateInput, { target: { value: '2024-08-31' } });
    const button = await screen.findByRole('button', { name: 'Submit' });
    act(() => {
      button.click();
    });

    waitFor(() => {
      expect(screen.getByText('Add New Task')).toBeNull();
      expect(screen.getByText('Sample Test Task')).toBeInTheDocument();
    });
  });
});
