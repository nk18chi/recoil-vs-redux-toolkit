import React from 'react';
import { render as testingLibraryRender } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import RecoilProvider from '@/providers/RecoilProvider';
import { DatesProvider } from '@mantine/dates';
import theme from '../theme';

function render(ui: React.ReactNode) {
  return testingLibraryRender(ui, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <MantineProvider theme={theme}>
        <DatesProvider settings={{ timezone: 'UTC' }}>
          <RecoilProvider>{children}</RecoilProvider>
        </DatesProvider>
      </MantineProvider>
    ),
  });
}

export default render;
