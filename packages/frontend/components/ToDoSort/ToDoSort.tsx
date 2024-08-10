'use client';

import React, { useState } from 'react';
import { UnstyledButton, Menu, Group } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import classes from './ToDoSort.module.css';

enum Sort {
  Priority = 'Priority',
  Newest = 'Newest',
  Oldest = 'Oldest',
  Overdue = 'Overdue',
}

const data = [{ label: Sort.Priority }, { label: Sort.Newest }, { label: Sort.Oldest }, { label: Sort.Overdue }];

function ToDoSort() {
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState<Sort | null>(null);
  const items = data.map((item) => (
    <Menu.Item onClick={() => setSelected(item.label)} key={item.label}>
      {item.label}
    </Menu.Item>
  ));

  return (
    <Menu onOpen={() => setOpened(true)} onClose={() => setOpened(false)} radius="md" width="target" withinPortal>
      <Menu.Target>
        <UnstyledButton className={classes.control} data-expanded={opened || undefined}>
          <Group gap="xs">
            <span className={classes.label}>{selected ?? 'Sort'}</span>
          </Group>
          <IconChevronDown size="1rem" className={classes.icon} stroke={1.5} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>{items}</Menu.Dropdown>
    </Menu>
  );
}

export default ToDoSort;
