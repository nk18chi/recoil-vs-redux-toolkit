/* eslint-disable react/jsx-props-no-spreading */

'use client';

import React from 'react';
import { ActionIcon } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';

interface ToDoDeleteIconProps {
  onClick: () => void;
}

function ToDoDeleteIcon({ onClick }: ToDoDeleteIconProps) {
  return (
    <ActionIcon variant="white" aria-label="Delete Icon" className="ml-auto" onClick={onClick}>
      <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
    </ActionIcon>
  );
}

export default ToDoDeleteIcon;
