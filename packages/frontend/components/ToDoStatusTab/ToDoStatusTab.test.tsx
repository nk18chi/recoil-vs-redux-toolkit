import React from 'react';
import { describe, expect, it } from 'vitest';
import { screen, render } from '../../test-utils';
import ToDoStatusTab from './ToDoStatusTab';

describe('ToDoStatusTab component', () => {
  it('Should show the status tab as default is all', () => {
    render(<ToDoStatusTab />);
    const allTab = screen.getByText('All');
    expect(allTab).toBeInTheDocument();
    expect(allTab.getAttribute('data-active')).toBe('true');
  });
  it.todo('Should filter by uncompleted status');
  it.todo('Should filter by completed status');
  it.todo('Should reset the status filter as default');
  it.todo('Should show no result message if there is no todo');
});
