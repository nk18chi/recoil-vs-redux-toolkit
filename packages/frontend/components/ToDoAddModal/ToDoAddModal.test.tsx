import React from 'react';
import { beforeEach, describe, expect, it, vi, VitestUtils } from 'vitest';
import * as recoil from 'recoil';
import defaultToDoList from '@/classes/ToDoList/ToDoList.defaultData';
import { screen, render, act, waitFor } from '../../test-utils';
import ToDoAddModal from './ToDoAddModal';
import { ToDoFormProps } from '../ToDoForm/ToDoForm';

vi.mock('../ToDoForm/ToDoForm', () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, react/button-has-type
  default: ({ onSubmit }: ToDoFormProps) => <button onClick={() => onSubmit(defaultToDoList[0])}>ToDoFormMock</button>,
}));
describe('ToDoAddModal component', () => {
  let setTodoListSpy: VitestUtils['fn'];
  beforeEach(() => {
    setTodoListSpy = vi.fn();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.spyOn(recoil, 'useSetRecoilState').mockImplementation(() => setTodoListSpy as any);
  });

  it('Should show add button', () => {
    render(<ToDoAddModal />);
    expect(screen.getByRole('button', { name: 'Add Task' })).toBeInTheDocument();
  });
  it('Should show a modal when clicking the add button', async () => {
    render(<ToDoAddModal />);
    expect(screen.queryByText('Add New Task')).toBeNull();
    const button = screen.getByRole('button', { name: 'Add Task' });
    act(() => {
      button.click();
    });
    await waitFor(() => {
      expect(screen.getByText('Add New Task')).toBeVisible();
    });
  });
  it('Should close a modal when adding a new task', async () => {
    render(<ToDoAddModal />);
    const dialogButton = screen.getByRole('button', { name: 'Add Task' });
    act(() => {
      dialogButton.click();
    });
    await waitFor(() => {
      const button = screen.getByText('ToDoFormMock');
      button.click();
    });
    await waitFor(() => {
      expect(screen.queryByText('Add New Task')).toBeNull();
    });
  });
  it('Should add a new todo task', async () => {
    render(<ToDoAddModal />);
    const dialogButton = screen.getByRole('button', { name: 'Add Task' });
    act(() => {
      dialogButton.click();
    });
    await waitFor(() => {
      const button = screen.getByText('ToDoFormMock');
      act(() => {
        button.click();
      });
    });
    await waitFor(() => {
      expect(recoil.useSetRecoilState).toBeCalled();
    });
  });
});
