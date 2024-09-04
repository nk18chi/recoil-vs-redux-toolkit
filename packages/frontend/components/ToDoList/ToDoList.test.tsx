import React from 'react';
import { beforeEach, describe, expect, it, vi, VitestUtils } from 'vitest';
import * as recoil from 'recoil';
import defaultToDoList from '@/classes/ToDoList/ToDoList.defaultData';
import { DragDropContextProps } from '@hello-pangea/dnd';
import { screen, render, act, waitFor } from '../../test-utils';
import ToDoList from './ToDoList';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let onDragProps: any = { source: { index: 0 }, destination: { index: 2 } };
vi.mock('@hello-pangea/dnd', async (importOriginal) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const actual: any = await importOriginal();
  return {
    ...actual,
    DragDropContext: ({ onDragEnd, children }: DragDropContextProps) => (
      <>
        {actual.DragDropContext({ onDragEnd, children })}
        <button
          type="button"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onClick={() => onDragEnd(onDragProps, {} as any)}
        >
          DragDropContextMock
        </button>
      </>
    ),
  };
});
describe('ToDoList component', () => {
  let setTodoListSpy: VitestUtils['fn'];
  beforeEach(() => {
    setTodoListSpy = vi.fn();
    onDragProps = { source: { index: 0 }, destination: { index: 2 } };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.spyOn(recoil, 'useRecoilState').mockReturnValue([defaultToDoList, setTodoListSpy] as any);
  });
  it('Should show default todo list', () => {
    render(<ToDoList />);
    expect(screen.getByText('Finish the Project')).toBeInTheDocument();
    expect(screen.findByText(/Work/)).toBeDefined();
    expect(screen.getByText(/2024-08-15/)).toBeInTheDocument();
  });
  it('Should call setTodoList function with removing the first task when clicking the delete icon', () => {
    render(<ToDoList />);
    const deleteButton = screen.getAllByRole('button', { name: 'Delete Icon' })[0];
    act(() => {
      deleteButton.click();
    });
    expect(setTodoListSpy).toHaveBeenCalledTimes(1);
    expect(setTodoListSpy).toHaveBeenCalledWith(defaultToDoList.slice(1));
  });
  it('Should call the reorder function when dragging and dropping the task', async () => {
    render(<ToDoList />);
    await waitFor(() => {
      const button = screen.getByText('DragDropContextMock');
      act(() => {
        button.click();
      });
    });
    expect(setTodoListSpy).toHaveBeenCalledTimes(1);
    expect(setTodoListSpy).toHaveBeenCalledWith([
      { ...defaultToDoList[1], position: 0 },
      { ...defaultToDoList[2], position: 1 },
      { ...defaultToDoList[0], position: 2 },
      ...defaultToDoList.slice(3),
    ]);
  });
  it('Should not change the order of todo list when dragging and dropping the task without destination index', async () => {
    onDragProps = { source: { index: 0 }, destination: {} };
    render(<ToDoList />);
    await waitFor(() => {
      const button = screen.getByText('DragDropContextMock');
      act(() => {
        button.click();
      });
    });
    expect(setTodoListSpy).toHaveBeenCalledTimes(1);
    expect(setTodoListSpy).toHaveBeenCalledWith(defaultToDoList);
  });
  it('Should have title with strikethrough when the task is completed', () => {
    render(<ToDoList />);
    const task = screen.getByText('Finish the Project');
    expect(task).toHaveStyle('text-decoration: line-through');
    const checkbox = screen.getByRole('checkbox', { name: 'todo-checkbox-1' });
    expect(checkbox).toBeChecked();
  });
  it('Should mark as complete when clicking the checkbox', () => {
    render(<ToDoList />);
    const checkbox = screen.getByRole('checkbox', { name: 'todo-checkbox-2' });
    expect(checkbox).not.toBeChecked();
    act(() => {
      checkbox.click();
    });
    expect(setTodoListSpy).toHaveBeenCalledTimes(1);
    expect(setTodoListSpy).toHaveBeenCalledWith([
      defaultToDoList[0],
      { ...defaultToDoList[1], completed: true },
      ...defaultToDoList.slice(2),
    ]);
  });
  it('Should mark as incomplete when clicking the checkbox again', () => {
    render(<ToDoList />);
    const checkbox = screen.getByRole('checkbox', { name: 'todo-checkbox-1' });
    expect(checkbox).toBeChecked();
    act(() => {
      checkbox.click();
    });
    expect(setTodoListSpy).toHaveBeenCalledTimes(1);
    expect(setTodoListSpy).toHaveBeenCalledWith([
      { ...defaultToDoList[0], completed: false },
      ...defaultToDoList.slice(1),
    ]);
  });
});
