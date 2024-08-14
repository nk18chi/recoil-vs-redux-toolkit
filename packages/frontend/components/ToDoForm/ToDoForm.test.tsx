import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { screen, render, fireEvent, act } from '../../test-utils';
import ToDoForm from './ToDoForm';

describe('ToDoForm component', () => {
  it('Should show title input', () => {
    render(<ToDoForm onSubmit={() => {}} />);
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('What is your next task?')).toBeDefined();
    expect(screen.getByText('Title')).toHaveTextContent('*');
  });
  it('Should show category selector', () => {
    render(<ToDoForm onSubmit={() => {}} />);
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Category')).toHaveTextContent('*');
  });
  it('Should show due date picker', () => {
    render(<ToDoForm onSubmit={() => {}} />);
    expect(screen.getByText('Due Date')).toBeInTheDocument();
    expect(screen.getByText('Due Date')).not.toHaveTextContent('*');
  });
  it('Should show a save button', () => {
    render(<ToDoForm onSubmit={() => {}} />);
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });
  it('Should pass all input values to the callback function when clicking the save button', () => {
    const clickSpy = vi.fn();
    render(<ToDoForm onSubmit={clickSpy} />);
    const titleInput = screen.getByPlaceholderText('What is your next task?');
    fireEvent.change(titleInput, { target: { value: 'Sample Test Task' } });
    const categorySelector = screen.getByRole('combobox', { name: 'ToDo Category' });
    fireEvent.change(categorySelector, { target: { value: 'Personal' } });
    const dueDateInput = screen.getByRole('textbox', { name: 'ToDo Due Date' });
    fireEvent.change(dueDateInput, { target: { value: '2024-08-31' } });
    const button = screen.getByRole('button', { name: 'Submit' });
    act(() => {
      button.click();
    });
    expect(clickSpy).toHaveBeenCalledTimes(1);
    expect(clickSpy).toHaveBeenCalledWith({
      title: 'Sample Test Task',
      category: 'Personal',
      dueDate: new Date('2024-08-31'),
    });
  });
  it('Should show validation error when title is empty', async () => {
    const clickSpy = vi.fn();
    render(<ToDoForm onSubmit={clickSpy} />);
    const button = screen.getByRole('button', { name: 'Submit' });
    act(() => {
      button.click();
    });
    expect(clickSpy).toHaveBeenCalledTimes(0);
    expect(screen.getByText('Title is required')).toBeInTheDocument();
  });
});
