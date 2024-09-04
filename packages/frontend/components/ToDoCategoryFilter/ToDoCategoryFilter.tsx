'use client';

import React, { useState } from 'react';
import { UnstyledButton, Menu, Group } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import todoListFiltersState from '@/state-managements/ToDoListFiltersState.recoil';
import { useSetRecoilState } from 'recoil';
import ToDoCategory from '@/classes/ToDo/ToDoCategory.enum';
import classes from './ToDoCategoryFilter.module.css';
import ToDoCategoryFilterEnum from './ToDoCategoryFilterEnum';

const data = [
  { label: ToDoCategoryFilterEnum.All },
  { label: ToDoCategoryFilterEnum.Work },
  { label: ToDoCategoryFilterEnum.Personal },
  { label: ToDoCategoryFilterEnum.Other },
];

function ToDoCategoryFilter() {
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState<ToDoCategoryFilterEnum | null>(null);
  const setToDoListFilters = useSetRecoilState(todoListFiltersState);
  const items = data.map((item) => (
    <Menu.Item
      onClick={() => {
        setSelected(item.label);
        setToDoListFilters((prev) => {
          const category = () => {
            switch (item.label) {
              case ToDoCategoryFilterEnum.All:
                return undefined;
              default:
                /* v8 ignore next-line */
                return ToDoCategory[item.label] || undefined;
            }
          };
          return {
            ...prev,
            category: category(),
          };
        });
      }}
      key={item.label}
      aria-label={item.label}
    >
      {item.label}
    </Menu.Item>
  ));

  return (
    <Menu
      id="todo-category-filter"
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      radius="md"
      width="target"
      withinPortal
    >
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
