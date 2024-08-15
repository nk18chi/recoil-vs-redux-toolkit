import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as recoil from 'recoil';
import { screen, render, act, waitFor } from '../../test-utils';
import ToDoAddModal from './ToDoAddModal';

vi.mock('../ToDoForm/ToDoForm', () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, react/button-has-type
  default: ({ onSubmit }: any) => <button onClick={onSubmit}>ToDoFormMock</button>,
}));
describe('ToDoAddModal component', () => {
  const setRecoilStateSpy = vi.fn();
  beforeEach(() => {
    vi.spyOn(recoil, 'useSetRecoilState').mockImplementation(() => setRecoilStateSpy);
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
      expect(setRecoilStateSpy).toHaveBeenCalledTimes(1);
    });
  });
});
