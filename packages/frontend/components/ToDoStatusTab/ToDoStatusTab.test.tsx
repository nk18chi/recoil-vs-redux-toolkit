import React from 'react';
import { describe, expect, it } from 'vitest';
import { screen, render, act, waitFor } from '../../test-utils';
import ToDoStatusTab from './ToDoStatusTab';

describe('ToDoStatusTab component', () => {
  it('Should show the status tab as default is all', () => {
    render(<ToDoStatusTab />);
    const allTab = screen.getByText('All');
    expect(allTab).toBeInTheDocument();
    expect(allTab.getAttribute('data-active')).toBe('true');
  });
  it('Should filter by incomplete status', async () => {
    render(<ToDoStatusTab />);
    const incompleteTab = screen.getByText('Incomplete');
    expect(incompleteTab).toBeInTheDocument();
    act(() => {
      incompleteTab.click();
    });
    await waitFor(() => {
      expect(incompleteTab.getAttribute('data-active')).toBe('true');
    });
  });
  it.todo('Should filter by complete status');
  it.todo('Should reset the status filter as default');
  it.todo('Should show no result message if there is no todo');
});
