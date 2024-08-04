import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MantineProvider } from '@mantine/core';
import { screen } from '../../../test-utils';
import render from '../../../test-utils/render';
import theme from '../../../theme';
import ToDoList from './ToDoList';

describe('ToDoList component', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });
  it('Should show default todo list', () => {
    render(
      <MantineProvider theme={theme}>
        <ToDoList />
      </MantineProvider>,
    );
    expect(screen.getByText('Finish the Project')).toBeInTheDocument();
    expect(screen.findByText(/Work/)).toBeDefined();
    expect(screen.getByText(/2024-12-15/)).toBeInTheDocument();
  });
});
