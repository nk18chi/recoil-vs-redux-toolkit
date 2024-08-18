import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { screen, render, act } from '../../test-utils';
import ToDoDeleteIcon from './ToDoDeleteIcon';

describe('ToDoDeleteIcon component', () => {
  it('Should show delete icon', () => {
    render(<ToDoDeleteIcon onClick={() => {}} />);
    expect(screen.getByLabelText('Delete Icon')).toBeInTheDocument();
  });
  it('Should trigger onclick function when clicking the delete icon', () => {
    const onClick = vi.fn();
    render(<ToDoDeleteIcon onClick={onClick} />);
    const icon = screen.getByLabelText('Delete Icon');
    act(() => {
      icon.click();
    });
    expect(onClick).toHaveBeenCalled();
  });
});
