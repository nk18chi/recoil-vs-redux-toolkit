'use client';

import React, { useState } from 'react';
import { UnstyledButton, Menu, Group } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import classes from './ToDoCategoryFilter.module.css';

enum Category {
  All = 'All',
  Work = 'Work',
  Personal = 'Personal',
  Other = 'Other',
}

const data = [
  { label: Category.All },
  { label: Category.Work },
  { label: Category.Personal },
  { label: Category.Other },
];

function ToDoCategoryFilter() {
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState<Category | null>(null);
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
            <span className={classes.label}>{selected ?? 'Category'}</span>
          </Group>
          <IconChevronDown size="1rem" className={classes.icon} stroke={1.5} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>{items}</Menu.Dropdown>
    </Menu>
  );
}

export default ToDoCategoryFilter;
