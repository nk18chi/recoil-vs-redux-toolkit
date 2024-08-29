'use client';

import React, { useState } from 'react';
import { Container, Anchor, Group, Box } from '@mantine/core';
import { useSetRecoilState } from 'recoil';
import todoListFiltersState from '@/state-managements/ToDoListFiltersState.recoil';
import classes from './ToDoStatusTab.module.css';

enum Status {
  All = 'All',
  Incomplete = 'Incomplete',
  Complete = 'Complete',
}

const mainLinks = [{ label: Status.All }, { label: Status.Incomplete }, { label: Status.Complete }];

function ToDoStatusTab() {
  const setToDoListFilters = useSetRecoilState(todoListFiltersState);
  const [active, setActive] = useState(0);

  const mainItems = mainLinks.map((item, index) => (
    <Anchor<'a'>
      key={item.label}
      className={classes.mainLink}
      data-active={index === active || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(index);
        setToDoListFilters((prev) => {
          const completed = () => {
            switch (item.label) {
              case Status.All:
                return undefined;
              case Status.Complete:
                return true;
              case Status.Incomplete:
                return false;
              default:
                return undefined;
            }
          };
          return {
            ...prev,
            completed: completed(),
          };
        });
      }}
    >
      {item.label}
    </Anchor>
  ));

  return (
    <Box className={classes.header}>
      <Container className={classes.inner}>
        <Box className={classes.links}>
          <Group gap={0} justify="flex-end" className={classes.mainLinks}>
            {mainItems}
          </Group>
        </Box>
      </Container>
    </Box>
  );
}

export default ToDoStatusTab;
