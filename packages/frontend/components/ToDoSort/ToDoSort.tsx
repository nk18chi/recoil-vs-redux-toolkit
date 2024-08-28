'use client';

import React, { useState } from 'react';
import { UnstyledButton, Menu, Group } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import ToDoListSort from '@/classes/ToDoList/ToDoListSort.enum';
import classes from './ToDoSort.module.css';

const data = [
  { label: ToDoListSort.Priority },
  { label: ToDoListSort.Newest },
  { label: ToDoListSort.Oldest },
  { label: ToDoListSort.Overdue },
];

function ToDoSort() {
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState<ToDoListSort | null>(null);
  const items = data.map((item) => (
    <Menu.Item onClick={() => setSelected(item.label)} key={item.label}>
      {item.label}
    </Menu.Item>
  ));

  return (
    <Menu
      id="todo-sort"
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      radius="md"
      width="target"
      withinPortal
    >
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
